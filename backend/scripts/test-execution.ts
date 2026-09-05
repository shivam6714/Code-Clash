import { executeSubmission } from '../src/execution/runner';

const test = async () => {
  console.log('--- Testing C++ ---');
  
  const correctCpp = `
#include <iostream>
using namespace std;
int main() {
  int a, b;
  if (cin >> a >> b) {
    cout << a + b << endl;
  }
  return 0;
}`;
  console.log('1. Correct C++ (Should be ACCEPTED)...');
  const res1 = await executeSubmission(correctCpp, 'cpp' as any, [{ input: '2 3', expectedOutput: '5', isHidden: false }]);
  console.log(res1);

  const incorrectCpp = `
#include <iostream>
using namespace std;
int main() {
  int a, b;
  if (cin >> a >> b) {
    cout << a - b << endl;
  }
  return 0;
}`;
  console.log('2. Incorrect C++ (Should be WRONG_ANSWER)...');
  const res2 = await executeSubmission(incorrectCpp, 'cpp' as any, [{ input: '2 3', expectedOutput: '5', isHidden: false }]);
  console.log(res2);

  const invalidCpp = `
#include <iostream>
int main() {
  coun << "hello" << endl;
}`;
  console.log('3. Invalid C++ (Should be COMPILE_ERROR)...');
  const res3 = await executeSubmission(invalidCpp, 'cpp' as any, [{ input: '2 3', expectedOutput: '5', isHidden: false }]);
  console.log(res3);

  const infLoopCpp = `
#include <iostream>
int main() {
  while(true) {}
  return 0;
}`;
  console.log('4. Infinite loop C++ (Should be TIME_LIMIT_EXCEEDED)...');
  const res4 = await executeSubmission(infLoopCpp, 'cpp' as any, [{ input: '2 3', expectedOutput: '5', isHidden: false }]);
  console.log(res4);

  console.log('--- Testing Python ---');
  console.log('5. Correct Python (Should be ACCEPTED)...');
  const res5 = await executeSubmission('a, b = map(int, input().split())\nprint(a + b)', 'python' as any, [{ input: '2 3', expectedOutput: '5', isHidden: false }]);
  console.log(res5);
};

test().catch(console.error);
