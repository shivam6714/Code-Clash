import mongoose from 'mongoose';
import { Problem, Difficulty } from '../models/Problem';
import { config } from '../config/env';

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\nLine 3: target integer\n\nOutput format:\nSpace-separated indices.',
    difficulty: Difficulty.Easy,
    topics: ['Arrays', 'Hashing'],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: '4\n2 7 11 15\n9',
        output: '0 1'
      }
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid solve(vector<int>& nums, int target) {\n    // Write your code here and print the result\n}\n\nint main() {\n    int n; if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int target; cin >> target;\n    solve(nums, target);\n    return 0;\n}',
      python: 'import sys\n\ndef solve(nums, target):\n    # Write your code here and print the result\n    pass\n\nif __name__ == "__main__":\n    lines = sys.stdin.read().split()\n    if not lines: sys.exit(0)\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    target = int(lines[n+1])\n    solve(nums, target)',
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void solve(int[] nums, int target) {\n        // Write your code here and print the result\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        solve(nums, target);\n    }\n}',
      javascript: 'const fs = require("fs");\n\nfunction solve(nums, target) {\n    // Write your code here and print the result\n}\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    const target = parseInt(input[n + 1]);\n    solve(nums, target);\n}\nmain();'
    },
    testCases: [
      { input: '4\n2 7 11 15\n9', expectedOutput: '0 1', isHidden: false },
      { input: '3\n3 2 4\n6', expectedOutput: '1 2', isHidden: false },
      { input: '2\n3 3\n6', expectedOutput: '0 1', isHidden: true },
      { input: '5\n-1 -2 -3 -4 -5\n-8', expectedOutput: '2 4', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.\n\nInput format:\nLine 1: string s\n\nOutput format:\ntrue or false',
    difficulty: Difficulty.Easy,
    topics: ['Strings', 'Stack'],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    examples: [
      {
        input: '()[]{}',
        output: 'true'
      },
      {
        input: '(]',
        output: 'false'
      }
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid solve(string s) {\n    // Write your code here and print true or false\n}\n\nint main() {\n    string s; if(cin >> s) solve(s);\n    return 0;\n}',
      python: 'import sys\n\ndef solve(s):\n    # Write your code here and print true or false\n    pass\n\nif __name__ == "__main__":\n    s = sys.stdin.read().strip()\n    if s: solve(s)',
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void solve(String s) {\n        // Write your code here and print true or false\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) solve(sc.next());\n    }\n}',
      javascript: 'const fs = require("fs");\n\nfunction solve(s) {\n    // Write your code here and console.log true or false\n}\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (input) solve(input);\n}\nmain();'
    },
    testCases: [
      { input: '()', expectedOutput: 'true', isHidden: false },
      { input: '()[]{}', expectedOutput: 'true', isHidden: false },
      { input: '(]', expectedOutput: 'false', isHidden: false },
      { input: '([)]', expectedOutput: 'false', isHidden: true },
      { input: '{[]}', expectedOutput: 'true', isHidden: true }
    ],
    timeLimit: 1500,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\n\nOutput format:\nMaximum sum integer.',
    difficulty: Difficulty.Medium,
    topics: ['Arrays', 'Dynamic Programming', 'Greedy'],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    examples: [
      {
        input: '9\n-2 1 -3 4 -1 2 1 -5 4',
        output: '6'
      }
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid solve(vector<int>& nums) {\n    // Write your code here and print the result\n}\n\nint main() {\n    int n; if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    solve(nums);\n    return 0;\n}',
      python: 'import sys\n\ndef solve(nums):\n    # Write your code here and print the result\n    pass\n\nif __name__ == "__main__":\n    lines = sys.stdin.read().split()\n    if not lines: sys.exit(0)\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    solve(nums)',
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void solve(int[] nums) {\n        // Write your code here and print the result\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        solve(nums);\n    }\n}',
      javascript: 'const fs = require("fs");\n\nfunction solve(nums) {\n    // Write your code here and console.log the result\n}\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    solve(nums);\n}\nmain();'
    },
    testCases: [
      { input: '9\n-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6', isHidden: false },
      { input: '1\n1', expectedOutput: '1', isHidden: false },
      { input: '5\n5 4 -1 7 8', expectedOutput: '23', isHidden: false },
      { input: '1\n-1', expectedOutput: '-1', isHidden: true },
      { input: '2\n-2 -1', expectedOutput: '-1', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.\n\nInput format:\nLine 1: string s\n\nOutput format:\nInteger length.',
    difficulty: Difficulty.Medium,
    topics: ['Strings', 'Hashing', 'Sliding Window'],
    constraints: [
      '0 <= s.length <= 5 * 10^4'
    ],
    examples: [
      {
        input: 'abcabcbb',
        output: '3'
      }
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid solve(string s) {\n    // Write your code here and print the result\n}\n\nint main() {\n    string s; if(cin >> s) solve(s);\n    else solve("");\n    return 0;\n}',
      python: 'import sys\n\ndef solve(s):\n    # Write your code here and print the result\n    pass\n\nif __name__ == "__main__":\n    s = sys.stdin.read().strip()\n    solve(s)',
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void solve(String s) {\n        // Write your code here and print the result\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) solve(sc.next());\n        else solve("");\n    }\n}',
      javascript: 'const fs = require("fs");\n\nfunction solve(s) {\n    // Write your code here and console.log the result\n}\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    solve(input);\n}\nmain();'
    },
    testCases: [
      { input: 'abcabcbb', expectedOutput: '3', isHidden: false },
      { input: 'bbbbb', expectedOutput: '1', isHidden: false },
      { input: 'pwwkew', expectedOutput: '3', isHidden: false },
      { input: 'au', expectedOutput: '2', isHidden: true },
      { input: 'a', expectedOutput: '1', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nInput format:\nLine 1: m\nLine 2: m space-separated integers\nLine 3: n\nLine 4: n space-separated integers\n\nOutput format:\nMedian integer or float.',
    difficulty: Difficulty.Hard,
    topics: ['Arrays', 'Binary Search'],
    constraints: [
      '0 <= m, n <= 1000'
    ],
    examples: [
      {
        input: '2\n1 3\n1\n2',
        output: '2'
      }
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid solve(vector<int>& nums1, vector<int>& nums2) {\n    // Write your code here and print the result\n}\n\nint main() {\n    int m, n; \n    if(!(cin >> m)) return 0;\n    vector<int> nums1(m);\n    for(int i=0; i<m; i++) cin >> nums1[i];\n    if(!(cin >> n)) return 0;\n    vector<int> nums2(n);\n    for(int i=0; i<n; i++) cin >> nums2[i];\n    solve(nums1, nums2);\n    return 0;\n}',
      python: 'import sys\n\ndef solve(nums1, nums2):\n    # Write your code here and print the result\n    pass\n\nif __name__ == "__main__":\n    lines = sys.stdin.read().split()\n    if not lines: sys.exit(0)\n    m = int(lines[0])\n    nums1 = [int(x) for x in lines[1:m+1]]\n    idx = m+1\n    n = int(lines[idx])\n    nums2 = [int(x) for x in lines[idx+1:idx+1+n]]\n    solve(nums1, nums2)',
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void solve(int[] nums1, int[] nums2) {\n        // Write your code here and print the result\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int m = sc.nextInt();\n        int[] nums1 = new int[m];\n        for (int i = 0; i < m; i++) nums1[i] = sc.nextInt();\n        int n = sc.nextInt();\n        int[] nums2 = new int[n];\n        for (int i = 0; i < n; i++) nums2[i] = sc.nextInt();\n        solve(nums1, nums2);\n    }\n}',
      javascript: 'const fs = require("fs");\n\nfunction solve(nums1, nums2) {\n    // Write your code here and console.log the result\n}\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const m = parseInt(input[0]);\n    const nums1 = [];\n    for (let i = 0; i < m; i++) nums1.push(parseInt(input[1 + i]));\n    let idx = m + 1;\n    const n = parseInt(input[idx]);\n    const nums2 = [];\n    for (let i = 0; i < n; i++) nums2.push(parseInt(input[idx + 1 + i]));\n    solve(nums1, nums2);\n}\nmain();'
    },
    testCases: [
      { input: '2\n1 3\n1\n2', expectedOutput: '2', isHidden: false },
      { input: '2\n1 2\n2\n3 4', expectedOutput: '2.5', isHidden: false },
      { input: '2\n0 0\n2\n0 0', expectedOutput: '0', isHidden: true },
      { input: '0\n\n1\n1', expectedOutput: '1', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected.');
    
    console.log('Deleting existing problems (only!)...');
    await Problem.deleteMany({});
    
    console.log('Inserting seed problems...');
    await Problem.insertMany(problems);
    
    console.log('Successfully seeded 5 problems for stdin/stdout contract.');
  } catch (error) {
    console.error('Failed to seed problems:', error);
  } finally {
    console.log('Closing database connection...');
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDB();
