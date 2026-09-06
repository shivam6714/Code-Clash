import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const rotateImage: CodeClashProblemDefinition = {
  title: 'Rotate Image',
  slug: 'rotate-image',
  description: `You are given an N x N 2D matrix representing an image. Rotate the image by 90 degrees in a clockwise direction.

INPUT FORMAT:
- The first line contains an integer N, representing both the number of rows and columns of the square matrix.
- The next N lines each contain N space-separated integers. Line i + 1 contains the N integers for row i of the matrix (0 <= i < N).
- Together, these N lines form an N x N square matrix.

OUTPUT FORMAT:
- Print N lines, where each line contains N space-separated integers representing the rotated N x N matrix.

TRANSFORMATION DETAILS:
Rotating an N x N matrix by 90 degrees clockwise means:
- The element at original row i, column j moves to row j, column (N - 1 - i).
- Row 0 of the original matrix becomes the rightmost column (Column N - 1) of the rotated matrix.

EXAMPLE:
Given N = 3:

Input Matrix (3 x 3):
1 2 3
4 5 6
7 8 9

Output Matrix (Rotated 90° Clockwise):
7 4 1
8 5 2
9 6 3`,
  difficulty: Difficulty.Medium,
  topics: ['Array', 'Math', 'Matrix'],
  constraints: [
    '1 <= N <= 20',
    '-1000 <= matrix[i][j] <= 1000'
  ],
  examples: [
    { 
      input: '3\n1 2 3\n4 5 6\n7 8 9', 
      output: '7 4 1\n8 5 2\n9 6 3',
      explanation: 'Square Matrix N=3:\nRow 0: 1 2 3\nRow 1: 4 5 6\nRow 2: 7 8 9\n\nAfter 90° clockwise rotation:\nRow 0: 7 4 1\nRow 1: 8 5 2\nRow 2: 9 6 3'
    },
    { 
      input: '2\n1 2\n3 4', 
      output: '3 1\n4 2',
      explanation: 'Square Matrix N=2:\nRow 0: 1 2\nRow 1: 3 4\n\nAfter 90° clockwise rotation:\nRow 0: 3 1\nRow 1: 4 2'
    }
  ],
  testCases: [
    { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '7 4 1\n8 5 2\n9 6 3', isHidden: false },
    { input: '2\n1 2\n3 4', expectedOutput: '3 1\n4 2', isHidden: false },
    { input: '1\n42', expectedOutput: '42', isHidden: false },
    { input: '4\n5 1 9 11\n2 4 8 10\n13 3 6 7\n15 14 12 16', expectedOutput: '15 13 2 5\n14 3 4 1\n12 6 8 9\n16 7 10 11', isHidden: true },
    { input: '2\n-1 -2\n-3 -4', expectedOutput: '-3 -1\n-4 -2', isHidden: true },
    { input: '3\n0 0 0\n1 1 1\n2 2 2', expectedOutput: '2 1 0\n2 1 0\n2 1 0', isHidden: true },
    { input: '1\n-1000', expectedOutput: '-1000', isHidden: true },
    { input: '5\n1 2 3 4 5\n6 7 8 9 10\n11 12 13 14 15\n16 17 18 19 20\n21 22 23 24 25', expectedOutput: '21 16 11 6 1\n22 17 12 7 2\n23 18 13 8 3\n24 19 14 9 4\n25 20 15 10 5', isHidden: true },
    { input: '2\n1000 1000\n1000 1000', expectedOutput: '1000 1000\n1000 1000', isHidden: true },
    { input: '3\n1 1 1\n2 2 2\n3 3 3', expectedOutput: '3 2 1\n3 2 1\n3 2 1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<vector<int>> matrix(n, vector<int>(n));\n        for(int i = 0; i < n; i++) {\n            for(int j = 0; j < n; j++) cin >> matrix[i][j];\n        }\n        // Write your code here to rotate matrix 90 degrees clockwise and print result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    matrix = []\n    idx = 1\n    for i in range(n):\n        row = []\n        for j in range(n):\n            row.append(int(lines[idx]))\n            idx += 1\n        matrix.append(row)\n    # Write your code here to rotate matrix 90 degrees clockwise and print result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[][] matrix = new int[n][n];\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) matrix[i][j] = sc.nextInt();\n        }\n        // Write your code here to rotate matrix 90 degrees clockwise and print result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const matrix = [];\n    let idx = 1;\n    for (let i = 0; i < n; i++) {\n        const row = [];\n        for (let j = 0; j < n; j++) {\n            row.push(parseInt(input[idx]));\n            idx++;\n        }\n        matrix.push(row);\n    }\n    // Write your code here to rotate matrix 90 degrees clockwise and print result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    vector<vector<int>> m(n, vector<int>(n));\n    for(int i=0; i<n; i++) {\n      for(int j=0; j<n; j++) cin>>m[i][j];\n    }\n    for(int i=0; i<n; i++) {\n      for(int j=i; j<n; j++) {\n        swap(m[i][j], m[j][i]);\n      }\n    }\n    for(int i=0; i<n; i++) {\n      reverse(m[i].begin(), m[i].end());\n    }\n    for(int i=0; i<n; i++) {\n      for(int j=0; j<n; j++) {\n        cout << m[i][j] << (j == n-1 ? "" : " ");\n      }\n      cout << "\\n";\n    }\n  }\n  return 0;\n}'
  }
};
