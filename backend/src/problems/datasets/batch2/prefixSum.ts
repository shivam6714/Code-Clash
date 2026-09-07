import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2PrefixSumRangeQueries: CodeClashProblemDefinition = {
  title: 'Range Sum Query Engine',
  slug: 'codeclash-b2-prefixsum-range-sum-queries',
  description: 'Given an array of N integers, process Q queries. Each query consists of two 0-based indices L and R (L <= R). Output the sum of elements from index L to R inclusive.\n\nInput format:\nLine 1: N Q\nLine 2: N space-separated integers\nNext Q lines: L R (0-based indices)\n\nOutput format:\nQ lines, each containing a single integer sum for that query.',
  difficulty: Difficulty.Easy,
  topics: ['Prefix Sum', 'Arrays'],
  constraints: [
    '1 <= N, Q <= 10^5',
    '0 <= L <= R < N',
    '-10^4 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '5 3\n1 2 3 4 5\n0 2\n1 3\n0 4', output: '6\n9\n15' },
    { input: '3 1\n-5 10 5\n1 1', output: '10' }
  ],
  testCases: [
    { input: '5 3\n1 2 3 4 5\n0 2\n1 3\n0 4', expectedOutput: '6\n9\n15', isHidden: false },
    { input: '3 1\n-5 10 5\n1 1', expectedOutput: '10', isHidden: false },
    { input: '1 1\n42\n0 0', expectedOutput: '42', isHidden: false },
    { input: '4 2\n0 0 0 0\n0 3\n1 2', expectedOutput: '0\n0', isHidden: true },
    { input: '5 2\n-1 -2 -3 -4 -5\n0 4\n2 3', expectedOutput: '-15\n-7', isHidden: true },
    { input: '3 3\n10 20 30\n0 0\n1 1\n2 2', expectedOutput: '10\n20\n30', isHidden: true },
    { input: '6 2\n1 1 1 1 1 1\n0 5\n2 4', expectedOutput: '6\n3', isHidden: true },
    { input: '4 2\n100 -100 200 -200\n0 1\n0 3', expectedOutput: '0\n0', isHidden: true },
    { input: '5 1\n7 3 2 8 1\n1 4', expectedOutput: '14', isHidden: true },
    { input: '4 2\n5 10 15 20\n0 2\n2 3', expectedOutput: '30\n35', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, q;\n    if (cin >> n >> q) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        for(int i = 0; i < q; i++) {\n            int l, r;\n            cin >> l >> r;\n            // Solve query\n        }\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, q = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    idx = 2 + n\n    for _ in range(q):\n        l, r = int(lines[idx]), int(lines[idx+1])\n        idx += 2\n        # Solve query\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int q = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        for (int i = 0; i < q; i++) {\n            int l = sc.nextInt();\n            int r = sc.nextInt();\n            // Solve query\n        }\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const q = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    let idx = 2 + n;\n    for (let i = 0; i < q; i++) {\n        const l = parseInt(input[idx++]);\n        const r = parseInt(input[idx++]);\n        // Solve query\n    }\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int n, q;\n    if (cin >> n >> q) {\n        vector<long long> pref(n + 1, 0);\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            pref[i + 1] = pref[i] + val;\n        }\n        for (int i = 0; i < q; i++) {\n            int l, r;\n            cin >> l >> r;\n            cout << (pref[r + 1] - pref[l]) << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2PrefixSumCountSubarraysEvenSum: CodeClashProblemDefinition = {
  title: 'Even Subarray Sum Counter',
  slug: 'codeclash-b2-prefixsum-count-subarrays-even-sum',
  description: 'Given an array of N integers, count the number of non-empty contiguous subarrays whose sum of elements is even.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer count of valid subarrays.',
  difficulty: Difficulty.Easy,
  topics: ['Prefix Sum', 'Math', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^4 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '4\n1 2 3 4', output: '4' },
    { input: '3\n2 4 6', output: '6' }
  ],
  testCases: [
    { input: '4\n1 2 3 4', expectedOutput: '4', isHidden: false },
    { input: '3\n2 4 6', expectedOutput: '6', isHidden: false },
    { input: '3\n1 3 5', expectedOutput: '2', isHidden: false },
    { input: '1\n2', expectedOutput: '1', isHidden: true },
    { input: '1\n1', expectedOutput: '0', isHidden: true },
    { input: '5\n1 1 1 1 1', expectedOutput: '6', isHidden: true },
    { input: '4\n0 0 0 0', expectedOutput: '10', isHidden: true },
    { input: '5\n10 15 20 25 30', expectedOutput: '7', isHidden: true },
    { input: '6\n2 1 2 1 2 1', expectedOutput: '9', isHidden: true },
    { input: '4\n-1 -2 -3 -4', expectedOutput: '4', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        long long evenCount = 1, oddCount = 0;\n        long long pref = 0, totalEvenSubarrays = 0;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            pref += val;\n            if (abs(pref) % 2 == 0) {\n                totalEvenSubarrays += evenCount;\n                evenCount++;\n            } else {\n                totalEvenSubarrays += oddCount;\n                oddCount++;\n            }\n        }\n        cout << totalEvenSubarrays << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2PrefixSumProductExceptSelf: CodeClashProblemDefinition = {
  title: 'Exclusive Cumulative Product Stream',
  slug: 'codeclash-b2-prefixsum-product-except-self',
  description: 'Given an array of N integers, return an array output such that output[i] is equal to the product of all elements of nums except nums[i], modulo 10^9+7.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: N space-separated integers (modulo 1000000007).',
  difficulty: Difficulty.Medium,
  topics: ['Prefix Sum', 'Arrays', 'Math'],
  constraints: [
    '2 <= N <= 10^5',
    '1 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '4\n1 2 3 4', output: '24 12 8 6' },
    { input: '5\n2 3 4 5 6', output: '360 240 180 144 120' }
  ],
  testCases: [
    { input: '4\n1 2 3 4', expectedOutput: '24 12 8 6', isHidden: false },
    { input: '5\n2 3 4 5 6', expectedOutput: '360 240 180 144 120', isHidden: false },
    { input: '2\n10 20', expectedOutput: '20 10', isHidden: false },
    { input: '3\n5 5 5', expectedOutput: '25 25 25', isHidden: true },
    { input: '4\n1 1 1 1', expectedOutput: '1 1 1 1', isHidden: true },
    { input: '3 100 200 300', expectedOutput: '60000 30000 20000', isHidden: true },
    { input: '5\n1 2 1 2 1', expectedOutput: '4 2 4 2 4', isHidden: true },
    { input: '2\n1000000 1000000', expectedOutput: '1000000 1000000', isHidden: true },
    { input: '4\n10 10 10 10', expectedOutput: '1000 1000 1000 1000', isHidden: true },
    { input: '5\n7 11 13 17 19', expectedOutput: '46189 29393 24871 19019 17017', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        long long MOD = 1000000007;\n        vector<long long> pref(n, 1), suff(n, 1);\n        for (int i = 1; i < n; i++) pref[i] = (pref[i - 1] * (nums[i - 1] % MOD)) % MOD;\n        for (int i = n - 2; i >= 0; i--) suff[i] = (suff[i + 1] * (nums[i + 1] % MOD)) % MOD;\n        for (int i = 0; i < n; i++) {\n            long long ans = (pref[i] * suff[i]) % MOD;\n            cout << ans << (i + 1 == n ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2PrefixSumLongestSubarraySumZero: CodeClashProblemDefinition = {
  title: 'Longest Zero Sum Subarray Segment',
  slug: 'codeclash-b2-prefixsum-longest-subarray-sum-zero',
  description: 'Given an array of N integers, find the maximum length of a contiguous subarray whose sum of elements equals 0. Output 0 if no such subarray exists.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer representing maximum length.',
  difficulty: Difficulty.Medium,
  topics: ['Prefix Sum', 'Hashing', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^4 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '8\n15 -2 2 -8 1 7 10 23', output: '5' },
    { input: '3\n1 2 3', output: '0' }
  ],
  testCases: [
    { input: '8\n15 -2 2 -8 1 7 10 23', expectedOutput: '5', isHidden: false },
    { input: '3\n1 2 3', expectedOutput: '0', isHidden: false },
    { input: '1\n0', expectedOutput: '1', isHidden: false },
    { input: '4\n1 2 -3 4', expectedOutput: '3', isHidden: true },
    { input: '5\n0 0 0 0 0', expectedOutput: '5', isHidden: true },
    { input: '6\n-1 1 -1 1 -1 1', expectedOutput: '6', isHidden: true },
    { input: '5\n10 20 -30 40 50', expectedOutput: '3', isHidden: true },
    { input: '4\n-5 5 -5 5', expectedOutput: '4', isHidden: true },
    { input: '3\n10 -5 -5', expectedOutput: '3', isHidden: true },
    { input: '6\n1 2 3 -3 -2 -1', expectedOutput: '6', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        unordered_map<long long, int> firstOcc;\n        firstOcc[0] = -1;\n        long long pref = 0;\n        int maxLen = 0;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            pref += val;\n            if (firstOcc.count(pref)) {\n                maxLen = max(maxLen, i - firstOcc[pref]);\n            } else {\n                firstOcc[pref] = i;\n            }\n        }\n        cout << maxLen << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2PrefixSum2DMatrixRegionSumQueries: CodeClashProblemDefinition = {
  title: '2D Submatrix Block Sum Engine',
  slug: 'codeclash-b2-prefixsum-2d-matrix-region-sum-queries',
  description: 'Given an R x C integer matrix, answer Q queries asking for the sum of elements inside the submatrix defined by top-left corner (r1, c1) and bottom-right corner (r2, c2) (0-based inclusive).\n\nInput format:\nLine 1: R C Q\nNext R lines: C space-separated integers each\nNext Q lines: r1 c1 r2 c2\n\nOutput format:\nQ lines, each containing the submatrix sum for that query.',
  difficulty: Difficulty.Hard,
  topics: ['Prefix Sum', 'Matrix', 'Arrays'],
  constraints: [
    '1 <= R, C <= 500',
    '1 <= Q <= 10^5',
    '0 <= r1 <= r2 < R',
    '0 <= c1 <= c2 < C',
    '-10^4 <= grid[i][j] <= 10^4'
  ],
  examples: [
    { input: '3 3 2\n3 0 1\n5 6 3\n1 2 0\n0 0 1 1\n1 1 2 2', output: '14\n11' },
    { input: '2 2 1\n1 2\n3 4\n0 0 1 1', output: '10' }
  ],
  testCases: [
    { input: '3 3 2\n3 0 1\n5 6 3\n1 2 0\n0 0 1 1\n1 1 2 2', expectedOutput: '14\n11', isHidden: false },
    { input: '2 2 1\n1 2\n3 4\n0 0 1 1', expectedOutput: '10', isHidden: false },
    { input: '1 1 1\n42\n0 0 0 0', expectedOutput: '42', isHidden: false },
    { input: '2 3 2\n1 1 1\n1 1 1\n0 0 0 2\n0 0 1 2', expectedOutput: '3\n6', isHidden: true },
    { input: '3 3 1\n-1 -2 -3\n-4 -5 -6\n-7 -8 -9\n0 0 2 2', expectedOutput: '-45', isHidden: true },
    { input: '2 2 2\n10 -5\n-5 10\n0 0 0 0\n0 0 1 1', expectedOutput: '10\n10', isHidden: true },
    { input: '3 1 2\n10\n20\n30\n0 0 1 0\n0 0 2 0', expectedOutput: '30\n60', isHidden: true },
    { input: '1 3 2\n5 10 15\n0 0 0 1\n0 1 0 2', expectedOutput: '15\n25', isHidden: true },
    { input: '2 2 1\n0 0\n0 0\n0 0 1 1', expectedOutput: '0', isHidden: true },
    { input: '3 3 1\n1 2 3\n4 5 6\n7 8 9\n1 1 1 1', expectedOutput: '5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int r, c, q;\n    if (cin >> r >> c >> q) {\n        vector<vector<long long>> grid(r, vector<long long>(c));\n        for(int i = 0; i < r; i++) {\n            for(int j = 0; j < c; j++) cin >> grid[i][j];\n        }\n        for(int i = 0; i < q; i++) {\n            int r1, c1, r2, c2;\n            cin >> r1 >> c1 >> r2 >> c2;\n            // Solve query\n        }\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    r, c, q = int(lines[0]), int(lines[1]), int(lines[2])\n    idx = 3\n    grid = []\n    for _ in range(r):\n        row = [int(x) for x in lines[idx:idx+c]]\n        idx += c\n        grid.append(row)\n    for _ in range(q):\n        r1, c1, r2, c2 = int(lines[idx]), int(lines[idx+1]), int(lines[idx+2]), int(lines[idx+3])\n        idx += 4\n        # Solve query\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int q = sc.nextInt();\n        long[][] grid = new long[r][c];\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) grid[i][j] = sc.nextLong();\n        }\n        for (int i = 0; i < q; i++) {\n            int r1 = sc.nextInt(), c1 = sc.nextInt(), r2 = sc.nextInt(), c2 = sc.nextInt();\n            // Solve query\n        }\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const r = parseInt(input[0]);\n    const c = parseInt(input[1]);\n    const q = parseInt(input[2]);\n    let idx = 3;\n    const grid = [];\n    for (let i = 0; i < r; i++) {\n        const row = [];\n        for (let j = 0; j < c; j++) row.push(parseInt(input[idx++]));\n        grid.push(row);\n    }\n    for (let i = 0; i < q; i++) {\n        const r1 = parseInt(input[idx++]);\n        const c1 = parseInt(input[idx++]);\n        const r2 = parseInt(input[idx++]);\n        const c2 = parseInt(input[idx++]);\n        // Solve query\n    }\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int r, c, q;\n    if (cin >> r >> c >> q) {\n        vector<vector<long long>> pref(r + 1, vector<long long>(c + 1, 0));\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                long long val;\n                cin >> val;\n                pref[i + 1][j + 1] = val + pref[i][j + 1] + pref[i + 1][j] - pref[i][j];\n            }\n        }\n        for (int i = 0; i < q; i++) {\n            int r1, c1, r2, c2;\n            cin >> r1 >> c1 >> r2 >> c2;\n            long long sum = pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1];\n            cout << sum << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};
