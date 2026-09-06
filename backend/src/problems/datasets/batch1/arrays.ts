import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const sumOfArray: CodeClashProblemDefinition = {
  title: 'Sum of Array Elements',
  slug: 'sum-of-array-elements',
  description: 'Given an array of integers, compute the sum of all the elements in the array.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\n\nOutput format:\nInteger sum of all elements.',
  difficulty: Difficulty.Easy,
  topics: ['Arrays', 'Math'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^4 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '3\n1 2 3', output: '6' },
    { input: '5\n10 -5 0 2 3', output: '10' }
  ],
  testCases: [
    { input: '3\n1 2 3', expectedOutput: '6', isHidden: false },
    { input: '5\n10 -5 0 2 3', expectedOutput: '10', isHidden: false },
    { input: '1\n42', expectedOutput: '42', isHidden: false },
    { input: '2\n-10 -20', expectedOutput: '-30', isHidden: true },
    { input: '4\n0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true },
    { input: '1\n10000', expectedOutput: '10000', isHidden: true },
    { input: '1\n-10000', expectedOutput: '-10000', isHidden: true },
    { input: '5\n9999 9999 9999 9999 9999', expectedOutput: '49995', isHidden: true },
    { input: '3\n-9999 0 9999', expectedOutput: '0', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    long long sum = 0;\n    for(int i=0; i<n; i++) {\n      int val; cin>>val;\n      sum += val;\n    }\n    cout << sum << "\\n";\n  }\n  return 0;\n}'
  }
};

export const maxConsecutiveOnes: CodeClashProblemDefinition = {
  title: 'Max Consecutive Ones',
  slug: 'max-consecutive-ones',
  description: 'Given a binary array (an array containing only 0s and 1s), find the maximum number of consecutive 1s in the array.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers (0 or 1)\n\nOutput format:\nInteger representing the maximum consecutive 1s.',
  difficulty: Difficulty.Easy,
  topics: ['Arrays', 'Two Pointers'],
  constraints: [
    '1 <= N <= 10^5',
    'nums[i] is either 0 or 1'
  ],
  examples: [
    { input: '6\n1 1 0 1 1 1', output: '3' },
    { input: '2\n1 0', output: '1' }
  ],
  testCases: [
    { input: '6\n1 1 0 1 1 1', expectedOutput: '3', isHidden: false },
    { input: '2\n1 0', expectedOutput: '1', isHidden: false },
    { input: '1\n1', expectedOutput: '1', isHidden: false },
    { input: '1\n0', expectedOutput: '0', isHidden: true },
    { input: '4\n0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '5\n1 1 1 1 1', expectedOutput: '5', isHidden: true },
    { input: '7\n1 0 1 1 0 1 1', expectedOutput: '2', isHidden: true },
    { input: '8\n0 1 1 1 0 1 1 1', expectedOutput: '3', isHidden: true },
    { input: '10\n1 1 1 0 0 1 1 1 1 0', expectedOutput: '4', isHidden: true },
    { input: '3\n0 1 0', expectedOutput: '1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    int maxCount=0, currentCount=0;\n    for(int i=0; i<n; i++) {\n      int val; cin>>val;\n      if(val == 1) {\n        currentCount++;\n        maxCount = max(maxCount, currentCount);\n      } else {\n        currentCount = 0;\n      }\n    }\n    cout << maxCount << "\\n";\n  }\n  return 0;\n}'
  }
};
