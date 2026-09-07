import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2DpStaircaseMinStepCost: CodeClashProblemDefinition = {
  title: 'Min Cost Staircase Climbing',
  slug: 'codeclash-b2-dp-staircase-min-step-cost',
  description: 'Given an array of N integers where cost[i] is the cost of step i, once you pay the cost, you can step 1 or 2 steps. You can start from step 0 or step 1. Return the minimum cost to reach the top of the staircase (beyond index N-1).\n\nInput format:\nLine 1: N\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: Minimum total cost integer.',
  difficulty: Difficulty.Easy,
  topics: ['Dynamic Programming', 'Arrays'],
  constraints: [
    '2 <= N <= 10^5',
    '0 <= cost[i] <= 10^4'
  ],
  examples: [
    { input: '3\n10 15 20', output: '15' },
    { input: '10\n1 100 1 1 1 100 1 1 100 1', output: '6' }
  ],
  testCases: [
    { input: '3\n10 15 20', expectedOutput: '15', isHidden: false },
    { input: '10\n1 100 1 1 1 100 1 1 100 1', expectedOutput: '6', isHidden: false },
    { input: '2\n10 20', expectedOutput: '10', isHidden: false },
    { input: '4\n0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '5\n1 2 3 4 5', expectedOutput: '6', isHidden: true },
    { input: '6\n10 5 2 8 1 9', expectedOutput: '8', isHidden: true },
    { input: '4\n100 1 1 100', expectedOutput: '2', isHidden: true },
    { input: '5\n5 10 15 20 25', expectedOutput: '30', isHidden: true },
    { input: '3\n0 1 2', expectedOutput: '1', isHidden: true },
    { input: '6\n2 5 3 1 4 2', expectedOutput: '8', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> cost(n);\n        for(int i = 0; i < n; i++) cin >> cost[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    cost = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] cost = new long[n];\n        for (int i = 0; i < n; i++) cost[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const cost = [];\n    for (let i = 0; i < n; i++) cost.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> cost(n);\n        for (int i = 0; i < n; i++) cin >> cost[i];\n        long long prev2 = cost[0], prev1 = cost[1];\n        for (int i = 2; i < n; i++) {\n            long long curr = cost[i] + min(prev1, prev2);\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        cout << min(prev1, prev2) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2DpCoinChangeMinCoins: CodeClashProblemDefinition = {
  title: 'Coin Change Minimum Coins Counter',
  slug: 'codeclash-b2-dp-coin-change-min-coins',
  description: 'Given an array of N coin denominations and a target amount A, find the fewest number of coins needed to make up that amount. If that amount cannot be made up by any combination of the coins, output -1.\n\nInput format:\nLine 1: N A\nLine 2: N space-separated positive integers\n\nOutput format:\nLine 1: Minimum coins integer, or -1.',
  difficulty: Difficulty.Medium,
  topics: ['Dynamic Programming', 'BFS'],
  constraints: [
    '1 <= N <= 12',
    '0 <= A <= 10^4',
    '1 <= coins[i] <= 10^4'
  ],
  examples: [
    { input: '3 11\n1 2 5', output: '3' },
    { input: '1 3\n2', output: '-1' }
  ],
  testCases: [
    { input: '3 11\n1 2 5', expectedOutput: '3', isHidden: false },
    { input: '1 3\n2', expectedOutput: '-1', isHidden: false },
    { input: '1 0\n1', expectedOutput: '0', isHidden: false },
    { input: '4 100\n1 5 10 25', expectedOutput: '4', isHidden: true },
    { input: '3 7\n2 4 6', expectedOutput: '-1', isHidden: true },
    { input: '2 15\n10 5', expectedOutput: '2', isHidden: true },
    { input: '3 6249\n186 419 83', expectedOutput: '38', isHidden: true },
    { input: '5 30\n1 5 10 20 50', expectedOutput: '2', isHidden: true },
    { input: '3 10\n1 3 4', expectedOutput: '3', isHidden: true },
    { input: '2 10000\n1 100', expectedOutput: '100', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long a;\n    if (cin >> n >> a) {\n        vector<int> coins(n);\n        for(int i = 0; i < n; i++) cin >> coins[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, a = int(lines[0]), int(lines[1])\n    coins = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long a = sc.nextLong();\n        int[] coins = new int[n];\n        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const a = parseInt(input[1]);\n    const coins = [];\n    for (let i = 0; i < n; i++) coins.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    long long a;\n    if (cin >> n >> a) {\n        vector<int> coins(n);\n        for (int i = 0; i < n; i++) cin >> coins[i];\n        vector<long long> dp(a + 1, 1e18);\n        dp[0] = 0;\n        for (int i = 1; i <= a; i++) {\n            for (int c : coins) {\n                if (i >= c) {\n                    dp[i] = min(dp[i], dp[i - c] + 1);\n                }\n            }\n        }\n        cout << (dp[a] == 1e18 ? -1 : dp[a]) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2DpLongestIncreasingSubsequence: CodeClashProblemDefinition = {
  title: 'Longest Increasing Subsequence Length',
  slug: 'codeclash-b2-dp-longest-increasing-subsequence',
  description: 'Given an array of N integers, find the length of the longest strictly increasing subsequence in O(N log N) time.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Length integer of longest increasing subsequence.',
  difficulty: Difficulty.Medium,
  topics: ['Dynamic Programming', 'Binary Search', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '8\n10 9 2 5 3 7 101 18', output: '4' },
    { input: '6\n0 1 0 3 2 3', output: '4' }
  ],
  testCases: [
    { input: '8\n10 9 2 5 3 7 101 18', expectedOutput: '4', isHidden: false },
    { input: '6\n0 1 0 3 2 3', expectedOutput: '4', isHidden: false },
    { input: '5\n7 7 7 7 7', expectedOutput: '1', isHidden: false },
    { input: '1\n10', expectedOutput: '1', isHidden: true },
    { input: '6\n5 4 3 2 1 0', expectedOutput: '1', isHidden: true },
    { input: '6\n1 2 3 4 5 6', expectedOutput: '6', isHidden: true },
    { input: '7\n-5 0 2 -3 4 1 6', expectedOutput: '5', isHidden: true },
    { input: '5\n10 22 9 33 21', expectedOutput: '3', isHidden: true },
    { input: '8\n3 4 -1 0 6 2 3 8', expectedOutput: '5', isHidden: true },
    { input: '6\n2 5 3 7 11 8', expectedOutput: '4', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        vector<long long> tails;\n        for (long long x : nums) {\n            auto it = lower_bound(tails.begin(), tails.end(), x);\n            if (it == tails.end()) tails.push_back(x);\n            else *it = x;\n        }\n        cout << tails.size() << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2DpHouseRobberCircular: CodeClashProblemDefinition = {
  title: 'Circular Neighborhood Loot Maximizer',
  slug: 'codeclash-b2-dp-house-robber-circular',
  description: 'Houses are arranged in a circle, meaning the first house is neighbor to the last house. Each house has a non-negative value of money. You cannot rob two adjacent houses. Return the maximum amount of money you can rob.\n\nInput format:\nLine 1: N\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: Maximum stolen amount integer.',
  difficulty: Difficulty.Medium,
  topics: ['Dynamic Programming', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= nums[i] <= 10^4'
  ],
  examples: [
    { input: '3\n2 3 2', output: '3' },
    { input: '4\n1 2 3 1', output: '4' }
  ],
  testCases: [
    { input: '3\n2 3 2', expectedOutput: '3', isHidden: false },
    { input: '4\n1 2 3 1', expectedOutput: '4', isHidden: false },
    { input: '1\n10', expectedOutput: '10', isHidden: false },
    { input: '2\n5 10', expectedOutput: '10', isHidden: true },
    { input: '5\n1 2 3 4 5', expectedOutput: '8', isHidden: true },
    { input: '4\n0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '5\n10 1 1 10 1', expectedOutput: '20', isHidden: true },
    { input: '6\n2 7 9 3 1 5', expectedOutput: '15', isHidden: true },
    { input: '4\n100 1 1 100', expectedOutput: '101', isHidden: true },
    { input: '5\n5 10 15 20 25', expectedOutput: '40', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nlong long robLinear(const vector<long long>& nums, int l, int r) {\n    long long prev2 = 0, prev1 = 0;\n    for (int i = l; i <= r; i++) {\n        long long curr = max(prev1, prev2 + nums[i]);\n        prev2 = prev1;\n        prev1 = curr;\n    }\n    return prev1;\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        if (n == 1) {\n            cout << nums[0] << "\\n";\n            return 0;\n        }\n        long long ans = max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));\n        cout << ans << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2DpPartitionEqualSubsetSum: CodeClashProblemDefinition = {
  title: 'Equal Subset Sum Partition Checker',
  slug: 'codeclash-b2-dp-partition-equal-subset-sum',
  description: 'Given an array of N positive integers, determine if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal. Output "YES" if possible, otherwise "NO".\n\nInput format:\nLine 1: N\nLine 2: N space-separated positive integers\n\nOutput format:\nLine 1: "YES" or "NO".',
  difficulty: Difficulty.Medium,
  topics: ['Dynamic Programming', 'Arrays'],
  constraints: [
    '1 <= N <= 200',
    '1 <= nums[i] <= 100'
  ],
  examples: [
    { input: '4\n1 5 11 5', output: 'YES' },
    { input: '4\n1 2 3 5', output: 'NO' }
  ],
  testCases: [
    { input: '4\n1 5 11 5', expectedOutput: 'YES', isHidden: false },
    { input: '4\n1 2 3 5', expectedOutput: 'NO', isHidden: false },
    { input: '1\n10', expectedOutput: 'NO', isHidden: false },
    { input: '3\n1 2 3', expectedOutput: 'YES', isHidden: true },
    { input: '4\n2 2 2 2', expectedOutput: 'YES', isHidden: true },
    { input: '5\n1 2 3 4 10', expectedOutput: 'YES', isHidden: true },
    { input: '4\n10 20 30 70', expectedOutput: 'NO', isHidden: true },
    { input: '5\n3 3 3 4 5', expectedOutput: 'YES', isHidden: true },
    { input: '2\n100 100', expectedOutput: 'YES', isHidden: true },
    { input: '4\n1 1 1 100', expectedOutput: 'NO', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        int total = 0;\n        for (int i = 0; i < n; i++) {\n            cin >> nums[i];\n            total += nums[i];\n        }\n        if (total % 2 != 0) {\n            cout << "NO\\n";\n            return 0;\n        }\n        int target = total / 2;\n        vector<bool> dp(target + 1, false);\n        dp[0] = true;\n        for (int x : nums) {\n            for (int j = target; j >= x; j--) {\n                if (dp[j - x]) dp[j] = true;\n            }\n        }\n        cout << (dp[target] ? "YES" : "NO") << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2DpEditDistanceLevenshtein: CodeClashProblemDefinition = {
  title: 'Levenshtein String Edit Distance',
  slug: 'codeclash-b2-dp-edit-distance-levenshtein',
  description: 'Given two strings S1 and S2, return the minimum number of operations required to convert S1 to S2. You are allowed three operations on a character: insert, delete, or replace.\n\nInput format:\nLine 1: string S1\nLine 2: string S2\n\nOutput format:\nLine 1: Minimum operations integer.',
  difficulty: Difficulty.Hard,
  topics: ['Dynamic Programming', 'Strings'],
  constraints: [
    '0 <= |S1|, |S2| <= 1000',
    'S1 and S2 contain lowercase English letters'
  ],
  examples: [
    { input: 'horse\nros', output: '3' },
    { input: 'intention\nexecution', output: '5' }
  ],
  testCases: [
    { input: 'horse\nros', expectedOutput: '3', isHidden: false },
    { input: 'intention\nexecution', expectedOutput: '5', isHidden: false },
    { input: 'a\na', expectedOutput: '0', isHidden: false },
    { input: 'a\nb', expectedOutput: '1', isHidden: true },
    { input: 'abc\ndef', expectedOutput: '3', isHidden: true },
    { input: 'cat\ncut', expectedOutput: '1', isHidden: true },
    { input: 'algorithm\naltutu', expectedOutput: '6', isHidden: true },
    { input: 'codeclash\ncodeclash', expectedOutput: '0', isHidden: true },
    { input: 'abcdef\nabc', expectedOutput: '3', isHidden: true },
    { input: 'zoologicoarchaeologist\nzoologist', expectedOutput: '13', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s1, s2;\n    if (cin >> s1 >> s2) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    s1 = lines[0] if len(lines) > 0 else ""\n    s2 = lines[1] if len(lines) > 1 else ""\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s1 = sc.hasNext() ? sc.next() : "";\n        String s2 = sc.hasNext() ? sc.next() : "";\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    const s1 = input[0] || "";\n    const s2 = input[1] || "";\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s1, s2;\n    if (cin >> s1 >> s2) {\n        int m = s1.length(), n = s2.length();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n                else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});\n            }\n        }\n        cout << dp[m][n] << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2DpLongestPalindromicSubsequence: CodeClashProblemDefinition = {
  title: 'Longest Palindromic Subsequence Length',
  slug: 'codeclash-b2-dp-longest-palindromic-subsequence',
  description: 'Given a string S of lowercase English letters, find the length of the longest palindromic subsequence in S.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Maximum length integer.',
  difficulty: Difficulty.Hard,
  topics: ['Dynamic Programming', 'Strings'],
  constraints: [
    '1 <= |S| <= 1000',
    'S contains lowercase English letters'
  ],
  examples: [
    { input: 'bbbab', output: '4' },
    { input: 'cbbd', output: '2' }
  ],
  testCases: [
    { input: 'bbbab', expectedOutput: '4', isHidden: false },
    { input: 'cbbd', expectedOutput: '2', isHidden: false },
    { input: 'a', expectedOutput: '1', isHidden: false },
    { input: 'abcba', expectedOutput: '5', isHidden: true },
    { input: 'abcdef', expectedOutput: '1', isHidden: true },
    { input: 'aaaaa', expectedOutput: '5', isHidden: true },
    { input: 'character', expectedOutput: '5', isHidden: true },
    { input: 'abacaba', expectedOutput: '7', isHidden: true },
    { input: 'racecar', expectedOutput: '7', isHidden: true },
    { input: 'aebcbda', expectedOutput: '5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s;\n    if (cin >> s) {\n        int n = s.length();\n        vector<vector<int>> dp(n, vector<int>(n, 0));\n        for (int i = 0; i < n; i++) dp[i][i] = 1;\n        for (int len = 2; len <= n; len++) {\n            for (int i = 0; i <= n - len; i++) {\n                int j = i + len - 1;\n                if (s[i] == s[j]) {\n                    dp[i][j] = dp[i + 1][j - 1] + 2;\n                } else {\n                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        cout << dp[0][n - 1] << "\\n";\n    }\n    return 0;\n}'
  }
};
