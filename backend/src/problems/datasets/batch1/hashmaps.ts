import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const containsDuplicate: CodeClashProblemDefinition = {
  title: 'Contains Duplicate',
  slug: 'contains-duplicate',
  description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\n\nOutput format:\n"true" or "false".',
  difficulty: Difficulty.Easy,
  topics: ['Arrays', 'Hash Table', 'Sorting'],
  constraints: [
    '1 <= nums.length <= 10^5',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '4\n1 2 3 1', output: 'true' },
    { input: '4\n1 2 3 4', output: 'false' },
    { input: '10\n1 1 1 3 3 4 3 2 4 2', output: 'true' }
  ],
  testCases: [
    { input: '4\n1 2 3 1', expectedOutput: 'true', isHidden: false },
    { input: '4\n1 2 3 4', expectedOutput: 'false', isHidden: false },
    { input: '10\n1 1 1 3 3 4 3 2 4 2', expectedOutput: 'true', isHidden: false },
    { input: '1\n100', expectedOutput: 'false', isHidden: true },
    { input: '2\n-1 -1', expectedOutput: 'true', isHidden: true },
    { input: '5\n1 2 3 4 5', expectedOutput: 'false', isHidden: true },
    { input: '5\n1000000000 1000000000 1 2 3', expectedOutput: 'true', isHidden: true },
    { input: '7\n0 1 2 3 4 5 0', expectedOutput: 'true', isHidden: true },
    { input: '10\n0 1 2 3 4 5 6 7 8 9', expectedOutput: 'false', isHidden: true },
    { input: '3\n-1000000000 0 1000000000', expectedOutput: 'false', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your code here and print "true" or "false"\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your code here and print "true" or "false"\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your code here and print "true" or "false"\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your code here and print "true" or "false"\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    unordered_set<int> seen;\n    bool found = false;\n    for(int i=0; i<n; i++) {\n      int val; cin>>val;\n      if(seen.count(val)) found = true;\n      seen.insert(val);\n    }\n    if(found) cout << "true\\n";\n    else cout << "false\\n";\n  }\n  return 0;\n}'
  }
};

export const firstUniqueCharacter: CodeClashProblemDefinition = {
  title: 'First Unique Character in a String',
  slug: 'first-unique-character',
  description: 'Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.\n\nInput format:\nLine 1: string s\n\nOutput format:\nInteger index (0-indexed) or -1.',
  difficulty: Difficulty.Easy,
  topics: ['Hash Table', 'Strings'],
  constraints: [
    '1 <= s.length <= 10^5',
    's consists of only lowercase English letters.'
  ],
  examples: [
    { input: 'codeclash', output: '1' },
    { input: 'lovecodeclash', output: '2' },
    { input: 'aabb', output: '-1' }
  ],
  testCases: [
    { input: 'codeclash', expectedOutput: '1', isHidden: false },
    { input: 'lovecodeclash', expectedOutput: '2', isHidden: false },
    { input: 'aabb', expectedOutput: '-1', isHidden: false },
    { input: 'a', expectedOutput: '0', isHidden: true },
    { input: 'zzyyxx', expectedOutput: '-1', isHidden: true },
    { input: 'abcdefghijklmnopqrstuvwxyz', expectedOutput: '0', isHidden: true },
    { input: 'aba', expectedOutput: '1', isHidden: true },
    { input: 'ababac', expectedOutput: '5', isHidden: true },
    { input: 'aaaa', expectedOutput: '-1', isHidden: true },
    { input: 'abcdabcdabcdabce', expectedOutput: '15', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const s = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!s) return;\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n  string s; if(cin>>s) {\n    vector<int> count(26, 0);\n    for(char c : s) count[c - \'a\']++;\n    int ans = -1;\n    for(int i=0; i<s.length(); i++) {\n      if(count[s[i] - \'a\'] == 1) {\n        ans = i; break;\n      }\n    }\n    cout << ans << "\\n";\n  }\n  return 0;\n}'
  }
};
