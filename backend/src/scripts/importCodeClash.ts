import mongoose from 'mongoose';
import { config } from '../config/env';
import { Problem } from '../models/Problem';
import { executeSubmission, executeRun } from '../execution/runner';
import * as batch1 from '../problems/datasets/batch1';
import { CodeClashProblemDefinition } from '../problems/datasets/types';

const args = process.argv.slice(2);
let batchName = 'batch1';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--batch' && args[i + 1]) {
    batchName = args[i + 1];
    i++;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const runImporter = async () => {
  console.log('--- CodeClash Original Problem Importer ---');
  console.log(`Target Batch: ${batchName}`);
  console.log('-------------------------------------------\n');

  let problemsToImport: CodeClashProblemDefinition[] = [];
  
  if (batchName === 'batch1') {
    problemsToImport = Object.values(batch1);
  } else {
    console.error(`Batch ${batchName} not found.`);
    process.exit(1);
  }

  console.log(`Connecting to MongoDB...`);
  await mongoose.connect(config.MONGODB_URI);

  console.log('Cleaning up legacy Codeforces / draft problems...');
  const deleteResult = await Problem.deleteMany({ 'source.provider': { $ne: 'CodeClash' } });
  console.log(`- Removed ${deleteResult.deletedCount} non-CodeClash problems from database.\n`);

  let stats = {
    total: problemsToImport.length,
    importedPublished: 0,
    importedDraft: 0,
    skippedDuplicate: 0,
    rejectedTests: 0,
    rejectedStarter: 0,
    rejectedSmokeTestFailed: 0,
    failed: 0,
    categories: {} as Record<string, number>,
    difficulties: {} as Record<string, number>,
  };

  try {
    for (const p of problemsToImport) {
      console.log(`\nProcessing [CodeClash:${p.slug}] ${p.title}...`);

      try {
        const existing = await Problem.findOne({
          'source.provider': 'CodeClash',
          'source.externalId': p.slug,
        });

        const visibleTests = p.testCases.filter(t => !t.isHidden);
        const hiddenTests = p.testCases.filter(t => t.isHidden);

        if (visibleTests.length < 3 || hiddenTests.length < 7) {
          console.log(`- Rejected: Insufficient tests (Visible: ${visibleTests.length}, Hidden: ${hiddenTests.length})`);
          stats.rejectedTests++;
          continue;
        }

        if (!p.starterCode.cpp || !p.starterCode.python || !p.starterCode.java || !p.starterCode.javascript) {
           console.log(`- Rejected: Missing one or more required starter code languages.`);
           stats.rejectedStarter++;
           continue;
        }

        console.log(`- Running Docker smoke test using C++ reference solution...`);
        const result = await executeSubmission(
          p.referenceSolution.code,
          'cpp',
          p.testCases,
          p.timeLimit || 2000,
          p.memoryLimit || 256
        );

        let isPublished = false;

        if (result.status === 'ACCEPTED') {
          console.log(`- Smoke test PASSED.`);
          isPublished = true;
        } else {
          console.log(`- Smoke test FAILED: ${result.status}`);
          // Run detailed visible test run to inspect outputs
          const runDetails = await executeRun(
            p.referenceSolution.code,
            'cpp',
            p.testCases,
            p.timeLimit || 2000,
            p.memoryLimit || 256
          );
          console.log(`- Failed Test Cases breakdown:`);
          runDetails.testResults.forEach((tr: any, idx: number) => {
            if (!tr.passed) {
              console.log(`  [Test ${idx + 1}] Input: ${JSON.stringify(tr.input)} | Expected: ${JSON.stringify(tr.expectedOutput)} | Actual: ${JSON.stringify(tr.actualOutput)}`);
            }
          });
          stats.rejectedSmokeTestFailed++;
          continue; // Do not save at all if reference fails
        }

        const problemData = {
          title: p.title,
          slug: p.slug,
          description: p.description,
          difficulty: p.difficulty,
          topics: p.topics,
          constraints: p.constraints,
          examples: p.examples,
          starterCode: p.starterCode,
          testCases: p.testCases,
          timeLimit: p.timeLimit || 2000,
          memoryLimit: p.memoryLimit || 256,
          isPublished,
          source: {
            provider: 'CodeClash',
            externalId: p.slug,
            externalUrl: '',
          }
        };

        if (existing) {
          await Problem.updateOne({ _id: existing._id }, problemData);
          console.log(`- Updated existing problem as ${isPublished ? 'PUBLISHED' : 'DRAFT'}`);
        } else {
          const newProblem = new Problem(problemData);
          await newProblem.save();
          console.log(`- Saved as ${isPublished ? 'PUBLISHED' : 'DRAFT'}`);
        }

        if (isPublished) {
           stats.importedPublished++;
           
           stats.difficulties[p.difficulty] = (stats.difficulties[p.difficulty] || 0) + 1;
           p.topics.forEach(topic => {
               stats.categories[topic] = (stats.categories[topic] || 0) + 1;
           });
        } else {
           stats.importedDraft++;
        }

      } catch (err: any) {
         console.log(`- Failed: ${err.message}`);
         stats.failed++;
      }
    }
  } catch (error: any) {
    console.error(`Fatal error: ${error.message}`);
  } finally {
    await mongoose.connection.close();
    
    console.log('\n---------------------------------');
    console.log('CodeClash Problem Bank Summary');
    console.log('---------------------------------');
    console.log(`Generated/Loaded: ${stats.total}`);
    console.log(`Validated & Published: ${stats.importedPublished}`);
    console.log(`Drafts:           ${stats.importedDraft}`);
    console.log(`Rejected:         ${stats.rejectedTests + stats.rejectedStarter + stats.rejectedSmokeTestFailed + stats.failed}`);
    console.log(`Duplicates:       ${stats.skippedDuplicate}`);
    console.log('\nDifficulty Breakdown:');
    for (const [diff, count] of Object.entries(stats.difficulties)) {
       console.log(`${diff.padEnd(10)}: ${count}`);
    }
    console.log('\nTopic Breakdown:');
    for (const [topic, count] of Object.entries(stats.categories)) {
       console.log(`${topic.padEnd(20)}: ${count}`);
    }
    console.log('---------------------------------');
    process.exit(0);
  }
};

runImporter();
