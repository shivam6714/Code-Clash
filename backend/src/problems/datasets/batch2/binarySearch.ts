import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2BinarySearchFirstLastOccurrence: CodeClashProblemDefinition = {
  title: 'First and Last Target Bounds',
  slug: 'codeclash-b2-binarysearch-first-last-occurrence',
  description: 'Given a sorted array of N integers in non-decreasing order and a target value X, find the 0-based first and last occurrence indices of X. If X is not present, output "-1 -1".\n\nInput format:\nLine 1: N X\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Two space-separated integers (FirstIndex, LastIndex).',
  difficulty: Difficulty.Easy,
  topics: ['Binary Search', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= nums[i], X <= 10^9'
  ],
  examples: [
    { input: '6 8\n5 7 7 8 8 10', output: '3 4' },
    { input: '6 6\n5 7 7 8 8 10', output: '-1 -1' }
  ],
  testCases: [
    { input: '6 8\n5 7 7 8 8 10', expectedOutput: '3 4', isHidden: false },
    { input: '6 6\n5 7 7 8 8 10', expectedOutput: '-1 -1', isHidden: false },
    { input: '1 5\n5', expectedOutput: '0 0', isHidden: false },
    { input: '5 2\n1 2 2 2 3', expectedOutput: '1 3', isHidden: true },
    { input: '4 10\n1 2 3 4', expectedOutput: '-1 -1', isHidden: true },
    { input: '5 0\n0 0 0 0 0', expectedOutput: '0 4', isHidden: true },
    { input: '2 1\n1 2', expectedOutput: '0 0', isHidden: true },
    { input: '2 2\n1 2', expectedOutput: '1 1', isHidden: true },
    { input: '6 -5\n-10 -5 -5 -5 0 5', expectedOutput: '1 3', isHidden: true },
    { input: '4 7\n1 3 5 7', expectedOutput: '3 3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long x;\n    if (cin >> n >> x) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, x = int(lines[0]), int(lines[1])\n    nums = [int(v) for v in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long x = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const x = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    long long x;\n    if (cin >> n >> x) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        auto it1 = lower_bound(nums.begin(), nums.end(), x);\n        if (it1 == nums.end() || *it1 != x) {\n            cout << "-1 -1\\n";\n        } else {\n            int first = distance(nums.begin(), it1);\n            auto it2 = upper_bound(nums.begin(), nums.end(), x);\n            int last = distance(nums.begin(), it2) - 1;\n            cout << first << " " << last << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2BinarySearchInsertPosition: CodeClashProblemDefinition = {
  title: 'Sorted Array Insertion Point',
  slug: 'codeclash-b2-binarysearch-insert-position-or-nearest',
  description: 'Given a sorted array of distinct integers and a target value X, return the index if target X is found. If not, return the index where it would be inserted in order to maintain sorted order.\n\nInput format:\nLine 1: N X\nLine 2: N space-separated distinct integers\n\nOutput format:\nLine 1: Single integer index position.',
  difficulty: Difficulty.Easy,
  topics: ['Binary Search', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= nums[i], X <= 10^9'
  ],
  examples: [
    { input: '4 5\n1 3 5 6', output: '2' },
    { input: '4 2\n1 3 5 6', output: '1' }
  ],
  testCases: [
    { input: '4 5\n1 3 5 6', expectedOutput: '2', isHidden: false },
    { input: '4 2\n1 3 5 6', expectedOutput: '1', isHidden: false },
    { input: '4 7\n1 3 5 6', expectedOutput: '4', isHidden: false },
    { input: '4 0\n1 3 5 6', expectedOutput: '0', isHidden: true },
    { input: '1 0\n10', expectedOutput: '0', isHidden: true },
    { input: '1 20\n10', expectedOutput: '1', isHidden: true },
    { input: '5 -2\n-10 -5 0 5 10', expectedOutput: '2', isHidden: true },
    { input: '4 10\n2 4 6 8', expectedOutput: '4', isHidden: true },
    { input: '3 4\n1 3 5', expectedOutput: '2', isHidden: true },
    { input: '5 15\n10 20 30 40 50', expectedOutput: '1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long x;\n    if (cin >> n >> x) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, x = int(lines[0]), int(lines[1])\n    nums = [int(v) for v in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long x = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const x = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    long long x;\n    if (cin >> n >> x) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        auto it = lower_bound(nums.begin(), nums.end(), x);\n        cout << distance(nums.begin(), it) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2BinarySearchPeakMountain: CodeClashProblemDefinition = {
  title: 'Mountain Peak Search',
  slug: 'codeclash-b2-binarysearch-peak-element-mountain',
  description: 'An array nums is a mountain array if it increases to a peak element and then decreases. Find the 0-based index of the peak element in O(log N) time.\n\nInput format:\nLine 1: N (size of mountain array, N >= 3)\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Peak index integer.',
  difficulty: Difficulty.Medium,
  topics: ['Binary Search', 'Arrays'],
  constraints: [
    '3 <= N <= 10^5',
    '0 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '4\n0 1 0 -1', output: '1' },
    { input: '5\n0 2 10 5 2', output: '2' }
  ],
  testCases: [
    { input: '4\n0 1 0 -1', expectedOutput: '1', isHidden: false },
    { input: '5\n0 2 10 5 2', expectedOutput: '2', isHidden: false },
    { input: '3\n1 10 1', expectedOutput: '1', isHidden: false },
    { input: '6\n1 3 5 4 2 0', expectedOutput: '2', isHidden: true },
    { input: '7\n0 10 20 30 20 10 0', expectedOutput: '3', isHidden: true },
    { input: '4\n0 10 5 2', expectedOutput: '1', isHidden: true },
    { input: '5\n1 2 3 2 1', expectedOutput: '2', isHidden: true },
    { input: '6\n10 20 30 40 10 0', expectedOutput: '3', isHidden: true },
    { input: '4\n1 5 10 2', expectedOutput: '2', isHidden: true },
    { input: '5\n5 15 25 10 0', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(v) for v in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        int l = 0, r = n - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] < nums[mid + 1]) l = mid + 1;\n            else r = mid;\n        }\n        cout << l << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2BinarySearchShipCapacityDDays: CodeClashProblemDefinition = {
  title: 'Minimal Cargo Vessel Capacity',
  slug: 'codeclash-b2-binarysearch-ship-capacity-d-days',
  description: 'A conveyor belt has packages with weights given by an array of N integers. Return the minimum weight capacity of a ship that will result in all packages being shipped within D days in order.\n\nInput format:\nLine 1: N D\nLine 2: N space-separated positive integers (weights)\n\nOutput format:\nLine 1: Minimum capacity integer.',
  difficulty: Difficulty.Medium,
  topics: ['Binary Search', 'Greedy', 'Arrays'],
  constraints: [
    '1 <= D <= N <= 10^5',
    '1 <= weights[i] <= 500'
  ],
  examples: [
    { input: '10 5\n1 2 3 4 5 6 7 8 9 10', output: '15' },
    { input: '6 3\n3 2 2 4 1 4', output: '6' }
  ],
  testCases: [
    { input: '10 5\n1 2 3 4 5 6 7 8 9 10', expectedOutput: '15', isHidden: false },
    { input: '6 3\n3 2 2 4 1 4', expectedOutput: '6', isHidden: false },
    { input: '3 1\n1 2 5', expectedOutput: '8', isHidden: false },
    { input: '5 5\n1 2 3 4 5', expectedOutput: '5', isHidden: true },
    { input: '1 1\n10', expectedOutput: '10', isHidden: true },
    { input: '5 2\n10 20 30 40 50', expectedOutput: '90', isHidden: true },
    { input: '4 2\n100 100 100 100', expectedOutput: '200', isHidden: true },
    { input: '6 2\n1 1 1 1 1 1', expectedOutput: '3', isHidden: true },
    { input: '5 3\n5 10 15 20 25', expectedOutput: '30', isHidden: true },
    { input: '4 3\n50 10 20 30', expectedOutput: '50', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, d;\n    if (cin >> n >> d) {\n        vector<long long> weights(n);\n        for(int i = 0; i < n; i++) cin >> weights[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, d = int(lines[0]), int(lines[1])\n    weights = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int d = sc.nextInt();\n        long[] weights = new long[n];\n        for (int i = 0; i < n; i++) weights[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const d = parseInt(input[1]);\n    const weights = [];\n    for (let i = 0; i < n; i++) weights.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nbool canShip(const vector<long long>& w, int d, long long cap) {\n    int days = 1;\n    long long curr = 0;\n    for (long long val : w) {\n        if (val > cap) return false;\n        if (curr + val > cap) {\n            days++;\n            curr = val;\n        } else {\n            curr += val;\n        }\n    }\n    return days <= d;\n}\n\nint main() {\n    int n, d;\n    if (cin >> n >> d) {\n        vector<long long> weights(n);\n        long long maxW = 0, sumW = 0;\n        for (int i = 0; i < n; i++) {\n            cin >> weights[i];\n            maxW = max(maxW, weights[i]);\n            sumW += weights[i];\n        }\n        long long l = maxW, r = sumW, ans = sumW;\n        while (l <= r) {\n            long long mid = l + (r - l) / 2;\n            if (canShip(weights, d, mid)) {\n                ans = mid;\n                r = mid - 1;\n            } else {\n                l = mid + 1;\n            }\n        }\n        cout << ans << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2BinarySearchKthSmallestTwoSortedArrays: CodeClashProblemDefinition = {
  title: 'K-th Element in Dual Sorted Sequences',
  slug: 'codeclash-b2-binarysearch-kth-smallest-two-sorted-arrays',
  description: 'Given two sorted arrays A of size N and B of size M, find the K-th (1-based) smallest element in the merged sorted sequence in O(log(N+M)) time.\n\nInput format:\nLine 1: N M K\nLine 2: N space-separated integers for A\nLine 3: M space-separated integers for B\n\nOutput format:\nLine 1: K-th element integer.',
  difficulty: Difficulty.Medium,
  topics: ['Binary Search', 'Arrays', 'Two Pointers'],
  constraints: [
    '0 <= N, M <= 10^5',
    '1 <= N + M <= 2 * 10^5',
    '1 <= K <= N + M',
    '-10^9 <= A[i], B[i] <= 10^9'
  ],
  examples: [
    { input: '5 4 5\n2 3 6 7 9\n1 4 8 10', output: '6' },
    { input: '2 3 2\n10 20\n1 2 3', output: '2' }
  ],
  testCases: [
    { input: '5 4 5\n2 3 6 7 9\n1 4 8 10', expectedOutput: '6', isHidden: false },
    { input: '2 3 2\n10 20\n1 2 3', expectedOutput: '2', isHidden: false },
    { input: '1 0 1\n42\n', expectedOutput: '42', isHidden: false },
    { input: '3 3 6\n1 3 5\n2 4 6', expectedOutput: '6', isHidden: true },
    { input: '4 4 1\n10 20 30 40\n5 15 25 35', expectedOutput: '5', isHidden: true },
    { input: '2 2 4\n-10 -5\n0 5', expectedOutput: '5', isHidden: true },
    { input: '3 2 3\n1 1 1\n2 2', expectedOutput: '1', isHidden: true },
    { input: '5 5 10\n1 2 3 4 5\n6 7 8 9 10', expectedOutput: '10', isHidden: true },
    { input: '3 4 4\n100 200 300\n50 150 250 350', expectedOutput: '200', isHidden: true },
    { input: '2 3 5\n1 2\n3 4 5', expectedOutput: '5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, k;\n    if (cin >> n >> m >> k) {\n        vector<long long> a(n), b(m);\n        for(int i = 0; i < n; i++) cin >> a[i];\n        for(int i = 0; i < m; i++) cin >> b[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, m, k = int(lines[0]), int(lines[1]), int(lines[2])\n    idx = 3\n    a = [int(x) for x in lines[idx:idx+n]]; idx += n\n    b = [int(x) for x in lines[idx:idx+m]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int k = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const m = parseInt(input[1]);\n    const k = parseInt(input[2]);\n    let idx = 3;\n    const a = [];\n    for (let i = 0; i < n; i++) a.push(parseInt(input[idx++]));\n    const b = [];\n    for (let i = 0; i < m; i++) b.push(parseInt(input[idx++]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nlong long findKth(const vector<long long>& a, int aStart, const vector<long long>& b, int bStart, int k) {\n    if (aStart >= (int)a.size()) return b[bStart + k - 1];\n    if (bStart >= (int)b.size()) return a[aStart + k - 1];\n    if (k == 1) return min(a[aStart], b[bStart]);\n    int half = k / 2;\n    long long aMid = (aStart + half - 1 < (int)a.size()) ? a[aStart + half - 1] : 1e18;\n    long long bMid = (bStart + half - 1 < (int)b.size()) ? b[bStart + half - 1] : 1e18;\n    if (aMid < bMid) return findKth(a, aStart + half, b, bStart, k - half);\n    else return findKth(a, aStart, b, bStart + half, k - half);\n}\n\nint main() {\n    int n, m, k;\n    if (cin >> n >> m >> k) {\n        vector<long long> a(n), b(m);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        for (int i = 0; i < m; i++) cin >> b[i];\n        cout << findKth(a, 0, b, 0, k) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2BinarySearchSplitArrayMinMaxSum: CodeClashProblemDefinition = {
  title: 'Optimal Subarray Partition Max-Sum Minimization',
  slug: 'codeclash-b2-binarysearch-split-array-min-max-sum',
  description: 'Given an array of N non-negative integers and an integer K, split the array into K non-empty contiguous subarrays such that the maximum sum among all K subarrays is minimized. Output this minimum maximum subarray sum.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: Single integer representing the minimized maximum subarray sum.',
  difficulty: Difficulty.Hard,
  topics: ['Binary Search', 'Dynamic Programming', 'Greedy'],
  constraints: [
    '1 <= K <= N <= 10^5',
    '0 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '5 2\n7 2 5 10 8', output: '18' },
    { input: '4 4\n1 2 3 4', output: '4' }
  ],
  testCases: [
    { input: '5 2\n7 2 5 10 8', expectedOutput: '18', isHidden: false },
    { input: '4 4\n1 2 3 4', expectedOutput: '4', isHidden: false },
    { input: '3 1\n10 20 30', expectedOutput: '60', isHidden: false },
    { input: '5 3\n1 4 4', expectedOutput: '4', isHidden: true },
    { input: '6 3\n2 3 1 1 1 1', expectedOutput: '4', isHidden: true },
    { input: '4 2\n100 200 300 400', expectedOutput: '600', isHidden: true },
    { input: '5 2\n1 1 1 1 100', expectedOutput: '100', isHidden: true },
    { input: '6 3\n10 20 30 40 50 60', expectedOutput: '90', isHidden: true },
    { input: '5 5\n0 0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '7 3\n5 5 5 5 5 5 5', expectedOutput: '15', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nbool isValid(const vector<long long>& nums, int k, long long maxTarget) {\n    int count = 1;\n    long long curr = 0;\n    for (long long x : nums) {\n        if (x > maxTarget) return false;\n        if (curr + x > maxTarget) {\n            count++;\n            curr = x;\n        } else {\n            curr += x;\n        }\n    }\n    return count <= k;\n}\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        long long maxVal = 0, totalSum = 0;\n        for (int i = 0; i < n; i++) {\n            cin >> nums[i];\n            maxVal = max(maxVal, nums[i]);\n            totalSum += nums[i];\n        }\n        long long l = maxVal, r = totalSum, ans = totalSum;\n        while (l <= r) {\n            long long mid = l + (r - l) / 2;\n            if (isValid(nums, k, mid)) {\n                ans = mid;\n                r = mid - 1;\n            } else {\n                l = mid + 1;\n            }\n        }\n        cout << ans << "\\n";\n    }\n    return 0;\n}'
  }
};
