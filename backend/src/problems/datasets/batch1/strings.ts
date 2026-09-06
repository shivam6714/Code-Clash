import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const reverseString: CodeClashProblemDefinition = {
  title: 'Reverse String',
  slug: 'reverse-string',
  description: 'Write a function that reverses a string.\n\nInput format:\nLine 1: string s (contains no spaces)\n\nOutput format:\nReversed string s.',
  difficulty: Difficulty.Easy,
  topics: ['Strings', 'Two Pointers'],
  constraints: [
    '1 <= s.length <= 10^5',
    's consists of printable ASCII characters without spaces.'
  ],
  examples: [
    { input: 'hello', output: 'olleh' },
    { input: 'CodeClash', output: 'hsalCedoC' }
  ],
  testCases: [
    { input: 'hello', expectedOutput: 'olleh', isHidden: false },
    { input: 'CodeClash', expectedOutput: 'hsalCedoC', isHidden: false },
    { input: 'a', expectedOutput: 'a', isHidden: false },
    { input: 'ab', expectedOutput: 'ba', isHidden: true },
    { input: 'racecar', expectedOutput: 'racecar', isHidden: true },
    { input: 'A', expectedOutput: 'A', isHidden: true },
    { input: '123456789', expectedOutput: '987654321', isHidden: true },
    { input: '!@#$', expectedOutput: '$#@!', isHidden: true },
    { input: 'abBa', expectedOutput: 'aBba', isHidden: true },
    { input: 'zz', expectedOutput: 'zz', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const s = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!s) return;\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n  string s; if(cin>>s) {\n    reverse(s.begin(), s.end());\n    cout << s << "\\n";\n  }\n  return 0;\n}'
  }
};

export const validPalindrome: CodeClashProblemDefinition = {
  title: 'Valid Palindrome',
  slug: 'valid-palindrome',
  description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string s, return true if it is a palindrome, or false otherwise.\n\nInput format:\nLine 1: string s (can contain spaces and punctuation. Read until EOF)\n\nOutput format:\n"true" or "false".',
  difficulty: Difficulty.Easy,
  topics: ['Strings', 'Two Pointers'],
  constraints: [
    '1 <= s.length <= 2 * 10^5',
    's consists only of printable ASCII characters.'
  ],
  examples: [
    { input: 'A man, a plan, a canal: Panama', output: 'true' },
    { input: 'race a car', output: 'false' },
    { input: ' ', output: 'true' }
  ],
  testCases: [
    { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', isHidden: false },
    { input: 'race a car', expectedOutput: 'false', isHidden: false },
    { input: ' ', expectedOutput: 'true', isHidden: false },
    { input: 'a.', expectedOutput: 'true', isHidden: true },
    { input: 'ab', expectedOutput: 'false', isHidden: true },
    { input: '0P', expectedOutput: 'false', isHidden: true },
    { input: '1b1', expectedOutput: 'true', isHidden: true },
    { input: '.,', expectedOutput: 'true', isHidden: true },
    { input: 'Marge, let\'s \\"went.\\" I await news telegram.', expectedOutput: 'true', isHidden: true },
    { input: 'Not a palindrome', expectedOutput: 'false', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s, temp;\n    string full = "";\n    while(cin >> temp) full += temp + " ";\n    if(full.length() > 0) full.pop_back();\n    // Write your code here and print "true" or "false"\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    # Write your code here and print "true" or "false"\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        StringBuilder sb = new StringBuilder();\n        while(sc.hasNext()) sb.append(sc.next()).append(" ");\n        String s = sb.toString().trim();\n        // Write your code here and print "true" or "false"\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const s = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    // Write your code here and print "true" or "false"\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\nint main() {\n  string s, temp; string full = "";\n  while(cin >> temp) full += temp + " ";\n  if(full.length() > 0) full.pop_back();\n  string filtered = "";\n  for(char c : full) {\n    if(isalnum(c)) filtered += tolower(c);\n  }\n  int left = 0, right = filtered.length() - 1;\n  bool isPalin = true;\n  while(left < right) {\n    if(filtered[left] != filtered[right]) { isPalin = false; break; }\n    left++; right--;\n  }\n  if(isPalin) cout << "true\\n";\n  else cout << "false\\n";\n  return 0;\n}'
  }
};

export const longestPalindromicSubstring: CodeClashProblemDefinition = {
  title: 'Longest Palindromic Substring Length',
  slug: 'longest-palindromic-substring',
  description: 'Given a string s, return the length of the longest palindromic substring in s.\n\nInput format:\nLine 1: string s\n\nOutput format:\nInteger representing the length of the longest palindromic substring.',
  difficulty: Difficulty.Medium,
  topics: ['Strings', 'Dynamic Programming', 'Two Pointers'],
  constraints: [
    '1 <= s.length <= 1000',
    's consist of only digits and English letters.'
  ],
  examples: [
    { input: 'babad', output: '3' },
    { input: 'cbbd', output: '2' }
  ],
  testCases: [
    { input: 'babad', expectedOutput: '3', isHidden: false },
    { input: 'cbbd', expectedOutput: '2', isHidden: false },
    { input: 'a', expectedOutput: '1', isHidden: false },
    { input: 'ac', expectedOutput: '1', isHidden: true },
    { input: 'racecar', expectedOutput: '7', isHidden: true },
    { input: 'bananas', expectedOutput: '5', isHidden: true },
    { input: 'bbbb', expectedOutput: '4', isHidden: true },
    { input: 'abacdfgdcaba', expectedOutput: '3', isHidden: true },
    { input: 'ccc', expectedOutput: '3', isHidden: true },
    { input: 'aaaaa', expectedOutput: '5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if(cin >> s) {\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const s = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!s) return;\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint expandAroundCenter(string s, int left, int right) {\n  int L = left, R = right;\n  while(L >= 0 && R < s.length() && s[L] == s[R]) { L--; R++; }\n  return R - L - 1;\n}\n\nint main() {\n  string s; if(cin>>s) {\n    if(s.length() < 1) { cout << 0 << "\\n"; return 0; }\n    int maxLen = 0;\n    for(int i=0; i<s.length(); i++) {\n      int len1 = expandAroundCenter(s, i, i);\n      int len2 = expandAroundCenter(s, i, i+1);\n      maxLen = max(maxLen, max(len1, len2));\n    }\n    cout << maxLen << "\\n";\n  }\n  return 0;\n}'
  }
};
