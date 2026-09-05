import mongoose from 'mongoose';
import { config } from '../config/env';
import { Problem, Difficulty } from '../models/Problem';
import { CodeforcesProvider } from '../problems/providers/CodeforcesProvider';
import { ProblemRegistry } from '../problems/ProblemRegistry';
import { executeSubmission } from '../execution/runner';
import { TestCase } from '../execution/types';

// Simple CLI arg parser
const args = process.argv.slice(2);
let limit = 10;
let dryRun = false;
let difficultyFilter: string | undefined;
let topicFilter: string | undefined;
let idFilter: string[] = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--limit' && args[i + 1]) {
    limit = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--dry-run') {
    dryRun = true;
  } else if (args[i] === '--difficulty' && args[i + 1]) {
    difficultyFilter = args[i + 1];
    i++;
  } else if (args[i] === '--topic' && args[i + 1]) {
    topicFilter = args[i + 1];
    i++;
  } else if (args[i] === '--id' && args[i + 1]) {
    idFilter = args[i + 1].split(',');
    i++;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const runImporter = async () => {
  console.log('--- CodeClash Problem Importer ---');
  console.log(`Limit: ${limit}`);
  console.log(`Dry Run: ${dryRun}`);
  console.log(`Difficulty Filter: ${difficultyFilter || 'None'}`);
  console.log(`Topic Filter: ${topicFilter || 'None'}`);
  console.log('----------------------------------\n');

  let dbConnected = false;
  if (!dryRun) {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    dbConnected = true;
  }

  const provider = new CodeforcesProvider();
  
  let stats = {
    fetched: 0,
    importedDraft: 0,
    importedPublished: 0,
    skippedDuplicate: 0,
    rejectedNoTests: 0,
    rejectedSmokeTestFailed: 0,
    failed: 0,
  };

  try {
    console.log(`Fetching index from ${provider.name}...`);
    const problemIndex = await provider.fetchProblemIndex({
      limit: limit, // Fetch slightly more to account for duplicates, or exactly limit. We fetch limit.
      difficulty: difficultyFilter,
      topic: topicFilter,
      ids: idFilter.length > 0 ? idFilter : undefined,
    });

    console.log(`Found ${problemIndex.length} problems matching criteria.`);

    for (const meta of problemIndex) {
      console.log(`\nProcessing [${provider.name}:${meta.externalId}] ${meta.title}...`);
      
      try {
        if (!dryRun) {
          const existing = await Problem.findOne({
            'source.provider': provider.name,
            'source.externalId': meta.externalId,
          });
          if (existing) {
            console.log(`- Skipped: Already exists in database (Duplicate)`);
            stats.skippedDuplicate++;
            continue;
          }
        }

        // Polite delay
        await sleep(1500);

        const details = await provider.fetchProblemDetails(meta.externalId);
        stats.fetched++;

        const registryData = ProblemRegistry.getSupplementalData(provider.name, meta.externalId);
        
        let allTestCases: TestCase[] = [...details.testCases];
        
        if (registryData?.hiddenTestCases) {
          allTestCases = allTestCases.concat(registryData.hiddenTestCases);
        }

        if (allTestCases.length === 0) {
           console.log(`- Rejected: No test cases found.`);
           stats.rejectedNoTests++;
           continue;
        }

        let isPublished = false;

        // Smoke Testing
        if (registryData?.referenceSolution) {
           console.log(`- Running smoke test using ${registryData.referenceSolution.language} reference solution...`);
           const result = await executeSubmission(
             registryData.referenceSolution.code,
             registryData.referenceSolution.language as any,
             allTestCases,
             details.timeLimit,
             details.memoryLimit
           );

           if (result.status === 'ACCEPTED') {
             console.log(`- Smoke test PASSED.`);
             // We can only publish if we have both visible (examples) and hidden tests verified
             if (registryData.hiddenTestCases && registryData.hiddenTestCases.length > 0) {
                 isPublished = true;
             } else {
                 console.log(`- Warning: Passed smoke test but no hidden tests available. Marking as Draft.`);
             }
           } else {
             console.log(`- Smoke test FAILED: ${result.status}`);
             stats.rejectedSmokeTestFailed++;
             continue; // Don't even save it if reference solution fails
           }
        } else {
           console.log(`- Warning: No reference solution in registry. Marking as Draft.`);
        }

        // Construct document
        const newProblem = new Problem({
           title: meta.title,
           slug: `${provider.name.toLowerCase()}-${meta.externalId.toLowerCase()}`,
           description: details.description,
           difficulty: meta.difficulty,
           topics: meta.topics,
           constraints: details.constraints,
           examples: details.examples,
           starterCode: registryData?.starterCode || {},
           testCases: allTestCases,
           timeLimit: details.timeLimit,
           memoryLimit: details.memoryLimit,
           isPublished,
           source: {
             provider: provider.name,
             externalId: meta.externalId,
             externalUrl: `https://codeforces.com/contest/${meta.externalId.match(/^\d+/)?.[0]}/problem/${meta.externalId.match(/[A-Z]\d*$/i)?.[0]}`
           }
        });

        if (dryRun) {
           console.log(`- [Dry Run] Would save ${isPublished ? 'PUBLISHED' : 'DRAFT'}`);
           if (isPublished) stats.importedPublished++;
           else stats.importedDraft++;
        } else {
           await newProblem.save();
           console.log(`- Saved as ${isPublished ? 'PUBLISHED' : 'DRAFT'}`);
           if (isPublished) stats.importedPublished++;
           else stats.importedDraft++;
        }

      } catch (err: any) {
         console.log(`- Failed: ${err.message}`);
         stats.failed++;
      }
    }
  } catch (error: any) {
    console.error(`Fatal error: ${error.message}`);
  } finally {
    if (dbConnected) {
      await mongoose.connection.close();
    }
    console.log('\n--- Import Summary ---');
    console.log(`Fetched HTML: ${stats.fetched}`);
    console.log(`Imported (Published): ${stats.importedPublished}`);
    console.log(`Imported (Draft): ${stats.importedDraft}`);
    console.log(`Skipped (Duplicate): ${stats.skippedDuplicate}`);
    console.log(`Rejected (No Tests): ${stats.rejectedNoTests}`);
    console.log(`Rejected (Smoke Test Failed): ${stats.rejectedSmokeTestFailed}`);
    console.log(`Failed (Errors): ${stats.failed}`);
    process.exit(0);
  }
};

runImporter();
