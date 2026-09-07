import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2StringVowelConsonantInterleave: CodeClashProblemDefinition = {
  title: 'Vowel-Consonant Strict Alternate',
  slug: 'codeclash-b2-string-vowel-consonant-interleave',
  description: 'Given a lowercase string S, determine whether vowels (a, e, i, o, u) and consonants strictly alternate at every step (i.e., no two adjacent characters are both vowels or both consonants).\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: "YES" if strictly alternating, otherwise "NO".',
  difficulty: Difficulty.Easy,
  topics: ['Strings'],
  constraints: [
    '1 <= |S| <= 10^5',
    'S consists only of lowercase English letters'
  ],
  examples: [
    { input: 'abace', output: 'YES' },
    { input: 'apple', output: 'NO' }
  ],
  testCases: [
    { input: 'abace', expectedOutput: 'YES', isHidden: false },
    { input: 'apple', expectedOutput: 'NO', isHidden: false },
    { input: 'a', expectedOutput: 'YES', isHidden: false },
    { input: 'b', expectedOutput: 'YES', isHidden: true },
    { input: 'aba', expectedOutput: 'YES', isHidden: true },
    { input: 'bab', expectedOutput: 'YES', isHidden: true },
    { input: 'aeiou', expectedOutput: 'NO', isHidden: true },
    { input: 'codeclash', expectedOutput: 'NO', isHidden: true },
    { input: 'ibiduba', expectedOutput: 'YES', isHidden: true },
    { input: 'zoxu', expectedOutput: 'YES', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isVowel(char c) {\n    return c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\';\n}\n\nint main() {\n    string s;\n    if (cin >> s) {\n        bool ok = true;\n        for (size_t i = 1; i < s.length(); i++) {\n            if (isVowel(s[i]) == isVowel(s[i - 1])) {\n                ok = false;\n                break;\n            }\n        }\n        cout << (ok ? "YES" : "NO") << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StringCharFreqSort: CodeClashProblemDefinition = {
  title: 'Character Frequency Order Sort',
  slug: 'codeclash-b2-string-character-frequency-sort',
  description: 'Given a string S of lowercase English letters, sort its characters primarily by frequency in descending order. If two characters have equal frequency, sort them alphabetically in ascending order. Print the resulting sorted string.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Sorted string.',
  difficulty: Difficulty.Easy,
  topics: ['Strings', 'Sorting', 'Hashing'],
  constraints: [
    '1 <= |S| <= 10^5',
    'S contains lowercase English letters'
  ],
  examples: [
    { input: 'tree', output: 'eert' },
    { input: 'cccaaa', output: 'aaaccc' }
  ],
  testCases: [
    { input: 'tree', expectedOutput: 'eert', isHidden: false },
    { input: 'cccaaa', expectedOutput: 'aaaccc', isHidden: false },
    { input: 'A', expectedOutput: 'A', isHidden: false },
    { input: 'codeclash', expectedOutput: 'ccadehlos', isHidden: true },
    { input: 'bbbaac', expectedOutput: 'bbbaac', isHidden: true },
    { input: 'zyx', expectedOutput: 'xyz', isHidden: true },
    { input: 'banana', expectedOutput: 'aaannb', isHidden: true },
    { input: 'a', expectedOutput: 'a', isHidden: true },
    { input: 'mississippi', expectedOutput: 'iiiissssppm', isHidden: true },
    { input: 'abacaba', expectedOutput: 'aaaabbc', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n#include <map>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        map<char, int> freq;\n        for (char c : s) freq[c]++;\n        vector<pair<char, int>> vec(freq.begin(), freq.end());\n        sort(vec.begin(), vec.end(), [](const pair<char, int>& a, const pair<char, int>& b) {\n            if (a.second != b.second) return a.second > b.second;\n            return a.first < b.first;\n        });\n        string res = "";\n        for (auto p : vec) {\n            res.append(p.second, p.first);\n        }\n        cout << res << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StringMinDeletionsUniqueFreq: CodeClashProblemDefinition = {
  title: 'Unique Frequency Minimal Deletions',
  slug: 'codeclash-b2-string-min-deletions-unique-freq',
  description: 'A string is called good if no two different characters have the same frequency. Given a string S, return the minimum number of character deletions needed to make S good.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Single integer representing minimum deletions.',
  difficulty: Difficulty.Medium,
  topics: ['Strings', 'Greedy', 'Hashing'],
  constraints: [
    '1 <= |S| <= 10^5',
    'S contains lowercase English letters'
  ],
  examples: [
    { input: 'aab', output: '0' },
    { input: 'aaabbbcc', output: '2' }
  ],
  testCases: [
    { input: 'aab', expectedOutput: '0', isHidden: false },
    { input: 'aaabbbcc', expectedOutput: '2', isHidden: false },
    { input: 'ceabaacb', expectedOutput: '2', isHidden: false },
    { input: 'a', expectedOutput: '0', isHidden: true },
    { input: 'abc', expectedOutput: '2', isHidden: true },
    { input: 'aabbcc', expectedOutput: '3', isHidden: true },
    { input: 'aaabbbcccddd', expectedOutput: '6', isHidden: true },
    { input: 'abcdefghijklmnopqrstuvwxyz', expectedOutput: '25', isHidden: true },
    { input: 'aaaa', expectedOutput: '0', isHidden: true },
    { input: 'aabbbcccdddd', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <vector>\n#include <unordered_map>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        unordered_map<char, int> freq;\n        for (char c : s) freq[c]++;\n        vector<int> counts;\n        for (auto p : freq) counts.push_back(p.second);\n        sort(counts.rbegin(), counts.rend());\n        unordered_set<int> used;\n        int deletions = 0;\n        for (int f : counts) {\n            while (f > 0 && used.count(f)) {\n                f--;\n                deletions++;\n            }\n            if (f > 0) used.insert(f);\n        }\n        cout << deletions << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StringCompressRunLength: CodeClashProblemDefinition = {
  title: 'Run-Length Encoded Stream',
  slug: 'codeclash-b2-string-compress-run-length',
  description: 'Perform run-length encoding on string S. Replace consecutive identical characters with the character followed by the count of consecutive occurrences. If count is 1, print just the character.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Encoded string.',
  difficulty: Difficulty.Medium,
  topics: ['Strings', 'Two Pointers'],
  constraints: [
    '1 <= |S| <= 10^5',
    'S contains uppercase and lowercase English letters'
  ],
  examples: [
    { input: 'aabcccccaaa', output: 'a2bc5a3' },
    { input: 'abcd', output: 'abcd' }
  ],
  testCases: [
    { input: 'aabcccccaaa', expectedOutput: 'a2bc5a3', isHidden: false },
    { input: 'abcd', expectedOutput: 'abcd', isHidden: false },
    { input: 'WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWW', expectedOutput: 'W12BW12B3W24BW12', isHidden: false },
    { input: 'a', expectedOutput: 'a', isHidden: true },
    { input: 'aaaaaaaaaa', expectedOutput: 'a10', isHidden: true },
    { input: 'AaAaAa', expectedOutput: 'AaAaAa', isHidden: true },
    { input: 'AAAbbbCCC', expectedOutput: 'A3b3C3', isHidden: true },
    { input: 'aabbcc', expectedOutput: 'a2b2c2', isHidden: true },
    { input: 'z', expectedOutput: 'z', isHidden: true },
    { input: 'zzzzzzzzzzzzzzzzzzzz', expectedOutput: 'z20', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        string res = "";\n        int n = s.length();\n        for (int i = 0; i < n; ) {\n            int j = i;\n            while (j < n && s[j] == s[i]) j++;\n            int cnt = j - i;\n            res += s[i];\n            if (cnt > 1) res += to_string(cnt);\n            i = j;\n        }\n        cout << res << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StringLongestPalindromeKEdits: CodeClashProblemDefinition = {
  title: 'Longest Near-Palindromic Substring',
  slug: 'codeclash-b2-string-longest-palindrome-k-edits',
  description: 'Find the maximum length of a substring in string S that can be transformed into a palindrome by replacing at most K characters.\n\nInput format:\nLine 1: N K (length of S and max character replacements K)\nLine 2: string S\n\nOutput format:\nLine 1: Maximum length integer.',
  difficulty: Difficulty.Medium,
  topics: ['Strings', 'Dynamic Programming', 'Two Pointers'],
  constraints: [
    '1 <= N <= 1000',
    '0 <= K <= N',
    'S consists of lowercase English letters'
  ],
  examples: [
    { input: '6 1\nabcbad', output: '5' },
    { input: '4 0\nabba', output: '4' }
  ],
  testCases: [
    { input: '6 1\nabcbad', expectedOutput: '5', isHidden: false },
    { input: '4 0\nabba', expectedOutput: '4', isHidden: false },
    { input: '5 2\nabcde', expectedOutput: '5', isHidden: false },
    { input: '1 0\nz', expectedOutput: '1', isHidden: true },
    { input: '5 0\nabcde', expectedOutput: '1', isHidden: true },
    { input: '6 0\nzzzzzz', expectedOutput: '6', isHidden: true },
    { input: '7 1\nracbcar', expectedOutput: '7', isHidden: true },
    { input: '8 2\naaaaaaaa', expectedOutput: '8', isHidden: true },
    { input: '6 1\nabcdef', expectedOutput: '3', isHidden: true },
    { input: '10 2\nabcdefghij', expectedOutput: '5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        string s;\n        cin >> s;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    s = lines[2]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const s = input[2];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        string s;\n        cin >> s;\n        int maxLen = 1;\n        for (int i = 0; i < n; i++) {\n            for (int j = i; j < n; j++) {\n                int len = j - i + 1;\n                int l = i, r = j, diff = 0;\n                while (l < r) {\n                    if (s[l] != s[r]) diff++;\n                    l++; r--;\n                }\n                if (diff <= k) maxLen = max(maxLen, len);\n            }\n        }\n        cout << maxLen << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StringLexicographicalMinRotation: CodeClashProblemDefinition = {
  title: 'Minimal Lexicographical Cyclic Shift',
  slug: 'codeclash-b2-string-lexicographical-minimum-rotation',
  description: 'Find the lexicographically smallest string obtainable by cyclically rotating string S.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Lexicographically minimal rotated string.',
  difficulty: Difficulty.Hard,
  topics: ['Strings', 'Two Pointers'],
  constraints: [
    '1 <= |S| <= 10^5',
    'S contains lowercase English letters'
  ],
  examples: [
    { input: 'bba', output: 'abb' },
    { input: 'codeclash', output: 'ashcodecl' }
  ],
  testCases: [
    { input: 'bba', expectedOutput: 'abb', isHidden: false },
    { input: 'codeclash', expectedOutput: 'ashcodecl', isHidden: false },
    { input: 'aaaaa', expectedOutput: 'aaaaa', isHidden: false },
    { input: 'cba', expectedOutput: 'acb', isHidden: true },
    { input: 'cab', expectedOutput: 'abc', isHidden: true },
    { input: 'z', expectedOutput: 'z', isHidden: true },
    { input: 'banana', expectedOutput: 'abanan', isHidden: true },
    { input: 'abacaba', expectedOutput: 'aabacab', isHidden: true },
    { input: 'dcba', expectedOutput: 'adcb', isHidden: true },
    { input: 'bacabac', expectedOutput: 'abacbac', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        int n = s.length();\n        string S = s + s;\n        int i = 0, j = 1, k = 0;\n        while (i < n && j < n && k < n) {\n            if (S[i + k] == S[j + k]) {\n                k++;\n            } else if (S[i + k] > S[j + k]) {\n                i = i + k + 1;\n                if (i <= j) i = j + 1;\n                k = 0;\n            } else {\n                j = j + k + 1;\n                if (j <= i) j = i + 1;\n                k = 0;\n            }\n        }\n        int start = min(i, j);\n        cout << S.substr(start, n) << "\\n";\n    }\n    return 0;\n}'
  }
};
