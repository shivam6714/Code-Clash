import { executeSubmission } from './backend/src/execution/runner';
import { SupportedLanguage } from './backend/src/execution/types';

async function main() {
  const codeCpp = `
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
  console.log('Testing C++...');
  const resCpp = await executeSubmission(codeCpp, 'cpp' as SupportedLanguage, [
    { input: '2 3', expectedOutput: '5', isHidden: false }
  ]);
  console.log('C++ result:', resCpp);

  const codePy = `
a, b = map(int, input().split())
print(a + b)
  `;
  console.log('Testing Python...');
  const resPy = await executeSubmission(codePy, 'python' as SupportedLanguage, [
    { input: '2 3', expectedOutput: '5', isHidden: false }
  ]);
  console.log('Python result:', resPy);
}
main().catch(console.error);
