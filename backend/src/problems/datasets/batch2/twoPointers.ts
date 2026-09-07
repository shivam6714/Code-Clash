import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2TwoPointersSortByParity: CodeClashProblemDefinition = {
  title: 'Stable Parity Partitioning',
  slug: 'codeclash-b2-twopointers-sort-by-parity',
  description: 'Given an array of N non-negative integers, reorder the array so that all even integers come before all odd integers, preserving the relative original order within evens and within odds.\n\nInput format:\nLine 1: N\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: N space-separated integers.',
  difficulty: Difficulty.Easy,
  topics: ['Two Pointers', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '4\n3 1 2 4', output: '2 4 3 1' },
    { input: '2\n0 1', output: '0 1' }
  ],
  testCases: [
    { input: '4\n3 1 2 4', expectedOutput: '2 4 3 1', isHidden: false },
    { input: '2\n0 1', expectedOutput: '0 1', isHidden: false },
    { input: '1\n5', expectedOutput: '5', isHidden: false },
    { input: '3\n2 4 6', expectedOutput: '2 4 6', isHidden: true },
    { input: '3\n1 3 5', expectedOutput: '1 3 5', isHidden: true },
    { input: '5\n10 15 20 25 30', expectedOutput: '10 20 30 15 25', isHidden: true },
    { input: '6\n1 2 3 4 5 6', expectedOutput: '2 4 6 1 3 5', isHidden: true },
    { input: '4\n0 0 1 1', expectedOutput: '0 0 1 1', isHidden: true },
    { input: '5\n9 8 7 6 5', expectedOutput: '8 6 9 7 5', isHidden: true },
    { input: '2\n100 99', expectedOutput: '100 99', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> evens, odds;\n        for (int i = 0; i < n; i++) {\n            int x;\n            cin >> x;\n            if (x % 2 == 0) evens.push_back(x);\n            else odds.push_back(x);\n        }\n        vector<int> res = evens;\n        res.insert(res.end(), odds.begin(), odds.end());\n        for (size_t i = 0; i < res.size(); i++) {\n            cout << res[i] << (i + 1 == res.size() ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TwoPointersPairClosestSum: CodeClashProblemDefinition = {
  title: 'Closest Pair Sum Search',
  slug: 'codeclash-b2-twopointers-pair-closest-sum',
  description: 'Given a sorted array of N integers and a target value T, find two distinct indices i < j such that nums[i] + nums[j] is as close as possible to T. If there are multiple pairs with equal minimal absolute difference |nums[i] + nums[j] - T|, pick the pair with the smallest sum.\n\nInput format:\nLine 1: N T\nLine 2: N space-separated integers (sorted in non-decreasing order)\n\nOutput format:\nLine 1: Two space-separated integers (nums[i], nums[j]) in ascending order.',
  difficulty: Difficulty.Easy,
  topics: ['Two Pointers', 'Arrays'],
  constraints: [
    '2 <= N <= 10^5',
    '-10^9 <= nums[i], T <= 10^9'
  ],
  examples: [
    { input: '6 15\n10 22 28 29 30 40', output: '10 22' },
    { input: '4 54\n10 20 30 40', output: '10 40' }
  ],
  testCases: [
    { input: '6 15\n10 22 28 29 30 40', expectedOutput: '10 22', isHidden: false },
    { input: '4 54\n10 20 30 40', expectedOutput: '10 40', isHidden: false },
    { input: '2 10\n1 2', expectedOutput: '1 2', isHidden: false },
    { input: '5 0\n-5 -2 1 4 7', expectedOutput: '-5 4', isHidden: true },
    { input: '4 100\n1 2 3 4', expectedOutput: '3 4', isHidden: true },
    { input: '4 -100\n-50 -40 -30 -20', expectedOutput: '-50 -40', isHidden: true },
    { input: '5 25\n5 10 15 20 25', expectedOutput: '5 20', isHidden: true },
    { input: '3 10\n2 4 7', expectedOutput: '2 7', isHidden: true },
    { input: '4 0\n-10 -5 5 10', expectedOutput: '-10 10', isHidden: true },
    { input: '5 12\n1 3 4 7 10', expectedOutput: '1 10', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long t;\n    if (cin >> n >> t) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, t = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long t = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const t = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <cmath>\n#include <climits>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    long long t;\n    if (cin >> n >> t) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        int l = 0, r = n - 1;\n        long long minDiff = LLONG_MAX;\n        long long bestVal1 = nums[0], bestVal2 = nums[1];\n        while (l < r) {\n            long long sum = nums[l] + nums[r];\n            long long diff = abs(sum - t);\n            if (diff < minDiff || (diff == minDiff && sum < (bestVal1 + bestVal2))) {\n                minDiff = diff;\n                bestVal1 = nums[l];\n                bestVal2 = nums[r];\n            }\n            if (sum < t) l++;\n            else r--;\n        }\n        if (bestVal1 > bestVal2) swap(bestVal1, bestVal2);\n        cout << bestVal1 << " " << bestVal2 << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TwoPointersTrappingWaterVolume: CodeClashProblemDefinition = {
  title: 'Trapped Rainwater Calculator',
  slug: 'codeclash-b2-twopointers-trapping-water-volume',
  description: 'Given N non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nInput format:\nLine 1: N\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: Single integer representing total trapped water.',
  difficulty: Difficulty.Medium,
  topics: ['Two Pointers', 'Arrays', 'Stack'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= height[i] <= 10^5'
  ],
  examples: [
    { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', output: '6' },
    { input: '6\n4 2 0 3 2 5', output: '9' }
  ],
  testCases: [
    { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', expectedOutput: '6', isHidden: false },
    { input: '6\n4 2 0 3 2 5', expectedOutput: '9', isHidden: false },
    { input: '3\n3 0 3', expectedOutput: '3', isHidden: false },
    { input: '1\n10', expectedOutput: '0', isHidden: true },
    { input: '5\n1 2 3 4 5', expectedOutput: '0', isHidden: true },
    { input: '5\n5 4 3 2 1', expectedOutput: '0', isHidden: true },
    { input: '5\n5 0 0 0 5', expectedOutput: '15', isHidden: true },
    { input: '7\n0 2 0 2 0 2 0', expectedOutput: '4', isHidden: true },
    { input: '8\n3 1 2 4 0 1 3 2', expectedOutput: '8', isHidden: true },
    { input: '4\n0 0 0 0', expectedOutput: '0', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> height(n);\n        for(int i = 0; i < n; i++) cin >> height[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    height = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] height = new long[n];\n        for (int i = 0; i < n; i++) height[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const height = [];\n    for (let i = 0; i < n; i++) height.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> height(n);\n        for (int i = 0; i < n; i++) cin >> height[i];\n        int l = 0, r = n - 1;\n        long long maxL = 0, maxR = 0, water = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= maxL) maxL = height[l];\n                else water += maxL - height[l];\n                l++;\n            } else {\n                if (height[r] >= maxR) maxR = height[r];\n                else water += maxR - height[r];\n                r--;\n            }\n        }\n        cout << water << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TwoPointersContainerMaxCapacity: CodeClashProblemDefinition = {
  title: 'Max Boundary Water Container',
  slug: 'codeclash-b2-twopointers-container-max-capacity',
  description: 'Given N non-negative integers representing vertical wall heights at unit intervals (index 0 to N-1), find two wall lines that together with the x-axis form a container holding the maximum amount of water.\n\nInput format:\nLine 1: N\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: Maximum container area integer.',
  difficulty: Difficulty.Medium,
  topics: ['Two Pointers', 'Greedy', 'Arrays'],
  constraints: [
    '2 <= N <= 10^5',
    '0 <= height[i] <= 10^4'
  ],
  examples: [
    { input: '9\n1 8 6 2 5 4 8 3 7', output: '49' },
    { input: '2\n1 1', output: '1' }
  ],
  testCases: [
    { input: '9\n1 8 6 2 5 4 8 3 7', expectedOutput: '49', isHidden: false },
    { input: '2\n1 1', expectedOutput: '1', isHidden: false },
    { input: '5\n4 3 2 1 4', expectedOutput: '16', isHidden: false },
    { input: '3\n1 2 1', expectedOutput: '2', isHidden: true },
    { input: '6\n1 1 1 1 1 1', expectedOutput: '5', isHidden: true },
    { input: '4\n10 1 1 10', expectedOutput: '30', isHidden: true },
    { input: '5\n1 100 100 1 1', expectedOutput: '100', isHidden: true },
    { input: '2\n0 0', expectedOutput: '0', isHidden: true },
    { input: '7\n2 3 4 5 18 17 6', expectedOutput: '17', isHidden: true },
    { input: '5\n5 4 3 2 1', expectedOutput: '6', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> height(n);\n        for(int i = 0; i < n; i++) cin >> height[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    height = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] height = new long[n];\n        for (int i = 0; i < n; i++) height[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const height = [];\n    for (let i = 0; i < n; i++) height.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> h(n);\n        for (int i = 0; i < n; i++) cin >> h[i];\n        int l = 0, r = n - 1;\n        long long maxArea = 0;\n        while (l < r) {\n            long long area = min(h[l], h[r]) * (r - l);\n            maxArea = max(maxArea, area);\n            if (h[l] < h[r]) l++;\n            else r--;\n        }\n        cout << maxArea << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TwoPointersTripletsLessThanTarget: CodeClashProblemDefinition = {
  title: 'Triplets Less Than Target Sum',
  slug: 'codeclash-b2-twopointers-triplets-less-than-target',
  description: 'Given an array of N integers and a target integer T, count the number of triplets (i, j, k) with 0 <= i < j < k < N such that nums[i] + nums[j] + nums[k] < T.\n\nInput format:\nLine 1: N T\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer count of valid triplets.',
  difficulty: Difficulty.Hard,
  topics: ['Two Pointers', 'Sorting', 'Arrays'],
  constraints: [
    '3 <= N <= 2000',
    '-10^9 <= nums[i], T <= 10^9'
  ],
  examples: [
    { input: '4 2\n-2 0 1 3', output: '2' },
    { input: '5 12\n5 1 3 4 7', output: '4' }
  ],
  testCases: [
    { input: '4 2\n-2 0 1 3', expectedOutput: '2', isHidden: false },
    { input: '5 12\n5 1 3 4 7', expectedOutput: '4', isHidden: false },
    { input: '3 0\n0 0 0', expectedOutput: '0', isHidden: false },
    { input: '4 1\n-1 0 1 2', expectedOutput: '1', isHidden: true },
    { input: '5 100\n10 20 30 40 50', expectedOutput: '6', isHidden: true },
    { input: '5 -10\n-5 -4 -3 -2 -1', expectedOutput: '2', isHidden: true },
    { input: '6 10\n1 2 3 4 5 6', expectedOutput: '7', isHidden: true },
    { input: '4 5\n1 1 1 1', expectedOutput: '4', isHidden: true },
    { input: '5 0\n-1 -1 -1 -1 -1', expectedOutput: '10', isHidden: true },
    { input: '6 15\n2 4 6 8 10 12', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long t;\n    if (cin >> n >> t) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, t = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long t = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const t = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    long long t;\n    if (cin >> n >> t) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        sort(nums.begin(), nums.end());\n        long long count = 0;\n        for (int i = 0; i < n - 2; i++) {\n            int l = i + 1, r = n - 1;\n            while (l < r) {\n                if (nums[i] + nums[l] + nums[r] < t) {\n                    count += (r - l);\n                    l++;\n                } else {\n                    r--;\n                }\n            }\n        }\n        cout << count << "\\n";\n    }\n    return 0;\n}'
  }
};
