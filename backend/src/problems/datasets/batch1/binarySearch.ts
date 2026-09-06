import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const binarySearchBasic: CodeClashProblemDefinition = {
  title: 'Binary Search',
  slug: 'binary-search',
  description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers (sorted)\nLine 3: target integer\n\nOutput format:\nInteger index (0-indexed) or -1.',
  difficulty: Difficulty.Easy,
  topics: ['Arrays', 'Binary Search'],
  constraints: [
    '1 <= nums.length <= 10^4',
    '-10^4 <= nums[i], target <= 10^4',
    'All the integers in nums are unique.',
    'nums is sorted in ascending order.'
  ],
  examples: [
    { input: '6\n-1 0 3 5 9 12\n9', output: '4' },
    { input: '6\n-1 0 3 5 9 12\n2', output: '-1' }
  ],
  testCases: [
    { input: '6\n-1 0 3 5 9 12\n9', expectedOutput: '4', isHidden: false },
    { input: '6\n-1 0 3 5 9 12\n2', expectedOutput: '-1', isHidden: false },
    { input: '1\n5\n5', expectedOutput: '0', isHidden: false },
    { input: '1\n5\n2', expectedOutput: '-1', isHidden: true },
    { input: '2\n-5 5\n-5', expectedOutput: '0', isHidden: true },
    { input: '2\n-5 5\n5', expectedOutput: '1', isHidden: true },
    { input: '2\n-5 5\n0', expectedOutput: '-1', isHidden: true },
    { input: '5\n1 2 3 4 5\n5', expectedOutput: '4', isHidden: true },
    { input: '5\n1 2 3 4 5\n1', expectedOutput: '0', isHidden: true },
    { input: '5\n1 2 3 4 5\n3', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        int target; cin >> target;\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    target = int(lines[n+1])\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    const target = parseInt(input[n+1]);\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin>>nums[i];\n    int target; cin>>target;\n    int left = 0, right = n - 1;\n    int ans = -1;\n    while(left <= right) {\n      int mid = left + (right - left) / 2;\n      if(nums[mid] == target) { ans = mid; break; }\n      else if(nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    cout << ans << "\\n";\n  }\n  return 0;\n}'
  }
};

export const searchInsertPosition: CodeClashProblemDefinition = {
  title: 'Search Insert Position',
  slug: 'search-insert-position',
  description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers (sorted)\nLine 3: target integer\n\nOutput format:\nInteger index (0-indexed).',
  difficulty: Difficulty.Easy,
  topics: ['Arrays', 'Binary Search'],
  constraints: [
    '1 <= nums.length <= 10^4',
    '-10^4 <= nums[i], target <= 10^4',
    'nums contains distinct values sorted in ascending order.'
  ],
  examples: [
    { input: '4\n1 3 5 6\n5', output: '2' },
    { input: '4\n1 3 5 6\n2', output: '1' },
    { input: '4\n1 3 5 6\n7', output: '4' }
  ],
  testCases: [
    { input: '4\n1 3 5 6\n5', expectedOutput: '2', isHidden: false },
    { input: '4\n1 3 5 6\n2', expectedOutput: '1', isHidden: false },
    { input: '4\n1 3 5 6\n7', expectedOutput: '4', isHidden: false },
    { input: '4\n1 3 5 6\n0', expectedOutput: '0', isHidden: true },
    { input: '1\n1\n0', expectedOutput: '0', isHidden: true },
    { input: '1\n1\n2', expectedOutput: '1', isHidden: true },
    { input: '5\n1 3 5 7 9\n6', expectedOutput: '3', isHidden: true },
    { input: '3\n2 4 6\n4', expectedOutput: '1', isHidden: true },
    { input: '3\n2 4 6\n1', expectedOutput: '0', isHidden: true },
    { input: '3\n2 4 6\n7', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        int target; cin >> target;\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    target = int(lines[n+1])\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    const target = parseInt(input[n+1]);\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin>>nums[i];\n    int target; cin>>target;\n    int left = 0, right = n - 1;\n    while(left <= right) {\n      int mid = left + (right - left) / 2;\n      if(nums[mid] == target) { cout << mid << "\\n"; return 0; }\n      else if(nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    cout << left << "\\n";\n  }\n  return 0;\n}'
  }
};
