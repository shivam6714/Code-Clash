import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const dailyTemperatures: CodeClashProblemDefinition = {
  title: 'Daily Temperatures',
  slug: 'daily-temperatures',
  description: 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.\n\nInput format:\nLine 1: N (number of days)\nLine 2: N space-separated integers\n\nOutput format:\nN space-separated integers representing the answer array.',
  difficulty: Difficulty.Medium,
  topics: ['Array', 'Stack', 'Monotonic Stack'],
  constraints: [
    '1 <= temperatures.length <= 10^5',
    '30 <= temperatures[i] <= 100'
  ],
  examples: [
    { input: '8\n73 74 75 71 69 72 76 73', output: '1 1 4 2 1 1 0 0' },
    { input: '4\n30 40 50 60', output: '1 1 1 0' }
  ],
  testCases: [
    { input: '8\n73 74 75 71 69 72 76 73', expectedOutput: '1 1 4 2 1 1 0 0', isHidden: false },
    { input: '4\n30 40 50 60', expectedOutput: '1 1 1 0', isHidden: false },
    { input: '3\n30 60 90', expectedOutput: '1 1 0', isHidden: false },
    { input: '1\n50', expectedOutput: '0', isHidden: true },
    { input: '5\n100 100 100 100 100', expectedOutput: '0 0 0 0 0', isHidden: true },
    { input: '4\n90 80 70 60', expectedOutput: '0 0 0 0', isHidden: true },
    { input: '5\n30 31 30 31 30', expectedOutput: '1 0 1 0 0', isHidden: true },
    { input: '6\n89 62 70 58 47 47', expectedOutput: '0 1 0 0 0 0', isHidden: true },
    { input: '4\n30 30 40 40', expectedOutput: '2 1 0 0', isHidden: true },
    { input: '10\n40 39 38 37 36 35 34 33 32 100', expectedOutput: '9 8 7 6 5 4 3 2 1 0', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> t(n);\n        for(int i = 0; i < n; i++) cin >> t[i];\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    t = [int(x) for x in lines[1:n+1]]\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] t = new int[n];\n        for (int i = 0; i < n; i++) t[i] = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const t = [];\n    for (let i = 0; i < n; i++) t.push(parseInt(input[1 + i]));\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    vector<int> t(n);\n    for(int i=0; i<n; i++) cin>>t[i];\n    vector<int> ans(n, 0);\n    stack<int> s;\n    for(int i=0; i<n; i++) {\n      while(!s.empty() && t[i] > t[s.top()]) {\n        int idx = s.top();\n        ans[idx] = i - idx;\n        s.pop();\n      }\n      s.push(i);\n    }\n    for(int i=0; i<n; i++) {\n      cout << ans[i] << (i == n - 1 ? "" : " ");\n    }\n    cout << "\\n";\n  }\n  return 0;\n}'
  }
};

export const evaluateReversePolishNotation: CodeClashProblemDefinition = {
  title: 'Evaluate Reverse Polish Notation',
  slug: 'evaluate-reverse-polish-notation',
  description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.\n\nValid operators are +, -, *, and /. Each operand may be an integer or another expression.\nNote that division between two integers should truncate toward zero.\n\nInput format:\nLine 1: N (number of tokens)\nLine 2: N space-separated tokens (strings)\n\nOutput format:\nInteger result of the evaluation.',
  difficulty: Difficulty.Medium,
  topics: ['Array', 'Math', 'Stack'],
  constraints: [
    '1 <= tokens.length <= 10^4',
    'tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].',
    'The RPN expression is always valid.'
  ],
  examples: [
    { input: '5\n2 1 + 3 *', output: '9' },
    { input: '5\n4 13 5 / +', output: '6' }
  ],
  testCases: [
    { input: '5\n2 1 + 3 *', expectedOutput: '9', isHidden: false },
    { input: '5\n4 13 5 / +', expectedOutput: '6', isHidden: false },
    { input: '13\n10 6 9 3 + -11 * / * 17 + 5 +', expectedOutput: '22', isHidden: false },
    { input: '1\n18', expectedOutput: '18', isHidden: true },
    { input: '3\n-1 -1 -', expectedOutput: '0', isHidden: true },
    { input: '5\n10 3 / 3 *', expectedOutput: '9', isHidden: true },
    { input: '3\n200 200 *', expectedOutput: '40000', isHidden: true },
    { input: '9\n5 1 2 + 4 * + 3 -', expectedOutput: '14', isHidden: true },
    { input: '3\n-200 -200 -', expectedOutput: '0', isHidden: true },
    { input: '7\n1 2 + 3 4 + *', expectedOutput: '21', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<string> tokens(n);\n        for(int i = 0; i < n; i++) cin >> tokens[i];\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    tokens = lines[1:n+1]\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        String[] tokens = new String[n];\n        for (int i = 0; i < n; i++) tokens[i] = sc.next();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const tokens = [];\n    for (let i = 0; i < n; i++) tokens.push(input[1 + i]);\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <string>\n#include <stack>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    stack<long long> s;\n    for(int i=0; i<n; i++) {\n      string token; cin >> token;\n      if(token == "+" || token == "-" || token == "*" || token == "/") {\n        long long b = s.top(); s.pop();\n        long long a = s.top(); s.pop();\n        if(token == "+") s.push(a + b);\n        else if(token == "-") s.push(a - b);\n        else if(token == "*") s.push(a * b);\n        else if(token == "/") s.push(a / b);\n      } else {\n        s.push(stoll(token));\n      }\n    }\n    cout << s.top() << "\\n";\n  }\n  return 0;\n}'
  }
};
