import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const subarraySumEqualsK: CodeClashProblemDefinition = {
  title: 'Subarray Sum Equals K',
  slug: 'subarray-sum-equals-k',
  description: 'Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\nLine 3: k (target sum)\n\nOutput format:\nInteger representing the total number of subarrays.',
  difficulty: Difficulty.Medium,
  topics: ['Arrays', 'Prefix Sum', 'Hash Table'],
  constraints: [
    '1 <= nums.length <= 2 * 10^4',
    '-1000 <= nums[i] <= 1000',
    '-10^7 <= k <= 10^7'
  ],
  examples: [
    { input: '3\n1 1 1\n2', output: '2' },
    { input: '3\n1 2 3\n3', output: '2' }
  ],
  testCases: [
    { input: '3\n1 1 1\n2', expectedOutput: '2', isHidden: false },
    { input: '3\n1 2 3\n3', expectedOutput: '2', isHidden: false },
    { input: '1\n1\n0', expectedOutput: '0', isHidden: false },
    { input: '5\n1 -1 1 -1 1\n0', expectedOutput: '6', isHidden: true },
    { input: '2\n-1 -1\n-2', expectedOutput: '1', isHidden: true },
    { input: '4\n0 0 0 0\n0', expectedOutput: '10', isHidden: true },
    { input: '10\n2 2 2 2 2 2 2 2 2 2\n4', expectedOutput: '9', isHidden: true },
    { input: '5\n1 2 3 4 5\n15', expectedOutput: '1', isHidden: true },
    { input: '3\n1000 1000 1000\n3000', expectedOutput: '1', isHidden: true },
    { input: '5\n-5 5 -5 5 -5\n0', expectedOutput: '6', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        int k; cin >> k;\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    k = int(lines[n+1])\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int k = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    const k = parseInt(input[n+1]);\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin>>nums[i];\n    int k; cin>>k;\n    unordered_map<int, int> prefixCounts;\n    prefixCounts[0] = 1;\n    long long sum = 0;\n    long long count = 0;\n    for(int x : nums) {\n      sum += x;\n      if(prefixCounts.count(sum - k)) {\n        count += prefixCounts[sum - k];\n      }\n      prefixCounts[sum]++;\n    }\n    cout << count << "\\n";\n  }\n  return 0;\n}'
  }
};

export const longestRepeatingCharacterReplacement: CodeClashProblemDefinition = {
  title: 'Longest Repeating Character Replacement',
  slug: 'longest-repeating-character-replacement',
  description: 'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.\n\nInput format:\nLine 1: string s\nLine 2: integer k\n\nOutput format:\nInteger representing the longest substring length.',
  difficulty: Difficulty.Medium,
  topics: ['Strings', 'Sliding Window', 'Hash Table'],
  constraints: [
    '1 <= s.length <= 10^5',
    's consists of only uppercase English letters.',
    '0 <= k <= s.length'
  ],
  examples: [
    { input: 'ABAB\n2', output: '4' },
    { input: 'AABABBA\n1', output: '4' }
  ],
  testCases: [
    { input: 'ABAB\n2', expectedOutput: '4', isHidden: false },
    { input: 'AABABBA\n1', expectedOutput: '4', isHidden: false },
    { input: 'A\n0', expectedOutput: '1', isHidden: false },
    { input: 'ABCDE\n1', expectedOutput: '2', isHidden: true },
    { input: 'AAAA\n2', expectedOutput: '4', isHidden: true },
    { input: 'AAAA\n0', expectedOutput: '4', isHidden: true },
    { input: 'ABBB\n2', expectedOutput: '4', isHidden: true },
    { input: 'KRSKBSKQZ\n2', expectedOutput: '4', isHidden: true },
    { input: 'XYZXXZXYX\n3', expectedOutput: '7', isHidden: true },
    { input: 'ABAA\n0', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        int k; cin >> k;\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    s = lines[0]\n    k = int(lines[1])\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        int k = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const s = input[0];\n    const k = parseInt(input[1]);\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n  string s; if(cin>>s) {\n    int k; cin>>k;\n    vector<int> counts(26, 0);\n    int left = 0, maxCount = 0, ans = 0;\n    for(int right = 0; right < s.length(); right++) {\n      counts[s[right] - \'A\']++;\n      maxCount = max(maxCount, counts[s[right] - \'A\']);\n      if(right - left + 1 - maxCount > k) {\n        counts[s[left] - \'A\']--;\n        left++;\n      }\n      ans = max(ans, right - left + 1);\n    }\n    cout << ans << "\\n";\n  }\n  return 0;\n}'
  }
};
