import { executeSubmission } from '../src/execution/runner';

const test = async () => {
  console.log('Testing C++ (Should be ACCEPTED)...');
  const cppCode = `
#include <iostream>
using namespace std;
int main() {
  int a, b;
  if (cin >> a >> b) {
    cout << a + b << endl;
  }
  return 0;
}
  `;
  const resultCpp = await executeSubmission(cppCode, 'cpp' as any, [
    { input: '2 3', expectedOutput: '5', isHidden: false }
  ]);
  console.log('C++ Result:', resultCpp);

  console.log('Testing Python Execution (Should be ACCEPTED)...');
  const resultPy = await executeSubmission(
    'a, b = map(int, input().split())\nprint(a + b)',
    'python' as any,
    [{ input: '2 3', expectedOutput: '5', isHidden: false }]
  );
  console.log('Py Result:', resultPy);
};

test().catch(console.error);
