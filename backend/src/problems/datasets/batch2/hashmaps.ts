import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2HashmapDistinctFreqStats: CodeClashProblemDefinition = {
  title: 'Distinct Count and Mode Stats',
  slug: 'codeclash-b2-hashmap-distinct-element-count',
  description: 'Given an array of N integers, find the number of distinct elements in the array, and the element with the highest frequency. If there is a tie for highest frequency, output the smallest element among the tied ones.\n\nInput format:\nLine 1: N (number of elements)\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Two space-separated integers: (DistinctCount, ModeElement).',
  difficulty: Difficulty.Easy,
  topics: ['Hashing', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '6\n1 2 2 3 3 3', output: '3 3' },
    { input: '4\n5 1 5 1', output: '2 1' }
  ],
  testCases: [
    { input: '6\n1 2 2 3 3 3', expectedOutput: '3 3', isHidden: false },
    { input: '4\n5 1 5 1', expectedOutput: '2 1', isHidden: false },
    { input: '1\n42', expectedOutput: '1 42', isHidden: false },
    { input: '5\n10 20 30 40 50', expectedOutput: '5 10', isHidden: true },
    { input: '5\n-1 -1 -2 -2 0', expectedOutput: '3 -2', isHidden: true },
    { input: '7\n0 0 0 0 0 0 0', expectedOutput: '1 0', isHidden: true },
    { input: '6\n100 -50 100 -50 20 30', expectedOutput: '4 -50', isHidden: true },
    { input: '4\n-10 -10 -10 5', expectedOutput: '2 -10', isHidden: true },
    { input: '5\n7 8 9 9 8', expectedOutput: '3 8', isHidden: true },
    { input: '8\n4 2 2 4 1 1 1 4', expectedOutput: '3 1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <map>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        map<int, int> freq;\n        for (int i = 0; i < n; i++) {\n            int x;\n            cin >> x;\n            freq[x]++;\n        }\n        int maxFreq = 0;\n        int modeVal = 0;\n        for (auto const& [val, count] : freq) {\n            if (count > maxFreq) {\n                maxFreq = count;\n                modeVal = val;\n            }\n        }\n        cout << freq.size() << " " << modeVal << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HashmapPairSumDivisibleK: CodeClashProblemDefinition = {
  title: 'Divisible Pair Sum Counter',
  slug: 'codeclash-b2-hashmap-pair-sum-divisible-k',
  description: 'Given an array of N integers and a positive integer K, count the number of pairs (i, j) with 0 <= i < j < N such that (nums[i] + nums[j]) % K == 0.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer count of valid pairs.',
  difficulty: Difficulty.Easy,
  topics: ['Hashing', 'Math'],
  constraints: [
    '1 <= N <= 10^5',
    '1 <= K <= 10^4',
    '0 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '5 5\n1 2 3 4 5', output: '2' },
    { input: '4 3\n3 6 9 12', output: '6' }
  ],
  testCases: [
    { input: '5 5\n1 2 3 4 5', expectedOutput: '2', isHidden: false },
    { input: '4 3\n3 6 9 12', expectedOutput: '6', isHidden: false },
    { input: '3 2\n1 3 5', expectedOutput: '3', isHidden: false },
    { input: '2 10\n1 2', expectedOutput: '0', isHidden: true },
    { input: '6 4\n2 2 2 2 2 2', expectedOutput: '15', isHidden: true },
    { input: '5 7\n1 6 2 5 3', expectedOutput: '2', isHidden: true },
    { input: '1 5\n10', expectedOutput: '0', isHidden: true },
    { input: '4 5\n0 0 0 0', expectedOutput: '6', isHidden: true },
    { input: '6 6\n1 5 2 4 3 3', expectedOutput: '3', isHidden: true },
    { input: '5 2\n0 1 2 3 4', expectedOutput: '4', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> remCount(k, 0);\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            remCount[val % k]++;\n        }\n        long long pairs = 0;\n        pairs += remCount[0] * (remCount[0] - 1) / 2;\n        for (int r = 1; r <= k / 2; r++) {\n            if (r == k - r) {\n                pairs += remCount[r] * (remCount[r] - 1) / 2;\n            } else {\n                pairs += remCount[r] * remCount[k - r];\n            }\n        }\n        cout << pairs << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HashmapSubarraysSumDivisibleK: CodeClashProblemDefinition = {
  title: 'Subarray Sum Divisibility Count',
  slug: 'codeclash-b2-hashmap-subarrays-sum-divisible-k',
  description: 'Given an array of N integers and an integer K, return the number of non-empty contiguous subarrays whose sum is divisible by K.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer count of valid subarrays.',
  difficulty: Difficulty.Medium,
  topics: ['Hashing', 'Prefix Sum'],
  constraints: [
    '1 <= N <= 10^5',
    '1 <= K <= 10^4',
    '-10^4 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '6 5\n4 5 0 -2 -3 1', output: '7' },
    { input: '1 5\n5', output: '1' }
  ],
  testCases: [
    { input: '6 5\n4 5 0 -2 -3 1', expectedOutput: '7', isHidden: false },
    { input: '1 5\n5', expectedOutput: '1', isHidden: false },
    { input: '3 2\n1 2 3', expectedOutput: '2', isHidden: false },
    { input: '5 3\n1 1 1 1 1', expectedOutput: '3', isHidden: true },
    { input: '4 4\n-1 2 9 -2', expectedOutput: '1', isHidden: true },
    { input: '5 1\n10 20 30 40 50', expectedOutput: '15', isHidden: true },
    { input: '3 10\n1 2 3', expectedOutput: '0', isHidden: true },
    { input: '5 5\n0 0 0 0 0', expectedOutput: '15', isHidden: true },
    { input: '4 2\n-2 4 -6 8', expectedOutput: '10', isHidden: true },
    { input: '6 7\n7 14 21 28 35 42', expectedOutput: '21', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        unordered_map<int, long long> remMap;\n        remMap[0] = 1;\n        long long prefSum = 0, res = 0;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            prefSum += val;\n            int rem = (prefSum % k + k) % k;\n            res += remMap[rem];\n            remMap[rem]++;\n        }\n        cout << res << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HashmapAnagramGroupSizes: CodeClashProblemDefinition = {
  title: 'Anagram Grouping Distributions',
  slug: 'codeclash-b2-hashmap-anagram-group-sizes',
  description: 'Given N strings, group them such that strings in the same group are anagrams of each other. Print the sizes of all groups in descending order.\n\nInput format:\nLine 1: N (number of strings)\nLine 2: N space-separated strings\n\nOutput format:\nLine 1: Space-separated group sizes in descending order.',
  difficulty: Difficulty.Medium,
  topics: ['Hashing', 'Strings', 'Sorting'],
  constraints: [
    '1 <= N <= 10^4',
    '1 <= |S_i| <= 50',
    'Strings contain lowercase English letters'
  ],
  examples: [
    { input: '6\neat tea tan ate nat bat', output: '3 2 1' },
    { input: '3\na b c', output: '1 1 1' }
  ],
  testCases: [
    { input: '6\neat tea tan ate nat bat', expectedOutput: '3 2 1', isHidden: false },
    { input: '3\na b c', expectedOutput: '1 1 1', isHidden: false },
    { input: '1\ncodeclash', expectedOutput: '1', isHidden: false },
    { input: '4\nab ba ab ba', expectedOutput: '4', isHidden: true },
    { input: '5\ncat act tca dog god', expectedOutput: '3 2', isHidden: true },
    { input: '4\naaa aaa aaa aaa', expectedOutput: '4', isHidden: true },
    { input: '6\na b c d e f', expectedOutput: '1 1 1 1 1 1', isHidden: true },
    { input: '5\nabc bca cab cba bac', expectedOutput: '5', isHidden: true },
    { input: '7\nlisten silent enlist google elgoog cat', expectedOutput: '3 2 1 1', isHidden: true },
    { input: '4\nxyz zxy yxz abc', expectedOutput: '3 1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<string> words(n);\n        for(int i = 0; i < n; i++) cin >> words[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    words = lines[1:n+1]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        String[] words = new String[n];\n        for (int i = 0; i < n; i++) words[i] = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const words = [];\n    for (let i = 0; i < n; i++) words.push(input[1 + i]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        unordered_map<string, int> groups;\n        for (int i = 0; i < n; i++) {\n            string s;\n            cin >> s;\n            string key = s;\n            sort(key.begin(), key.end());\n            groups[key]++;\n        }\n        vector<int> sizes;\n        for (auto p : groups) sizes.push_back(p.second);\n        sort(sizes.rbegin(), sizes.rend());\n        for (size_t i = 0; i < sizes.size(); i++) {\n            cout << sizes[i] << (i + 1 == sizes.size() ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HashmapFourElementSumZero: CodeClashProblemDefinition = {
  title: 'Quadruplet Zero Sum Tuples',
  slug: 'codeclash-b2-hashmap-four-element-sum-zero',
  description: 'Given four integer arrays A, B, C, D of size N, find the total number of tuple index combinations (i, j, k, l) such that A[i] + B[j] + C[k] + D[l] = 0.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers for A\nLine 3: N space-separated integers for B\nLine 4: N space-separated integers for C\nLine 5: N space-separated integers for D\n\nOutput format:\nLine 1: Single integer count of valid tuples.',
  difficulty: Difficulty.Medium,
  topics: ['Hashing', 'Arrays'],
  constraints: [
    '1 <= N <= 500',
    '-10^5 <= A[i], B[i], C[i], D[i] <= 10^5'
  ],
  examples: [
    { input: '2\n1 2\n-2 -1\n-1 2\n0 2', output: '2' },
    { input: '1\n0\n0\n0\n0', output: '1' }
  ],
  testCases: [
    { input: '2\n1 2\n-2 -1\n-1 2\n0 2', expectedOutput: '2', isHidden: false },
    { input: '1\n0\n0\n0\n0', expectedOutput: '1', isHidden: false },
    { input: '1\n1\n1\n1\n1', expectedOutput: '0', isHidden: false },
    { input: '2\n-1 -1\n-1 1\n-1 1\n1 1', expectedOutput: '8', isHidden: true },
    { input: '3\n1 2 3\n-1 -2 -3\n0 0 0\n0 0 0', expectedOutput: '27', isHidden: true },
    { input: '2\n10 -10\n20 -20\n30 -30\n-60 60', expectedOutput: '2', isHidden: true },
    { input: '1\n-5\n10\n-20\n15', expectedOutput: '1', isHidden: true },
    { input: '2\n0 0\n0 0\n0 0\n0 0', expectedOutput: '16', isHidden: true },
    { input: '3\n1 1 1\n1 1 1\n-1 -1 -1\n-1 -1 -1', expectedOutput: '81', isHidden: true },
    { input: '2\n5 10\n-5 -10\n15 20\n-15 -20', expectedOutput: '6', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> a(n), b(n), c(n), d(n);\n        for(int i = 0; i < n; i++) cin >> a[i];\n        for(int i = 0; i < n; i++) cin >> b[i];\n        for(int i = 0; i < n; i++) cin >> c[i];\n        for(int i = 0; i < n; i++) cin >> d[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    idx = 1\n    a = [int(x) for x in lines[idx:idx+n]]; idx += n\n    b = [int(x) for x in lines[idx:idx+n]]; idx += n\n    c = [int(x) for x in lines[idx:idx+n]]; idx += n\n    d = [int(x) for x in lines[idx:idx+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] a = new int[n], b = new int[n], c = new int[n], d = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        for (int i = 0; i < n; i++) b[i] = sc.nextInt();\n        for (int i = 0; i < n; i++) c[i] = sc.nextInt();\n        for (int i = 0; i < n; i++) d[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    let idx = 1;\n    const a = [], b = [], c = [], d = [];\n    for (let i = 0; i < n; i++) a.push(parseInt(input[idx++]));\n    for (let i = 0; i < n; i++) b.push(parseInt(input[idx++]));\n    for (let i = 0; i < n; i++) c.push(parseInt(input[idx++]));\n    for (let i = 0; i < n; i++) d.push(parseInt(input[idx++]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> a(n), b(n), c(n), d(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        for (int i = 0; i < n; i++) cin >> b[i];\n        for (int i = 0; i < n; i++) cin >> c[i];\n        for (int i = 0; i < n; i++) cin >> d[i];\n        unordered_map<int, int> abSum;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                abSum[a[i] + b[j]]++;\n            }\n        }\n        long long ans = 0;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                int target = -(c[i] + d[j]);\n                if (abSum.count(target)) ans += abSum[target];\n            }\n        }\n        cout << ans << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HashmapLongestSequenceStepK: CodeClashProblemDefinition = {
  title: 'Longest Arithmetic Progression Step-K',
  slug: 'codeclash-b2-hashmap-longest-consecutive-sequence-gap-k',
  description: 'Given an unordered array of N integers and a step difference K (K >= 0), find the length of the longest subsequence where every adjacent pair of elements has a difference of exactly K (i.e. x, x+K, x+2K, ...).\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Maximum sequence length integer.',
  difficulty: Difficulty.Hard,
  topics: ['Hashing', 'Dynamic Programming'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= K <= 10^9',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '6 2\n1 5 3 7 9 2', output: '5' },
    { input: '4 0\n3 3 3 3', output: '4' }
  ],
  testCases: [
    { input: '6 2\n1 5 3 7 9 2', expectedOutput: '3', isHidden: false },
    { input: '4 0\n3 3 3 3', expectedOutput: '4', isHidden: false },
    { input: '3 5\n10 20 30', expectedOutput: '1', isHidden: false },
    { input: '5 3\n1 4 7 10 13', expectedOutput: '5', isHidden: true },
    { input: '5 1\n10 9 8 7 6', expectedOutput: '1', isHidden: true },
    { input: '1 10\n42', expectedOutput: '1', isHidden: true },
    { input: '7 4\n2 6 10 3 7 11 15', expectedOutput: '4', isHidden: true },
    { input: '6 0\n1 2 1 2 1 2', expectedOutput: '3', isHidden: true },
    { input: '5 100\n-200 -100 0 100 200', expectedOutput: '5', isHidden: true },
    { input: '6 1\n1 3 2 4 3 5', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long k = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    long long k;\n    if (cin >> n >> k) {\n        unordered_map<long long, int> dp;\n        int maxLen = 0;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            int prevLen = dp.count(val - k) ? dp[val - k] : 0;\n            dp[val] = prevLen + 1;\n            maxLen = max(maxLen, dp[val]);\n        }\n        cout << maxLen << "\\n";\n    }\n    return 0;\n}'
  }
};
