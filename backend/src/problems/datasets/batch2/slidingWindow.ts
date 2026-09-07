import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2SlidingWindowMaxSumWindowK: CodeClashProblemDefinition = {
  title: 'Fixed Window Peak Sum',
  slug: 'codeclash-b2-slidingwindow-max-sum-window-k',
  description: 'Given an array of N integers and a window size K, find the maximum sum of any contiguous subarray of size exactly K.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer representing maximum window sum.',
  difficulty: Difficulty.Easy,
  topics: ['Sliding Window', 'Arrays'],
  constraints: [
    '1 <= K <= N <= 10^5',
    '-10^4 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '6 3\n2 1 5 1 3 2', output: '9' },
    { input: '4 2\n-1 -2 -3 -4', output: '-3' }
  ],
  testCases: [
    { input: '6 3\n2 1 5 1 3 2', expectedOutput: '9', isHidden: false },
    { input: '4 2\n-1 -2 -3 -4', expectedOutput: '-3', isHidden: false },
    { input: '3 1\n10 20 30', expectedOutput: '30', isHidden: false },
    { input: '5 5\n1 2 3 4 5', expectedOutput: '15', isHidden: true },
    { input: '7 4\n-2 1 -3 4 -1 2 1', expectedOutput: '6', isHidden: true },
    { input: '5 2\n100 -50 200 -100 300', expectedOutput: '200', isHidden: true },
    { input: '1 1\n-10', expectedOutput: '-10', isHidden: true },
    { input: '6 2\n5 5 5 5 5 5', expectedOutput: '10', isHidden: true },
    { input: '8 3\n1 4 2 10 2 3 1 0', expectedOutput: '16', isHidden: true },
    { input: '4 3\n100 200 300 400', expectedOutput: '900', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        long long windowSum = 0;\n        for (int i = 0; i < k; i++) windowSum += nums[i];\n        long long maxSum = windowSum;\n        for (int i = k; i < n; i++) {\n            windowSum += nums[i] - nums[i - k];\n            maxSum = max(maxSum, windowSum);\n        }\n        cout << maxSum << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2SlidingWindowSmallestSubarraySumAtleastS: CodeClashProblemDefinition = {
  title: 'Minimal Length Threshold Subarray',
  slug: 'codeclash-b2-slidingwindow-smallest-subarray-sum-atleast-s',
  description: 'Given an array of N positive integers and a target sum S, return the minimal length of a contiguous subarray whose sum is greater than or equal to S. If no such subarray exists, output 0.\n\nInput format:\nLine 1: N S\nLine 2: N space-separated positive integers\n\nOutput format:\nLine 1: Minimal length integer, or 0.',
  difficulty: Difficulty.Medium,
  topics: ['Sliding Window', 'Two Pointers', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '1 <= S <= 10^9',
    '1 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '6 7\n2 3 1 2 4 3', output: '2' },
    { input: '3 11\n1 1 1', output: '0' }
  ],
  testCases: [
    { input: '6 7\n2 3 1 2 4 3', expectedOutput: '2', isHidden: false },
    { input: '3 11\n1 1 1', expectedOutput: '0', isHidden: false },
    { input: '5 4\n1 4 4 4 4', expectedOutput: '1', isHidden: false },
    { input: '1 5\n5', expectedOutput: '1', isHidden: true },
    { input: '1 10\n5', expectedOutput: '0', isHidden: true },
    { input: '5 15\n1 2 3 4 5', expectedOutput: '5', isHidden: true },
    { input: '6 10\n1 2 3 4 5 6', expectedOutput: '2', isHidden: true },
    { input: '7 80\n10 20 30 40 50 60 70', expectedOutput: '2', isHidden: true },
    { input: '5 10\n2 1 5 2 3', expectedOutput: '3', isHidden: true },
    { input: '4 100\n25 25 25 25', expectedOutput: '4', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long s;\n    if (cin >> n >> s) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, s = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long s = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const s = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    long long s;\n    if (cin >> n >> s) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        long long windowSum = 0;\n        int minLen = n + 1;\n        int l = 0;\n        for (int r = 0; r < n; r++) {\n            windowSum += nums[r];\n            while (windowSum >= s) {\n                minLen = min(minLen, r - l + 1);\n                windowSum -= nums[l++];\n            }\n        }\n        cout << (minLen > n ? 0 : minLen) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2SlidingWindowAtmostKDistinctChars: CodeClashProblemDefinition = {
  title: 'Substring with K Distinct Alphabet Limit',
  slug: 'codeclash-b2-slidingwindow-atmost-k-distinct-chars',
  description: 'Given a string S and an integer K, find the length of the longest contiguous substring that contains at most K distinct characters.\n\nInput format:\nLine 1: K\nLine 2: string S\n\nOutput format:\nLine 1: Maximum length integer.',
  difficulty: Difficulty.Medium,
  topics: ['Sliding Window', 'Strings', 'Hashing'],
  constraints: [
    '1 <= |S| <= 10^5',
    '1 <= K <= 26',
    'S contains lowercase English letters'
  ],
  examples: [
    { input: '2\neceba', output: '3' },
    { input: '1\naa', output: '2' }
  ],
  testCases: [
    { input: '2\neceba', expectedOutput: '3', isHidden: false },
    { input: '1\naa', expectedOutput: '2', isHidden: false },
    { input: '3\nabaccc', expectedOutput: '6', isHidden: false },
    { input: '1\nabc', expectedOutput: '1', isHidden: true },
    { input: '5\ncodeclash', expectedOutput: '6', isHidden: true },
    { input: '2\naabbcc', expectedOutput: '4', isHidden: true },
    { input: '3\naabacbebebe', expectedOutput: '7', isHidden: true },
    { input: '1\naaaaaaa', expectedOutput: '7', isHidden: true },
    { input: '4\nabcdef', expectedOutput: '4', isHidden: true },
    { input: '2\nabacaba', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int k;\n    if (cin >> k) {\n        string s;\n        cin >> s;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    k = int(lines[0])\n    s = lines[1]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int k = sc.nextInt();\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const k = parseInt(input[0]);\n    const s = input[1];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int k;\n    if (cin >> k) {\n        string s;\n        cin >> s;\n        unordered_map<char, int> freq;\n        int l = 0, maxLen = 0;\n        for (int r = 0; r < (int)s.length(); r++) {\n            freq[s[r]]++;\n            while ((int)freq.size() > k) {\n                freq[s[l]]--;\n                if (freq[s[l]] == 0) freq.erase(s[l]);\n                l++;\n            }\n            maxLen = max(maxLen, r - l + 1);\n        }\n        cout << maxLen << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2SlidingWindowLongestOnesKFlips: CodeClashProblemDefinition = {
  title: 'Max Consecutive Ones with K Zero Flips',
  slug: 'codeclash-b2-slidingwindow-longest-ones-k-flips',
  description: 'Given a binary array of N integers (0s and 1s) and an integer K, return the maximum number of consecutive 1s in the array if you can flip at most K 0s to 1s.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers (0 or 1)\n\nOutput format:\nLine 1: Maximum length integer.',
  difficulty: Difficulty.Medium,
  topics: ['Sliding Window', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= K <= N',
    'nums[i] is 0 or 1'
  ],
  examples: [
    { input: '11 2\n1 1 1 0 0 0 1 1 1 1 0', output: '6' },
    { input: '5 1\n0 0 1 1 0', output: '3' }
  ],
  testCases: [
    { input: '11 2\n1 1 1 0 0 0 1 1 1 1 0', expectedOutput: '6', isHidden: false },
    { input: '5 1\n0 0 1 1 0', expectedOutput: '3', isHidden: false },
    { input: '3 0\n1 0 1', expectedOutput: '1', isHidden: false },
    { input: '4 4\n0 0 0 0', expectedOutput: '4', isHidden: true },
    { input: '5 0\n0 0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '6 1\n1 0 1 0 1 0', expectedOutput: '3', isHidden: true },
    { input: '5 2\n0 0 0 1 1', expectedOutput: '4', isHidden: true },
    { input: '1 0\n1', expectedOutput: '1', isHidden: true },
    { input: '7 2\n0 0 1 1 0 0 1', expectedOutput: '5', isHidden: true },
    { input: '6 3\n0 0 0 1 1 1', expectedOutput: '6', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        int l = 0, zeroCount = 0, maxLen = 0;\n        for (int r = 0; r < n; r++) {\n            if (nums[r] == 0) zeroCount++;\n            while (zeroCount > k) {\n                if (nums[l] == 0) zeroCount--;\n                l++;\n            }\n            maxLen = max(maxLen, r - l + 1);\n        }\n        cout << maxLen << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2SlidingWindowSlidingMaximumDeque: CodeClashProblemDefinition = {
  title: 'Sliding Window Maximum Tracker',
  slug: 'codeclash-b2-slidingwindow-sliding-maximum-deque',
  description: 'Given an array of N integers and a sliding window of size K moving from left to right, print the maximum value in each window.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: N-K+1 space-separated integers representing the max in each window.',
  difficulty: Difficulty.Hard,
  topics: ['Sliding Window', 'Deque', 'Monotonic Stack'],
  constraints: [
    '1 <= K <= N <= 10^5',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '8 3\n1 3 -1 -3 5 3 6 7', output: '3 3 5 5 6 7' },
    { input: '1 1\n1', output: '1' }
  ],
  testCases: [
    { input: '8 3\n1 3 -1 -3 5 3 6 7', expectedOutput: '3 3 5 5 6 7', isHidden: false },
    { input: '1 1\n1', expectedOutput: '1', isHidden: false },
    { input: '4 2\n4 3 2 1', expectedOutput: '4 3 2', isHidden: false },
    { input: '5 5\n1 2 3 4 5', expectedOutput: '5', isHidden: true },
    { input: '6 1\n9 8 7 6 5 4', expectedOutput: '9 8 7 6 5 4', isHidden: true },
    { input: '5 3\n10 10 10 10 10', expectedOutput: '10 10 10', isHidden: true },
    { input: '6 3\n-7 -8 7 5 7 1', expectedOutput: '7 7 7 7', isHidden: true },
    { input: '4 4\n-1 -2 -3 -4', expectedOutput: '-1', isHidden: true },
    { input: '7 3\n1 3 1 2 0 5 1', expectedOutput: '3 3 2 5 5', isHidden: true },
    { input: '5 2\n10 -10 20 -20 30', expectedOutput: '10 20 20 30', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <deque>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        deque<int> dq;\n        vector<long long> res;\n        for (int i = 0; i < n; i++) {\n            if (!dq.empty() && dq.front() == i - k) dq.pop_front();\n            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();\n            dq.push_back(i);\n            if (i >= k - 1) res.push_back(nums[dq.front()]);\n        }\n        for (size_t i = 0; i < res.size(); i++) {\n            cout << res[i] << (i + 1 == res.size() ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};
