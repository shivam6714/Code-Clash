import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2ArrayPairParitySum: CodeClashProblemDefinition = {
  title: 'Parity Pair Cross Sum',
  slug: 'codeclash-b2-array-pair-parity-sum',
  description: 'Given an array of N integers, find the sum of all product pairs (nums[i] * nums[j]) such that i < j and one number is even while the other is odd.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer representing the total sum of even-odd product pairs.',
  difficulty: Difficulty.Easy,
  topics: ['Arrays', 'Math'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^4 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '4\n1 2 3 4', output: '20' },
    { input: '3\n2 4 6', output: '0' }
  ],
  testCases: [
    { input: '4\n1 2 3 4', expectedOutput: '24', isHidden: false },
    { input: '3\n2 4 6', expectedOutput: '0', isHidden: false },
    { input: '3\n1 3 5', expectedOutput: '0', isHidden: false },
    { input: '5\n1 2 3 4 5', expectedOutput: '54', isHidden: true },
    { input: '2\n-2 3', expectedOutput: '-6', isHidden: true },
    { input: '1\n10', expectedOutput: '0', isHidden: true },
    { input: '6\n0 1 0 1 0 1', expectedOutput: '0', isHidden: true },
    { input: '4\n-1 -2 -3 -4', expectedOutput: '24', isHidden: true },
    { input: '5\n10 15 20 25 30', expectedOutput: '2400', isHidden: true },
    { input: '4\n100 200 300 401', expectedOutput: '240600', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        long long sumEven = 0, sumOdd = 0;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            if (abs(val) % 2 == 0) sumEven += val;\n            else sumOdd += val;\n        }\n        cout << (sumEven * sumOdd) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2ArrayMonotonePivot: CodeClashProblemDefinition = {
  title: 'Peak Monotone Pivot',
  slug: 'codeclash-b2-array-monotone-pivot',
  description: 'An array is called Bitonic if elements strictly increase up to a peak element, and then strictly decrease. Find the 0-based index of the peak element. If the array is not bitonic, output -1.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Index of the peak element, or -1 if invalid.',
  difficulty: Difficulty.Easy,
  topics: ['Arrays', 'Two Pointers'],
  constraints: [
    '3 <= N <= 10^5',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '5\n1 3 5 4 2', output: '2' },
    { input: '4\n1 2 3 4', output: '-1' }
  ],
  testCases: [
    { input: '5\n1 3 5 4 2', expectedOutput: '2', isHidden: false },
    { input: '4\n1 2 3 4', expectedOutput: '-1', isHidden: false },
    { input: '4\n4 3 2 1', expectedOutput: '-1', isHidden: false },
    { input: '3\n1 10 2', expectedOutput: '1', isHidden: true },
    { input: '6\n1 2 4 8 3 0', expectedOutput: '3', isHidden: true },
    { input: '5\n1 2 2 1 0', expectedOutput: '-1', isHidden: true },
    { input: '4\n2 5 5 1', expectedOutput: '-1', isHidden: true },
    { input: '7\n-5 -2 0 10 7 3 -1', expectedOutput: '3', isHidden: true },
    { input: '5\n10 20 30 40 50', expectedOutput: '-1', isHidden: true },
    { input: '5\n50 40 30 20 10', expectedOutput: '-1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        int i = 0;\n        while (i + 1 < n && nums[i] < nums[i + 1]) i++;\n        if (i == 0 || i == n - 1) {\n            cout << -1 << "\\n";\n            return 0;\n        }\n        int j = i;\n        while (j + 1 < n && nums[j] > nums[j + 1]) j++;\n        if (j == n - 1) cout << i << "\\n";\n        else cout << -1 << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2ArrayKStepRotationQuery: CodeClashProblemDefinition = {
  title: 'Cyclic Shift Query Engine',
  slug: 'codeclash-b2-array-k-step-rotation-query',
  description: 'Given an array of N integers, right rotate the array by K positions. Then process Q queries, where each query gives a 0-based index and asks for the value at that position after rotation.\n\nInput format:\nLine 1: N K Q (size of array, right shifts, number of queries)\nLine 2: N space-separated integers\nLine 3: Q space-separated 0-based index queries\n\nOutput format:\nLine 1: Q space-separated integers representing the query answers.',
  difficulty: Difficulty.Medium,
  topics: ['Arrays', 'Math'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= K <= 10^9',
    '1 <= Q <= 10^5',
    '0 <= query_idx < N'
  ],
  examples: [
    { input: '5 2 3\n10 20 30 40 50\n0 1 4', output: '40 50 30' },
    { input: '3 0 2\n1 2 3\n0 2', output: '1 3' }
  ],
  testCases: [
    { input: '5 2 3\n10 20 30 40 50\n0 1 4', expectedOutput: '40 50 30', isHidden: false },
    { input: '3 0 2\n1 2 3\n0 2', expectedOutput: '1 3', isHidden: false },
    { input: '4 5 1\n100 200 300 400\n0', expectedOutput: '400', isHidden: false },
    { input: '1 100 1\n77\n0', expectedOutput: '77', isHidden: true },
    { input: '6 4 4\n1 2 3 4 5 6\n0 2 3 5', expectedOutput: '3 5 6 2', isHidden: true },
    { input: '5 1000000000 2\n5 4 3 2 1\n0 4', expectedOutput: '5 1', isHidden: true },
    { input: '4 2 4\n-1 -2 -3 -4\n0 1 2 3', expectedOutput: '-3 -4 -1 -2', isHidden: true },
    { input: '5 3 3\n10 9 8 7 6\n1 2 3', expectedOutput: '7 6 10', isHidden: true },
    { input: '2 1 2\n5 10\n0 1', expectedOutput: '10 5', isHidden: true },
    { input: '3 3 3\n1 2 3\n0 1 2', expectedOutput: '1 2 3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k, q;\n    if (cin >> n >> k >> q) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        vector<int> queries(q);\n        for(int i = 0; i < q; i++) cin >> queries[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k, q = int(lines[0]), int(lines[1]), int(lines[2])\n    nums = [int(x) for x in lines[3:3+n]]\n    queries = [int(x) for x in lines[3+n:3+n+q]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int q = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int[] queries = new int[q];\n        for (int i = 0; i < q; i++) queries[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const q = parseInt(input[2]);\n    let idx = 3;\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[idx++]));\n    const queries = [];\n    for (let i = 0; i < q; i++) queries.push(parseInt(input[idx++]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, k, q;\n    if (cin >> n >> k >> q) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        int shift = k % n;\n        for (int i = 0; i < q; i++) {\n            int qidx;\n            cin >> qidx;\n            int origIdx = (qidx - shift + n) % n;\n            cout << nums[origIdx] << (i == q - 1 ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2ArrayEquilibriumIndex: CodeClashProblemDefinition = {
  title: 'Array Equilibrium Balance Point',
  slug: 'codeclash-b2-array-equilibrium-index',
  description: 'Find the smallest 0-based index i in an array of N integers such that the sum of elements at lower indices equals the sum of elements at higher indices. If no such index exists, output -1.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer index, or -1 if none exists.',
  difficulty: Difficulty.Medium,
  topics: ['Arrays', 'Prefix Sum'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^4 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '7\n-7 1 5 2 -4 3 0', output: '3' },
    { input: '3\n1 2 3', output: '-1' }
  ],
  testCases: [
    { input: '7\n-7 1 5 2 -4 3 0', expectedOutput: '3', isHidden: false },
    { input: '3\n1 2 3', expectedOutput: '-1', isHidden: false },
    { input: '1\n100', expectedOutput: '0', isHidden: false },
    { input: '3\n0 0 0', expectedOutput: '0', isHidden: true },
    { input: '5\n1 2 3 4 -10', expectedOutput: '-1', isHidden: true },
    { input: '4\n2 0 0 2', expectedOutput: '1', isHidden: true },
    { input: '6\n1 7 3 6 5 6', expectedOutput: '3', isHidden: true },
    { input: '5\n1 2 3 3 0', expectedOutput: '2', isHidden: true },
    { input: '4\n-1 -1 -1 -1', expectedOutput: '-1', isHidden: true },
    { input: '5\n10 -5 5 10 0', expectedOutput: '-1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        long long totalSum = 0;\n        for (int i = 0; i < n; i++) {\n            cin >> nums[i];\n            totalSum += nums[i];\n        }\n        long long leftSum = 0;\n        for (int i = 0; i < n; i++) {\n            long long rightSum = totalSum - leftSum - nums[i];\n            if (leftSum == rightSum) {\n                cout << i << "\\n";\n                return 0;\n            }\n            leftSum += nums[i];\n        }\n        cout << -1 << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2ArrayBlockInversionCount: CodeClashProblemDefinition = {
  title: 'K-Block Reversal Inversions',
  slug: 'codeclash-b2-array-block-inversion-count',
  description: 'Given an array of N distinct integers, reverse every contiguous block of size K (the last block may have fewer than K elements if N is not divisible by K). Count the total number of inversion pairs (i < j and A[i] > A[j]) in the modified array.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated distinct integers\n\nOutput format:\nLine 1: Total inversion count.',
  difficulty: Difficulty.Medium,
  topics: ['Arrays', 'Sorting'],
  constraints: [
    '1 <= N <= 2000',
    '1 <= K <= N',
    '1 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '5 2\n1 2 3 4 5', output: '2' },
    { input: '4 4\n1 2 3 4', output: '6' }
  ],
  testCases: [
    { input: '5 2\n1 2 3 4 5', expectedOutput: '2', isHidden: false },
    { input: '4 4\n1 2 3 4', expectedOutput: '6', isHidden: false },
    { input: '3 1\n1 2 3', expectedOutput: '0', isHidden: false },
    { input: '5 3\n5 4 3 2 1', expectedOutput: '6', isHidden: true },
    { input: '6 2\n10 20 30 40 50 60', expectedOutput: '3', isHidden: true },
    { input: '4 2\n4 1 2 3', expectedOutput: '3', isHidden: true },
    { input: '1 1\n42', expectedOutput: '0', isHidden: true },
    { input: '7 3\n1 4 2 5 3 7 6', expectedOutput: '6', isHidden: true },
    { input: '5 2\n5 1 4 2 3', expectedOutput: '4', isHidden: true },
    { input: '6 3\n1 3 2 6 4 5', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        for (int i = 0; i < n; i += k) {\n            int end = min(n, i + k);\n            reverse(nums.begin() + i, nums.begin() + end);\n        }\n        long long inv = 0;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (nums[i] > nums[j]) inv++;\n            }\n        }\n        cout << inv << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2ArrayMajorityThreshold: CodeClashProblemDefinition = {
  title: 'Frequent Elements Above Threshold',
  slug: 'codeclash-b2-array-majority-threshold',
  description: 'Given an array of N integers and a threshold divisor K, find all elements that appear strictly more than N / K times in the array. Output the elements in ascending order.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Space-separated elements in ascending order, or -1 if no element satisfies the condition.',
  difficulty: Difficulty.Medium,
  topics: ['Arrays', 'Hashing'],
  constraints: [
    '1 <= N <= 10^5',
    '2 <= K <= 10',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '8 3\n3 3 4 2 4 4 2 4', output: '4' },
    { input: '5 2\n1 2 3 4 5', output: '-1' }
  ],
  testCases: [
    { input: '8 3\n3 3 4 2 4 4 2 4', expectedOutput: '4', isHidden: false },
    { input: '5 2\n1 2 3 4 5', expectedOutput: '-1', isHidden: false },
    { input: '6 3\n1 2 1 2 1 2', expectedOutput: '1 2', isHidden: false },
    { input: '1 2\n10', expectedOutput: '10', isHidden: true },
    { input: '7 4\n1 1 2 2 3 3 3', expectedOutput: '1 2 3', isHidden: true },
    { input: '4 2\n2 2 1 1', expectedOutput: '-1', isHidden: true },
    { input: '9 3\n-1 -1 -1 -1 5 5 5 5 0', expectedOutput: '-1 5', isHidden: true },
    { input: '6 2\n7 7 7 7 1 2', expectedOutput: '7', isHidden: true },
    { input: '5 5\n1 2 3 4 5', expectedOutput: '-1', isHidden: true },
    { input: '4 4\n10 10 20 20', expectedOutput: '10 20', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        map<int, int> freq;\n        for (int i = 0; i < n; i++) {\n            int x; cin >> x;\n            freq[x]++;\n        }\n        int thresh = n / k;\n        vector<int> res;\n        for (auto const& [val, count] : freq) {\n            if (count > thresh) res.push_back(val);\n        }\n        if (res.empty()) {\n            cout << -1 << "\\n";\n        } else {\n            for (size_t i = 0; i < res.size(); i++) {\n                cout << res[i] << (i + 1 == res.size() ? "" : " ");\n            }\n            cout << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2ArrayMaxSubarrayXorSum: CodeClashProblemDefinition = {
  title: 'Maximum Subarray XOR Sum',
  slug: 'codeclash-b2-array-max-subarray-xor-sum',
  description: 'Given an array of N non-negative integers, find the maximum bitwise XOR sum of any non-empty contiguous subarray.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: Maximum XOR sum.',
  difficulty: Difficulty.Hard,
  topics: ['Arrays', 'Bit Manipulation'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= nums[i] <= 10^6'
  ],
  examples: [
    { input: '4\n1 2 3 4', output: '7' },
    { input: '3\n8 1 2', output: '11' }
  ],
  testCases: [
    { input: '4\n1 2 3 4', expectedOutput: '7', isHidden: false },
    { input: '3\n8 1 2', expectedOutput: '11', isHidden: false },
    { input: '1\n5', expectedOutput: '5', isHidden: false },
    { input: '5\n0 0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '5\n9 5 8 5 3', expectedOutput: '14', isHidden: true },
    { input: '6\n1 2 4 8 16 32', expectedOutput: '63', isHidden: true },
    { input: '4\n10 10 10 10', expectedOutput: '10', isHidden: true },
    { input: '5\n100 200 300 400 500', expectedOutput: '500', isHidden: true },
    { input: '7\n4 6 11 2 1 15 8', expectedOutput: '15', isHidden: true },
    { input: '3\n1048575 0 1048575', expectedOutput: '1048575', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct TrieNode {\n    TrieNode* children[2] = {nullptr, nullptr};\n};\n\nvoid insert(TrieNode* root, int val) {\n    TrieNode* curr = root;\n    for (int i = 24; i >= 0; i--) {\n        int bit = (val >> i) & 1;\n        if (!curr->children[bit]) curr->children[bit] = new TrieNode();\n        curr = curr->children[bit];\n    }\n}\n\nint getMaxXor(TrieNode* root, int val) {\n    TrieNode* curr = root;\n    int maxXor = 0;\n    for (int i = 24; i >= 0; i--) {\n        int bit = (val >> i) & 1;\n        int opp = 1 - bit;\n        if (curr->children[opp]) {\n            maxXor |= (1 << i);\n            curr = curr->children[opp];\n        } else {\n            curr = curr->children[bit];\n        }\n    }\n    return maxXor;\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        TrieNode* root = new TrieNode();\n        insert(root, 0);\n        int pref = 0, ans = 0;\n        for (int x : nums) {\n            pref ^= x;\n            insert(root, pref);\n            ans = max(ans, getMaxXor(root, pref));\n        }\n        cout << ans << "\\n";\n    }\n    return 0;\n}'
  }
};
