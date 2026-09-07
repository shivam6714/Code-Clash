import * as batch2 from '../problems/datasets/batch2';
import { CodeClashProblemDefinition } from '../problems/datasets/types';

export const validateBatch2 = () => {
  const problems: CodeClashProblemDefinition[] = Object.values(batch2);
  
  let report = {
    totalLoaded: problems.length,
    difficulties: { Easy: 0, Medium: 0, Hard: 0 },
    topics: {} as Record<string, number>,
    schemaValid: 0,
    testsValid: 0,
    starterLanguagesValid: 0,
    referenceValid: 0,
    uniqueSlugsValid: 0,
    inputOutputFormatExplained: 0,
    rejected: 0,
    failures: [] as string[]
  };

  const slugsSeen = new Set<string>();

  for (const p of problems) {
    let isValid = true;

    // 1. Slug uniqueness
    if (slugsSeen.has(p.slug)) {
      report.failures.push(`[${p.slug}] Duplicate slug detected.`);
      isValid = false;
    } else {
      slugsSeen.add(p.slug);
    }

    // 2. Difficulty
    if (p.difficulty === 'Easy' || p.difficulty === 'Medium' || p.difficulty === 'Hard') {
      report.difficulties[p.difficulty]++;
    } else {
      report.failures.push(`[${p.slug}] Invalid difficulty: ${p.difficulty}`);
      isValid = false;
    }

    // 3. Topics
    if (Array.isArray(p.topics) && p.topics.length > 0) {
      p.topics.forEach(t => {
        report.topics[t] = (report.topics[t] || 0) + 1;
      });
    } else {
      report.failures.push(`[${p.slug}] Missing or empty topics array.`);
      isValid = false;
    }

    // 4. Description & Input/Output format
    const descLower = p.description.toLowerCase();
    if (descLower.includes('input format') && descLower.includes('output format')) {
      report.inputOutputFormatExplained++;
    } else {
      report.failures.push(`[${p.slug}] Missing explicit Input format or Output format in description.`);
      isValid = false;
    }

    // 5. Test cases
    const visibleTests = p.testCases.filter(t => !t.isHidden);
    const hiddenTests = p.testCases.filter(t => t.isHidden);
    if (visibleTests.length >= 3 && hiddenTests.length >= 7) {
      report.testsValid++;
    } else {
      report.failures.push(`[${p.slug}] Insufficient test cases. Visible: ${visibleTests.length} (min 3), Hidden: ${hiddenTests.length} (min 7).`);
      isValid = false;
    }

    // 6. Starter code in 4 languages
    if (p.starterCode?.cpp && p.starterCode?.python && p.starterCode?.java && p.starterCode?.javascript) {
      report.starterLanguagesValid++;
    } else {
      report.failures.push(`[${p.slug}] Missing starter code for one or more languages.`);
      isValid = false;
    }

    // 7. Reference solution
    if (p.referenceSolution?.language === 'cpp' && p.referenceSolution?.code) {
      report.referenceValid++;
    } else {
      report.failures.push(`[${p.slug}] Invalid or missing C++ reference solution.`);
      isValid = false;
    }

    if (isValid) {
      report.schemaValid++;
    } else {
      report.rejected++;
    }
  }

  report.uniqueSlugsValid = slugsSeen.size;

  return report;
};

if (require.main === module) {
  const res = validateBatch2();
  console.log('----------------------------------------');
  console.log('CodeClash Batch 2 Validation Report');
  console.log('----------------------------------------');
  console.log(`Generated/Loaded: ${res.totalLoaded}`);
  console.log(`Easy:             ${res.difficulties.Easy}`);
  console.log(`Medium:           ${res.difficulties.Medium}`);
  console.log(`Hard:             ${res.difficulties.Hard}`);
  console.log(`Schema Valid:     ${res.schemaValid} / ${res.totalLoaded}`);
  console.log(`Tests Valid:      ${res.testsValid} / ${res.totalLoaded}`);
  console.log(`Languages Valid:  ${res.starterLanguagesValid} / ${res.totalLoaded}`);
  console.log(`Format Clear:     ${res.inputOutputFormatExplained} / ${res.totalLoaded}`);
  console.log(`Rejected:         ${res.rejected}`);
  console.log('----------------------------------------');
  console.log('Topic Breakdown:');
  for (const [topic, count] of Object.entries(res.topics)) {
    console.log(`  ${topic.padEnd(25)}: ${count}`);
  }
  console.log('----------------------------------------');
  if (res.failures.length > 0) {
    console.log('Failures:');
    res.failures.forEach(f => console.log(`  - ${f}`));
  } else {
    console.log('All 100 problems passed static schema and structural validation perfectly!');
  }
}
