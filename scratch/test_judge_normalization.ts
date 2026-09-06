const normalizeOutput = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
};

const testCases = [
  {
    name: 'Identical outputs with Windows line endings (\\r\\n vs \\n)',
    stdout: '7 4 1\r\n8 5 2\r\n9 6 3\r\n',
    expected: '7 4 1\n8 5 2\n9 6 3',
    shouldPass: true
  },
  {
    name: 'Trailing spaces on lines',
    stdout: '7 4 1   \n8 5 2 \n9 6 3',
    expected: '7 4 1\n8 5 2\n9 6 3',
    shouldPass: true
  },
  {
    name: 'Meaningful token difference (2 vs 9)',
    stdout: '7 4 1\n8 5 9\n9 6 3',
    expected: '7 4 1\n8 5 2\n9 6 3',
    shouldPass: false
  },
  {
    name: 'Single value with extra newlines',
    stdout: '\n\n42\n\n',
    expected: '42',
    shouldPass: true
  }
];

let allPassed = true;

for (const tc of testCases) {
  const normActual = normalizeOutput(tc.stdout);
  const normExpected = normalizeOutput(tc.expected);
  const passed = normActual === normExpected;
  const testOk = passed === tc.shouldPass;

  console.log(`[${testOk ? 'PASS' : 'FAIL'}] ${tc.name}`);
  console.log(`  Actual Normalized:   ${JSON.stringify(normActual)}`);
  console.log(`  Expected Normalized: ${JSON.stringify(normExpected)}`);
  console.log(`  Match: ${passed} (Expected Pass: ${tc.shouldPass})\n`);

  if (!testOk) allPassed = false;
}

if (allPassed) {
  console.log('ALL NORMALIZATION TESTS PASSED SUCCESSFULLY!');
} else {
  console.error('SOME NORMALIZATION TESTS FAILED!');
  process.exit(1);
}
