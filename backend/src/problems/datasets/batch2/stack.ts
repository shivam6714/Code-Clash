import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2StackBackspaceStringCompare: CodeClashProblemDefinition = {
  title: 'Backspace String Evaluation Equal',
  slug: 'codeclash-b2-stack-backspace-string-compare',
  description: 'Given two strings S and T containing lowercase letters and "#" representing backspace characters, evaluate both strings (a "#" deletes the previous non-backspace character if one exists). Output "YES" if both resulting strings are equal, otherwise "NO".\n\nInput format:\nLine 1: string S\nLine 2: string T\n\nOutput format:\nLine 1: "YES" or "NO".',
  difficulty: Difficulty.Easy,
  topics: ['Stack', 'Strings', 'Two Pointers'],
  constraints: [
    '1 <= |S|, |T| <= 10^5',
    'S and T contain lowercase English letters and "#"'
  ],
  examples: [
    { input: 'ab#c\nad#c', output: 'YES' },
    { input: 'a#c\nb', output: 'NO' }
  ],
  testCases: [
    { input: 'ab#c\nad#c', expectedOutput: 'YES', isHidden: false },
    { input: 'a#c\nb', expectedOutput: 'NO', isHidden: false },
    { input: 'ab##\nc#d#', expectedOutput: 'YES', isHidden: false },
    { input: 'a##b\nb', expectedOutput: 'YES', isHidden: true },
    { input: '###\n#', expectedOutput: 'YES', isHidden: true },
    { input: 'bxj##tw\nbxjo#g#tw', expectedOutput: 'NO', isHidden: true },
    { input: 'xywrrmp\nxywrrmu#p', expectedOutput: 'YES', isHidden: true },
    { input: 'abc#d\nabd#c', expectedOutput: 'NO', isHidden: true },
    { input: 'z\nz#z', expectedOutput: 'YES', isHidden: true },
    { input: 'a#a#a#\nb#b#b#', expectedOutput: 'YES', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s, t;\n    if (cin >> s >> t) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    s, t = lines[0], lines[1]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        String t = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const s = input[0];\n    const t = input[1];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstring build(const string& str) {\n    string res = "";\n    for (char c : str) {\n        if (c == \'#\') {\n            if (!res.empty()) res.pop_back();\n        } else {\n            res.push_back(c);\n        }\n    }\n    return res;\n}\n\nint main() {\n    string s, t;\n    if (cin >> s >> t) {\n        cout << (build(s) == build(t) ? "YES" : "NO") << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StackRemoveAdjacentDuplicates: CodeClashProblemDefinition = {
  title: 'Adjacent Duplicate Character Eraser',
  slug: 'codeclash-b2-stack-remove-adjacent-duplicates',
  description: 'Repeatedly remove adjacent duplicate characters from a lowercase string S until no adjacent duplicates remain. Output the final reduced string.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Reduced string, or empty line if entire string is erased.',
  difficulty: Difficulty.Easy,
  topics: ['Stack', 'Strings'],
  constraints: [
    '1 <= |S| <= 10^5',
    'S consists of lowercase English letters'
  ],
  examples: [
    { input: 'abbaca', output: 'ca' },
    { input: 'azxxzy', output: 'ay' }
  ],
  testCases: [
    { input: 'abbaca', expectedOutput: 'ca', isHidden: false },
    { input: 'azxxzy', expectedOutput: 'ay', isHidden: false },
    { input: 'a', expectedOutput: 'a', isHidden: false },
    { input: 'aa', expectedOutput: '', isHidden: true },
    { input: 'abba', expectedOutput: '', isHidden: true },
    { input: 'abcde', expectedOutput: 'abcde', isHidden: true },
    { input: 'aababb', expectedOutput: 'ba', isHidden: true },
    { input: 'mississippi', expectedOutput: 'm', isHidden: true },
    { input: 'zzzz', expectedOutput: '', isHidden: true },
    { input: 'cbaabc', expectedOutput: '', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    if (cin >> s) {\n        string st = "";\n        for (char c : s) {\n            if (!st.empty() && st.back() == c) {\n                st.pop_back();\n            } else {\n                st.push_back(c);\n            }\n        }\n        cout << st << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StackNextGreaterElementCircular: CodeClashProblemDefinition = {
  title: 'Circular Array Next Greater Element',
  slug: 'codeclash-b2-stack-next-greater-element-circular',
  description: 'Given a circular array of N integers (where the next element of the last element is the first element), return the Next Greater Element for each position. The Next Greater Element of a number is the first greater number in traversal order. If no greater number exists, output -1 for that position.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: N space-separated integers.',
  difficulty: Difficulty.Medium,
  topics: ['Stack', 'Monotonic Stack', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '3\n1 2 1', output: '2 -1 2' },
    { input: '5\n1 2 3 4 3', output: '2 3 4 -1 4' }
  ],
  testCases: [
    { input: '3\n1 2 1', expectedOutput: '2 -1 2', isHidden: false },
    { input: '5\n1 2 3 4 3', expectedOutput: '2 3 4 -1 4', isHidden: false },
    { input: '1\n10', expectedOutput: '-1', isHidden: false },
    { input: '4\n5 4 3 2', expectedOutput: '-1 5 5 5', isHidden: true },
    { input: '4\n2 2 2 2', expectedOutput: '-1 -1 -1 -1', isHidden: true },
    { input: '5\n-1 -2 -3 -4 -5', expectedOutput: '-1 -1 -1 -1 -1', isHidden: true },
    { input: '4\n1 3 2 4', expectedOutput: '3 4 4 -1', isHidden: true },
    { input: '5\n100 1 10 100 1000', expectedOutput: '1000 10 100 1000 -1', isHidden: true },
    { input: '3\n-5 0 5', expectedOutput: '0 5 -1', isHidden: true },
    { input: '4\n10 9 8 11', expectedOutput: '11 11 11 -1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        vector<long long> res(n, -1);\n        stack<int> st;\n        for (int i = 0; i < 2 * n; i++) {\n            int idx = i % n;\n            while (!st.empty() && nums[st.top()] < nums[idx]) {\n                res[st.top()] = nums[idx];\n                st.pop();\n            }\n            if (i < n) st.push(idx);\n        }\n        for (int i = 0; i < n; i++) {\n            cout << res[i] << (i + 1 == n ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StackDecodeNestedString: CodeClashProblemDefinition = {
  title: 'Nested Pattern String Decoder',
  slug: 'codeclash-b2-stack-decode-nested-string',
  description: 'Given an encoded string S of the form `k[encoded_string]` where `encoded_string` inside square brackets is repeated exactly `k` times, return the fully decoded string. `k` is guaranteed to be a positive integer.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Decoded string.',
  difficulty: Difficulty.Medium,
  topics: ['Stack', 'Strings', 'Recursion'],
  constraints: [
    '1 <= |S| <= 1000',
    'S consists of digits, lowercase English letters, and brackets "[" and "]"'
  ],
  examples: [
    { input: '3[a]2[bc]', output: 'aaabcbc' },
    { input: '3[a2[c]]', output: 'accaccacc' }
  ],
  testCases: [
    { input: '3[a]2[bc]', expectedOutput: 'aaabcbc', isHidden: false },
    { input: '3[a2[c]]', expectedOutput: 'accaccacc', isHidden: false },
    { input: '2[abc]3[cd]ef', expectedOutput: 'abcabccdcdcdef', isHidden: false },
    { input: '1[a]', expectedOutput: 'a', isHidden: true },
    { input: '10[a]', expectedOutput: 'aaaaaaaaaa', isHidden: true },
    { input: '2[2[2[a]]]', expectedOutput: 'aaaaaaaa', isHidden: true },
    { input: 'abc', expectedOutput: 'abc', isHidden: true },
    { input: '2[a2[b3[c]]]', expectedOutput: 'abcccbcccabcccbccc', isHidden: true },
    { input: '3[z]2[2[y]]', expectedOutput: 'zzzyyyy', isHidden: true },
    { input: '1[2[3[x]]]', expectedOutput: 'xxxxxx', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <stack>\n#include <cctype>\nusing namespace std;\nint main() {\n    string s;\n    if (cin >> s) {\n        stack<int> numStack;\n        stack<string> strStack;\n        string currStr = "";\n        int k = 0;\n        for (char c : s) {\n            if (isdigit(c)) {\n                k = k * 10 + (c - \'0\');\n            } else if (c == \'[\') {\n                numStack.push(k);\n                strStack.push(currStr);\n                k = 0;\n                currStr = "";\n            } else if (c == \']\') {\n                int count = numStack.top(); numStack.pop();\n                string prevStr = strStack.top(); strStack.pop();\n                string temp = "";\n                for (int i = 0; i < count; i++) temp += currStr;\n                currStr = prevStr + temp;\n            } else {\n                currStr += c;\n            }\n        }\n        cout << currStr << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2StackMaxRectangleHistogram: CodeClashProblemDefinition = {
  title: 'Largest Rectangle in Histogram',
  slug: 'codeclash-b2-stack-max-rectangle-histogram',
  description: 'Given an array of N integers representing the heights of adjacent histogram bars (each bar having width 1), find the area of the largest rectangle that can be formed within the histogram.\n\nInput format:\nLine 1: N\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: Single integer area of largest rectangle.',
  difficulty: Difficulty.Hard,
  topics: ['Stack', 'Monotonic Stack', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= heights[i] <= 10^4'
  ],
  examples: [
    { input: '6\n2 1 5 6 2 3', output: '10' },
    { input: '2\n2 4', output: '4' }
  ],
  testCases: [
    { input: '6\n2 1 5 6 2 3', expectedOutput: '10', isHidden: false },
    { input: '2\n2 4', expectedOutput: '4', isHidden: false },
    { input: '1\n10', expectedOutput: '10', isHidden: false },
    { input: '5\n1 1 1 1 1', expectedOutput: '5', isHidden: true },
    { input: '5\n5 4 3 2 1', expectedOutput: '9', isHidden: true },
    { input: '4\n0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '5\n10 20 30 20 10', expectedOutput: '60', isHidden: true },
    { input: '7\n6 2 5 4 5 1 6', expectedOutput: '12', isHidden: true },
    { input: '4\n100 10 10 100', expectedOutput: '100', isHidden: true },
    { input: '5\n2 2 2 2 2', expectedOutput: '10', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> heights(n);\n        for(int i = 0; i < n; i++) cin >> heights[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    heights = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] heights = new long[n];\n        for (int i = 0; i < n; i++) heights[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const heights = [];\n    for (let i = 0; i < n; i++) heights.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> h(n);\n        for (int i = 0; i < n; i++) cin >> h[i];\n        stack<int> st;\n        long long maxArea = 0;\n        for (int i = 0; i <= n; i++) {\n            long long currentH = (i == n ? 0 : h[i]);\n            while (!st.empty() && h[st.top()] >= currentH) {\n                long long height = h[st.top()];\n                st.pop();\n                long long width = st.empty() ? i : (i - st.top() - 1);\n                maxArea = max(maxArea, height * width);\n            }\n            st.push(i);\n        }\n        cout << maxArea << "\\n";\n    }\n    return 0;\n}'
  }
};
