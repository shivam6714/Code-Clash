import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const trappingRainWater: CodeClashProblemDefinition = {
  title: 'Trapping Rain Water',
  slug: 'trapping-rain-water',
  description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nInput format:\nLine 1: N (number of elevation bars)\nLine 2: N space-separated integers\n\nOutput format:\nInteger representing total water trapped.',
  difficulty: Difficulty.Hard,
  topics: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
  constraints: [
    '1 <= height.length <= 2 * 10^4',
    '0 <= height[i] <= 10^5'
  ],
  examples: [
    { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', output: '6' },
    { input: '6\n4 2 0 3 2 5', output: '9' }
  ],
  testCases: [
    { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', expectedOutput: '6', isHidden: false },
    { input: '6\n4 2 0 3 2 5', expectedOutput: '9', isHidden: false },
    { input: '1\n100', expectedOutput: '0', isHidden: false },
    { input: '3\n2 0 2', expectedOutput: '2', isHidden: true },
    { input: '5\n5 4 3 2 1', expectedOutput: '0', isHidden: true },
    { input: '5\n1 2 3 4 5', expectedOutput: '0', isHidden: true },
    { input: '3\n5 1 5', expectedOutput: '4', isHidden: true },
    { input: '7\n1 0 2 1 0 1 3', expectedOutput: '5', isHidden: true },
    { input: '6\n100000 0 100000 0 100000 0', expectedOutput: '200000', isHidden: true },
    { input: '10\n0 1 0 2 1 0 1 3 2 1', expectedOutput: '5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> height(n);\n        for(int i = 0; i < n; i++) cin >> height[i];\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    height = [int(x) for x in lines[1:n+1]]\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] height = new int[n];\n        for (int i = 0; i < n; i++) height[i] = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const height = [];\n    for (let i = 0; i < n; i++) height.push(parseInt(input[1 + i]));\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    vector<int> h(n);\n    for(int i=0; i<n; i++) cin>>h[i];\n    if(n < 3) { cout << 0 << "\\n"; return 0; }\n    int left = 0, right = n - 1;\n    int maxL = h[left], maxR = h[right];\n    long long ans = 0;\n    while(left < right) {\n      if(maxL < maxR) {\n        left++;\n        maxL = max(maxL, h[left]);\n        ans += maxL - h[left];\n      } else {\n        right--;\n        maxR = max(maxR, h[right]);\n        ans += maxR - h[right];\n      }\n    }\n    cout << ans << "\\n";\n  }\n  return 0;\n}'
  }
};
