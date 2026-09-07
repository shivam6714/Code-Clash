import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2BacktrackingBinaryStringsNoConsecutiveOnes: CodeClashProblemDefinition = {
  title: 'Binary Strings Without Adjacent Ones',
  slug: 'codeclash-b2-backtracking-binary-strings-no-consecutive-ones',
  description: 'Generate all binary strings of length N such that no two 1s are adjacent to each other. Print the generated strings in lexicographical order.\n\nInput format:\nLine 1: N\n\nOutput format:\nLine 1: Number of valid strings K\nNext K lines: one binary string per line in lexicographical order.',
  difficulty: Difficulty.Easy,
  topics: ['Backtracking', 'Recursion', 'Strings'],
  constraints: [
    '1 <= N <= 20'
  ],
  examples: [
    { input: '3', output: '5\n000\n001\n010\n100\n101' },
    { input: '2', output: '3\n00\n01\n10' }
  ],
  testCases: [
    { input: '3', expectedOutput: '5\n000\n001\n010\n100\n101', isHidden: false },
    { input: '2', expectedOutput: '3\n00\n01\n10', isHidden: false },
    { input: '1', expectedOutput: '2\n0\n1', isHidden: false },
    { input: '4', expectedOutput: '8\n0000\n0001\n0010\n0100\n0101\n1000\n1001\n1010', isHidden: true },
    { input: '5', expectedOutput: '13\n00000\n00001\n00010\n00100\n00101\n01000\n01001\n01010\n10000\n10001\n10010\n10100\n10101', isHidden: true },
    { input: '6', expectedOutput: '21\n000000\n000001\n000010\n000100\n000101\n001000\n001001\n001010\n010000\n010001\n010010\n010100\n010101\n100000\n100001\n100010\n100100\n100101\n101000\n101001\n101010', isHidden: true },
    { input: '1', expectedOutput: '2\n0\n1', isHidden: true },
    { input: '2', expectedOutput: '3\n00\n01\n10', isHidden: true },
    { input: '3', expectedOutput: '5\n000\n001\n010\n100\n101', isHidden: true },
    { input: '4', expectedOutput: '8\n0000\n0001\n0010\n0100\n0101\n1000\n1001\n1010', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nvector<string> res;\n\nvoid solve(int n, string curr) {\n    if ((int)curr.length() == n) {\n        res.push_back(curr);\n        return;\n    }\n    solve(n, curr + "0");\n    if (curr.empty() || curr.back() != \'1\') {\n        solve(n, curr + "1");\n    }\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        solve(n, "");\n        cout << res.size() << "\\n";\n        for (const string& s : res) cout << s << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2BacktrackingSubsetGeneration: CodeClashProblemDefinition = {
  title: 'Subsets Generation in Sorted Order',
  slug: 'codeclash-b2-backtracking-subset-generation-lexicographical',
  description: 'Given N distinct integers, print all possible subsets (the power set) in lexicographical order. The elements in each subset must be sorted in non-decreasing order.\n\nInput format:\nLine 1: N\nLine 2: N space-separated distinct integers\n\nOutput format:\nLine 1: Number of subsets 2^N\nNext 2^N lines: space-separated elements of each subset (empty line for empty set).',
  difficulty: Difficulty.Medium,
  topics: ['Backtracking', 'Recursion', 'Arrays'],
  constraints: [
    '1 <= N <= 15',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '2\n1 2', output: '4\n\n1\n1 2\n2' },
    { input: '1\n5', output: '2\n\n5' }
  ],
  testCases: [
    { input: '2\n1 2', expectedOutput: '4\n\n1\n1 2\n2', isHidden: false },
    { input: '1\n5', expectedOutput: '2\n\n5', isHidden: false },
    { input: '3\n1 2 3', expectedOutput: '8\n\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3', isHidden: false },
    { input: '2\n-1 0', expectedOutput: '4\n\n-1\n-1 0\n0', isHidden: true },
    { input: '3\n10 20 30', expectedOutput: '8\n\n10\n10 20\n10 20 30\n10 30\n20\n20 30\n30', isHidden: true },
    { input: '1\n0', expectedOutput: '2\n\n0', isHidden: true },
    { input: '2\n3 1', expectedOutput: '4\n\n1\n1 3\n3', isHidden: true },
    { input: '3\n3 2 1', expectedOutput: '8\n\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3', isHidden: true },
    { input: '2\n-5 5', expectedOutput: '4\n\n-5\n-5 5\n5', isHidden: true },
    { input: '3\n-1 1 0', expectedOutput: '8\n\n-1\n-1 0\n-1 0 1\n-1 1\n0\n0 1\n1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<long long>> subsets;\n\nvoid backtrack(const vector<long long>& nums, int idx, vector<long long>& curr) {\n    subsets.push_back(curr);\n    for (size_t i = idx; i < nums.size(); i++) {\n        curr.push_back(nums[i]);\n        backtrack(nums, i + 1, curr);\n        curr.pop_back();\n    }\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        sort(nums.begin(), nums.end());\n        vector<long long> curr;\n        backtrack(nums, 0, curr);\n        cout << subsets.size() << "\\n";\n        for (auto sub : subsets) {\n            for (size_t i = 0; i < sub.size(); i++) {\n                cout << sub[i] << (i + 1 == sub.size() ? "" : " ");\n            }\n            cout << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2BacktrackingCombinationSumTarget: CodeClashProblemDefinition = {
  title: 'Unique Combination Target Sum Counter',
  slug: 'codeclash-b2-backtracking-combination-sum-target',
  description: 'Given an array of candidate integers (which may contain duplicates) and a target integer T, find all unique combinations where the chosen numbers sum to T. Each number in candidates may only be used once in a combination.\n\nInput format:\nLine 1: N T\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Total count of unique valid combinations integer.',
  difficulty: Difficulty.Medium,
  topics: ['Backtracking', 'Recursion', 'Arrays'],
  constraints: [
    '1 <= N <= 30',
    '1 <= T <= 500',
    '1 <= candidates[i] <= 100'
  ],
  examples: [
    { input: '7 8\n10 1 2 7 6 1 5', output: '4' },
    { input: '5 5\n2 5 2 1 2', output: '2' }
  ],
  testCases: [
    { input: '7 8\n10 1 2 7 6 1 5', expectedOutput: '4', isHidden: false },
    { input: '5 5\n2 5 2 1 2', expectedOutput: '2', isHidden: false },
    { input: '1 5\n5', expectedOutput: '1', isHidden: false },
    { input: '1 10\n5', expectedOutput: '0', isHidden: true },
    { input: '4 6\n1 2 3 4', expectedOutput: '2', isHidden: true },
    { input: '6 10\n1 1 1 1 1 5', expectedOutput: '1', isHidden: true },
    { input: '5 10\n2 3 5 7 10', expectedOutput: '3', isHidden: true },
    { input: '4 4\n1 1 1 1', expectedOutput: '1', isHidden: true },
    { input: '5 6\n1 1 2 2 3', expectedOutput: '2', isHidden: true },
    { input: '6 7\n1 2 3 4 5 6', expectedOutput: '4', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long t;\n    if (cin >> n >> t) {\n        vector<int> candidates(n);\n        for(int i = 0; i < n; i++) cin >> candidates[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, t = int(lines[0]), int(lines[1])\n    candidates = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long t = sc.nextLong();\n        int[] candidates = new int[n];\n        for (int i = 0; i < n; i++) candidates[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const t = parseInt(input[1]);\n    const candidates = [];\n    for (let i = 0; i < n; i++) candidates.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint countComb = 0;\n\nvoid backtrack(const vector<int>& c, int idx, long long target) {\n    if (target == 0) {\n        countComb++;\n        return;\n    }\n    for (size_t i = idx; i < c.size(); i++) {\n        if (i > (size_t)idx && c[i] == c[i - 1]) continue;\n        if (c[i] > target) break;\n        backtrack(c, i + 1, target - c[i]);\n    }\n}\n\nint main() {\n    int n;\n    long long t;\n    if (cin >> n >> t) {\n        vector<int> candidates(n);\n        for (int i = 0; i < n; i++) cin >> candidates[i];\n        sort(candidates.begin(), candidates.end());\n        backtrack(candidates, 0, t);\n        cout << countComb << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2BacktrackingNQueensValidArrangements: CodeClashProblemDefinition = {
  title: 'N-Queens Placement Solutions Counter',
  slug: 'codeclash-b2-backtracking-n-queens-valid-arrangements',
  description: 'The N-Queens puzzle asks to place N chess queens on an N x N chessboard such that no two queens attack each other (no two queens share the same row, column, or diagonal). Return the total number of distinct valid placements.\n\nInput format:\nLine 1: N\n\nOutput format:\nLine 1: Total number of valid arrangements integer.',
  difficulty: Difficulty.Medium,
  topics: ['Backtracking', 'Recursion'],
  constraints: [
    '1 <= N <= 12'
  ],
  examples: [
    { input: '4', output: '2' },
    { input: '1', output: '1' }
  ],
  testCases: [
    { input: '4', expectedOutput: '2', isHidden: false },
    { input: '1', expectedOutput: '1', isHidden: false },
    { input: '2', expectedOutput: '0', isHidden: false },
    { input: '3', expectedOutput: '0', isHidden: true },
    { input: '5', expectedOutput: '10', isHidden: true },
    { input: '6', expectedOutput: '4', isHidden: true },
    { input: '7', expectedOutput: '40', isHidden: true },
    { input: '8', expectedOutput: '92', isHidden: true },
    { input: '9', expectedOutput: '352', isHidden: true },
    { input: '10', expectedOutput: '724', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint countSol = 0;\n\nvoid solve(int row, int n, int cols, int diag1, int diag2) {\n    if (row == n) {\n        countSol++;\n        return;\n    }\n    int availableBits = ((1 << n) - 1) & ~(cols | diag1 | diag2);\n    while (availableBits > 0) {\n        int p = availableBits & -availableBits;\n        availableBits -= p;\n        solve(row + 1, n, cols | p, (diag1 | p) << 1, (diag2 | p) >> 1);\n    }\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        solve(0, n, 0, 0, 0);\n        cout << countSol << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2BacktrackingSudokuSolver: CodeClashProblemDefinition = {
  title: '9x9 Sudoku Puzzle Solver Engine',
  slug: 'codeclash-b2-backtracking-sudoku-solver-validation',
  description: 'Write a program to solve a 9x9 Sudoku puzzle by filling empty cells denoted by "." with digits 1-9 so that every row, column, and 3x3 subgrid contains digits 1-9 without repetition. The input puzzle is guaranteed to have a unique valid solution.\n\nInput format:\n9 lines: each line contains 9 characters (digits 1-9 or ".") representing a Sudoku row.\n\nOutput format:\n9 lines: each line contains 9 characters representing the solved Sudoku row.',
  difficulty: Difficulty.Hard,
  topics: ['Backtracking', 'Matrix', 'Recursion'],
  constraints: [
    'Board size is strictly 9x9',
    'Input is a valid Sudoku puzzle'
  ],
  examples: [
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', output: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179' },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', output: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179' }
  ],
  testCases: [
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: false },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: false },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: false },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: true },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: true },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: true },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: true },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: true },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: true },
    { input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expectedOutput: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> board(9);\n    for(int i = 0; i < 9; i++) {\n        if(!(cin >> board[i])) break;\n    }\n    // Write your solution here\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    board = [list(lines[i]) for i in range(9)]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] board = new String[9];\n        for (int i = 0; i < 9; i++) {\n            if (!sc.hasNext()) return;\n            board[i] = sc.next();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length < 9) return;\n    const board = input.slice(0, 9);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nbool isValid(vector<string>& board, int r, int c, char ch) {\n    for (int i = 0; i < 9; i++) {\n        if (board[r][i] == ch) return false;\n        if (board[i][c] == ch) return false;\n        if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == ch) return false;\n    }\n    return true;\n}\n\nbool solve(vector<string>& board) {\n    for (int r = 0; r < 9; r++) {\n        for (int c = 0; c < 9; c++) {\n            if (board[r][c] == \'.\') {\n                for (char ch = \'1\'; ch <= \'9\'; ch++) {\n                    if (isValid(board, r, c, ch)) {\n                        board[r][c] = ch;\n                        if (solve(board)) return true;\n                        board[r][c] = \'.\';\n                    }\n                }\n                return false;\n            }\n        }\n    }\n    return true;\n}\n\nint main() {\n    vector<string> board(9);\n    for (int i = 0; i < 9; i++) cin >> board[i];\n    solve(board);\n    for (int i = 0; i < 9; i++) cout << board[i] << "\\n";\n    return 0;\n}'
  }
};
