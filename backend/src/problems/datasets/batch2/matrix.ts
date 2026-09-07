import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2MatrixTransposeSquare: CodeClashProblemDefinition = {
  title: 'Square Matrix Transposition',
  slug: 'codeclash-b2-matrix-transpose-square',
  description: 'Given an N x N square matrix, compute and print its transpose (swapping rows and columns).\n\nInput format:\nLine 1: N\nNext N lines: N space-separated integers per line\n\nOutput format:\nN lines: N space-separated integers per line representing transposed matrix.',
  difficulty: Difficulty.Easy,
  topics: ['Matrix', 'Arrays'],
  constraints: [
    '1 <= N <= 500',
    '-10^9 <= matrix[i][j] <= 10^9'
  ],
  examples: [
    { input: '3\n1 2 3\n4 5 6\n7 8 9', output: '1 4 7\n2 5 8\n3 6 9' },
    { input: '2\n1 2\n3 4', output: '1 3\n2 4' }
  ],
  testCases: [
    { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1 4 7\n2 5 8\n3 6 9', isHidden: false },
    { input: '2\n1 2\n3 4', expectedOutput: '1 3\n2 4', isHidden: false },
    { input: '1\n42', expectedOutput: '42', isHidden: false },
    { input: '3\n0 0 0\n0 0 0\n0 0 0', expectedOutput: '0 0 0\n0 0 0\n0 0 0', isHidden: true },
    { input: '2\n-1 -2\n-3 -4', expectedOutput: '-1 -3\n-2 -4', isHidden: true },
    { input: '3\n10 0 0\n0 20 0\n0 0 30', expectedOutput: '10 0 0\n0 20 0\n0 0 30', isHidden: true },
    { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '1 5 9 13\n2 6 10 14\n3 7 11 15\n4 8 12 16', isHidden: true },
    { input: '2\n100 200\n300 400', expectedOutput: '100 300\n200 400', isHidden: true },
    { input: '3\n1 1 1\n2 2 2\n3 3 3', expectedOutput: '1 2 3\n1 2 3\n1 2 3', isHidden: true },
    { input: '4\n0 1 0 1\n1 0 1 0\n0 1 0 1\n1 0 1 0', expectedOutput: '0 1 0 1\n1 0 1 0\n0 1 0 1\n1 0 1 0', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<vector<long long>> matrix(n, vector<long long>(n));\n        for(int i = 0; i < n; i++) {\n            for(int j = 0; j < n; j++) cin >> matrix[i][j];\n        }\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    idx = 1\n    matrix = []\n    for _ in range(n):\n        row = [int(x) for x in lines[idx:idx+n]]\n        idx += n\n        matrix.append(row)\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[][] matrix = new long[n][n];\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) matrix[i][j] = sc.nextLong();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    let idx = 1;\n    const matrix = [];\n    for (let i = 0; i < n; i++) {\n        const row = [];\n        for (let j = 0; j < n; j++) row.push(parseInt(input[idx++]));\n        matrix.push(row);\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<vector<long long>> mat(n, vector<long long>(n));\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) cin >> mat[i][j];\n        }\n        for (int j = 0; j < n; j++) {\n            for (int i = 0; i < n; i++) {\n                cout << mat[i][j] << (i + 1 == n ? "" : " ");\n            }\n            cout << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2MatrixRowWithMaxOnes: CodeClashProblemDefinition = {
  title: 'Row with Maximum Ones in Sorted Binary Grid',
  slug: 'codeclash-b2-matrix-row-with-max-ones',
  description: 'Given an R x C binary matrix (containing only 0s and 1s) where each row is sorted in non-decreasing order (all 0s followed by all 1s), find the 0-based index of the row that contains the maximum number of 1s. If multiple rows have the same maximum number of 1s, return the smallest row index. If no row contains any 1, output -1.\n\nInput format:\nLine 1: R C\nNext R lines: C space-separated 0s and 1s\n\nOutput format:\nLine 1: 0-based row index, or -1.',
  difficulty: Difficulty.Easy,
  topics: ['Matrix', 'Binary Search', 'Arrays'],
  constraints: [
    '1 <= R, C <= 1000',
    'matrix[i][j] is 0 or 1'
  ],
  examples: [
    { input: '4 4\n0 1 1 1\n0 0 1 1\n1 1 1 1\n0 0 0 0', output: '2' },
    { input: '2 2\n0 0\n0 0', output: '-1' }
  ],
  testCases: [
    { input: '4 4\n0 1 1 1\n0 0 1 1\n1 1 1 1\n0 0 0 0', expectedOutput: '2', isHidden: false },
    { input: '2 2\n0 0\n0 0', expectedOutput: '-1', isHidden: false },
    { input: '1 1\n1', expectedOutput: '0', isHidden: false },
    { input: '3 3\n0 0 1\n0 1 1\n0 0 1', expectedOutput: '1', isHidden: true },
    { input: '3 3\n1 1 1\n1 1 1\n1 1 1', expectedOutput: '0', isHidden: true },
    { input: '2 4\n0 0 0 1\n0 0 0 1', expectedOutput: '0', isHidden: true },
    { input: '4 2\n0 0\n0 1\n0 0\n1 1', expectedOutput: '3', isHidden: true },
    { input: '3 4\n0 0 0 0\n0 0 0 1\n0 0 1 1', expectedOutput: '2', isHidden: true },
    { input: '1 3\n0 0 0', expectedOutput: '-1', isHidden: true },
    { input: '5 3\n0 1 1\n0 0 1\n1 1 1\n0 1 1\n0 0 0', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int r, c;\n    if (cin >> r >> c) {\n        vector<vector<int>> matrix(r, vector<int>(c));\n        for(int i = 0; i < r; i++) {\n            for(int j = 0; j < c; j++) cin >> matrix[i][j];\n        }\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    r, c = int(lines[0]), int(lines[1])\n    idx = 2\n    matrix = []\n    for _ in range(r):\n        row = [int(x) for x in lines[idx:idx+c]]\n        idx += c\n        matrix.append(row)\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] matrix = new int[r][c];\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) matrix[i][j] = sc.nextInt();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const r = parseInt(input[0]);\n    const c = parseInt(input[1]);\n    let idx = 2;\n    const matrix = [];\n    for (let i = 0; i < r; i++) {\n        const row = [];\n        for (let j = 0; j < c; j++) row.push(parseInt(input[idx++]));\n        matrix.push(row);\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int r, c;\n    if (cin >> r >> c) {\n        int maxOnes = 0;\n        int bestRow = -1;\n        for (int i = 0; i < r; i++) {\n            int onesCount = 0;\n            for (int j = 0; j < c; j++) {\n                int val;\n                cin >> val;\n                if (val == 1) onesCount++;\n            }\n            if (onesCount > maxOnes) {\n                maxOnes = onesCount;\n                bestRow = i;\n            }\n        }\n        cout << bestRow << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2MatrixSpiralOrderTraversal: CodeClashProblemDefinition = {
  title: 'Clockwise Spiral Grid Traversal',
  slug: 'codeclash-b2-matrix-spiral-order-traversal',
  description: 'Given an R x C matrix, return all elements of the matrix in spiral order (clockwise direction starting from the top-left corner).\n\nInput format:\nLine 1: R C\nNext R lines: C space-separated integers per line\n\nOutput format:\nLine 1: R*C space-separated integers in spiral order.',
  difficulty: Difficulty.Medium,
  topics: ['Matrix', 'Simulation', 'Arrays'],
  constraints: [
    '1 <= R, C <= 500',
    '-10^9 <= matrix[i][j] <= 10^9'
  ],
  examples: [
    { input: '3 3\n1 2 3\n4 5 6\n7 8 9', output: '1 2 3 6 9 8 7 4 5' },
    { input: '3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12', output: '1 2 3 4 8 12 11 10 9 5 6 7' }
  ],
  testCases: [
    { input: '3 3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1 2 3 6 9 8 7 4 5', isHidden: false },
    { input: '3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12', expectedOutput: '1 2 3 4 8 12 11 10 9 5 6 7', isHidden: false },
    { input: '1 1\n42', expectedOutput: '42', isHidden: false },
    { input: '1 4\n1 2 3 4', expectedOutput: '1 2 3 4', isHidden: true },
    { input: '4 1\n1\n2\n3\n4', expectedOutput: '1 2 3 4', isHidden: true },
    { input: '2 2\n1 2\n3 4', expectedOutput: '1 2 4 3', isHidden: true },
    { input: '3 1\n10\n20\n30', expectedOutput: '10 20 30', isHidden: true },
    { input: '1 3\n10 20 30', expectedOutput: '10 20 30', isHidden: true },
    { input: '4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10', isHidden: true },
    { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '1 2 3 6 5 4', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int r, c;\n    if (cin >> r >> c) {\n        vector<vector<long long>> matrix(r, vector<long long>(c));\n        for(int i = 0; i < r; i++) {\n            for(int j = 0; j < c; j++) cin >> matrix[i][j];\n        }\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    r, c = int(lines[0]), int(lines[1])\n    idx = 2\n    matrix = []\n    for _ in range(r):\n        row = [int(x) for x in lines[idx:idx+c]]\n        idx += c\n        matrix.append(row)\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        long[][] matrix = new long[r][c];\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) matrix[i][j] = sc.nextLong();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const r = parseInt(input[0]);\n    const c = parseInt(input[1]);\n    let idx = 2;\n    const matrix = [];\n    for (let i = 0; i < r; i++) {\n        const row = [];\n        for (let j = 0; j < c; j++) row.push(parseInt(input[idx++]));\n        matrix.push(row);\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int r, c;\n    if (cin >> r >> c) {\n        vector<vector<long long>> mat(r, vector<long long>(c));\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) cin >> mat[i][j];\n        }\n        int top = 0, bottom = r - 1, left = 0, right = c - 1;\n        vector<long long> res;\n        while (top <= bottom && left <= right) {\n            for (int j = left; j <= right; j++) res.push_back(mat[top][j]);\n            top++;\n            for (int i = top; i <= bottom; i++) res.push_back(mat[i][right]);\n            right--;\n            if (top <= bottom) {\n                for (int j = right; j >= left; j--) res.push_back(mat[bottom][j]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) res.push_back(mat[i][left]);\n                left++;\n            }\n        }\n        for (size_t i = 0; i < res.size(); i++) {\n            cout << res[i] << (i + 1 == res.size() ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2MatrixRotate90DegreesClockwise: CodeClashProblemDefinition = {
  title: '90-Degree Clockwise Matrix Rotation',
  slug: 'codeclash-b2-matrix-rotate-90-degrees-clockwise',
  description: 'Given an N x N square matrix, rotate the matrix by 90 degrees in a clockwise direction. Print the rotated matrix.\n\nInput format:\nLine 1: N\nNext N lines: N space-separated integers per line\n\nOutput format:\nN lines: N space-separated integers per line representing rotated matrix.',
  difficulty: Difficulty.Medium,
  topics: ['Matrix', 'Arrays'],
  constraints: [
    '1 <= N <= 500',
    '-10^9 <= matrix[i][j] <= 10^9'
  ],
  examples: [
    { input: '3\n1 2 3\n4 5 6\n7 8 9', output: '7 4 1\n8 5 2\n9 6 3' },
    { input: '4\n5 1 9 11\n2 4 8 10\n13 3 6 7\n15 14 12 16', output: '15 13 2 5\n14 3 4 1\n12 6 8 9\n16 7 10 11' }
  ],
  testCases: [
    { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '7 4 1\n8 5 2\n9 6 3', isHidden: false },
    { input: '4\n5 1 9 11\n2 4 8 10\n13 3 6 7\n15 14 12 16', expectedOutput: '15 13 2 5\n14 3 4 1\n12 6 8 9\n16 7 10 11', isHidden: false },
    { input: '1\n100', expectedOutput: '100', isHidden: false },
    { input: '2\n1 2\n3 4', expectedOutput: '3 1\n4 2', isHidden: true },
    { input: '3\n0 0 0\n0 0 0\n0 0 0', expectedOutput: '0 0 0\n0 0 0\n0 0 0', isHidden: true },
    { input: '3\n-1 -2 -3\n-4 -5 -6\n-7 -8 -9', expectedOutput: '-7 -4 -1\n-8 -5 -2\n-9 -6 -3', isHidden: true },
    { input: '2\n10 20\n30 40', expectedOutput: '30 10\n40 20', isHidden: true },
    { input: '3\n1 0 0\n0 1 0\n0 0 1', expectedOutput: '0 0 1\n0 1 0\n1 0 0', isHidden: true },
    { input: '4\n1 1 1 1\n2 2 2 2\n3 3 3 3\n4 4 4 4', expectedOutput: '4 3 2 1\n4 3 2 1\n4 3 2 1\n4 3 2 1', isHidden: true },
    { input: '2\n-5 5\n-10 10', expectedOutput: '-10 -5\n10 5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<vector<long long>> matrix(n, vector<long long>(n));\n        for(int i = 0; i < n; i++) {\n            for(int j = 0; j < n; j++) cin >> matrix[i][j];\n        }\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    idx = 1\n    matrix = []\n    for _ in range(n):\n        row = [int(x) for x in lines[idx:idx+n]]\n        idx += n\n        matrix.append(row)\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[][] matrix = new long[n][n];\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) matrix[i][j] = sc.nextLong();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    let idx = 1;\n    const matrix = [];\n    for (let i = 0; i < n; i++) {\n        const row = [];\n        for (let j = 0; j < n; j++) row.push(parseInt(input[idx++]));\n        matrix.push(row);\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<vector<long long>> mat(n, vector<long long>(n));\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) cin >> mat[i][j];\n        }\n        for (int j = 0; j < n; j++) {\n            for (int i = n - 1; i >= 0; i--) {\n                cout << mat[i][j] << (i == 0 ? "" : " ");\n            }\n            cout << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2MatrixMaxSubgridAreaOnes: CodeClashProblemDefinition = {
  title: 'Maximal Rectangle Area of Ones',
  slug: 'codeclash-b2-matrix-max-subgrid-area-ones',
  description: 'Given an R x C binary matrix filled with 0s and 1s, find the largest rectangle containing only 1s and return its area.\n\nInput format:\nLine 1: R C\nNext R lines: C space-separated 0s and 1s\n\nOutput format:\nLine 1: Maximum rectangle area integer.',
  difficulty: Difficulty.Hard,
  topics: ['Matrix', 'Stack', 'Dynamic Programming', 'Monotonic Stack'],
  constraints: [
    '1 <= R, C <= 500',
    'matrix[i][j] is 0 or 1'
  ],
  examples: [
    { input: '4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0', output: '6' },
    { input: '1 1\n0', output: '0' }
  ],
  testCases: [
    { input: '4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0', expectedOutput: '6', isHidden: false },
    { input: '1 1\n0', expectedOutput: '0', isHidden: false },
    { input: '1 1\n1', expectedOutput: '1', isHidden: false },
    { input: '3 3\n1 1 1\n1 1 1\n1 1 1', expectedOutput: '9', isHidden: true },
    { input: '3 3\n0 0 0\n0 0 0\n0 0 0', expectedOutput: '0', isHidden: true },
    { input: '2 4\n1 1 1 1\n1 1 1 1', expectedOutput: '8', isHidden: true },
    { input: '4 2\n1 0\n1 0\n1 0\n1 0', expectedOutput: '4', isHidden: true },
    { input: '3 4\n0 1 1 0\n1 1 1 1\n1 1 1 1', expectedOutput: '8', isHidden: true },
    { input: '2 3\n1 0 1\n1 1 1', expectedOutput: '3', isHidden: true },
    { input: '3 5\n1 0 1 1 1\n0 1 1 1 1\n1 1 1 1 0', expectedOutput: '6', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int r, c;\n    if (cin >> r >> c) {\n        vector<vector<int>> matrix(r, vector<int>(c));\n        for(int i = 0; i < r; i++) {\n            for(int j = 0; j < c; j++) cin >> matrix[i][j];\n        }\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    r, c = int(lines[0]), int(lines[1])\n    idx = 2\n    matrix = []\n    for _ in range(r):\n        row = [int(x) for x in lines[idx:idx+c]]\n        idx += c\n        matrix.append(row)\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] matrix = new int[r][c];\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) matrix[i][j] = sc.nextInt();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const r = parseInt(input[0]);\n    const c = parseInt(input[1]);\n    let idx = 2;\n    const matrix = [];\n    for (let i = 0; i < r; i++) {\n        const row = [];\n        for (let j = 0; j < c; j++) row.push(parseInt(input[idx++]));\n        matrix.push(row);\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint largestHist(const vector<int>& h) {\n    int n = h.size();\n    stack<int> st;\n    int maxA = 0;\n    for (int i = 0; i <= n; i++) {\n        int currH = (i == n ? 0 : h[i]);\n        while (!st.empty() && h[st.top()] >= currH) {\n            int height = h[st.top()]; st.pop();\n            int width = st.empty() ? i : (i - st.top() - 1);\n            maxA = max(maxA, height * width);\n        }\n        st.push(i);\n    }\n    return maxA;\n}\n\nint main() {\n    int r, c;\n    if (cin >> r >> c) {\n        vector<int> heights(c, 0);\n        int maxArea = 0;\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                int val;\n                cin >> val;\n                if (val == 1) heights[j]++;\n                else heights[j] = 0;\n            }\n            maxArea = max(maxArea, largestHist(heights));\n        }\n        cout << maxArea << "\\n";\n    }\n    return 0;\n}'
  }
};
