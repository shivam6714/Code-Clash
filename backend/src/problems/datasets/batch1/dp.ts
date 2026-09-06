import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const coinChange: CodeClashProblemDefinition = {
  title: 'Coin Change',
  slug: 'coin-change',
  description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.\n\nInput format:\nLine 1: N (number of coin types)\nLine 2: N space-separated integers\nLine 3: amount\n\nOutput format:\nInteger representing fewest number of coins, or -1.',
  difficulty: Difficulty.Medium,
  topics: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
  constraints: [
    '1 <= coins.length <= 12',
    '1 <= coins[i] <= 2^31 - 1',
    '0 <= amount <= 10^4'
  ],
  examples: [
    { input: '3\n1 2 5\n11', output: '3' },
    { input: '1\n2\n3', output: '-1' },
    { input: '1\n1\n0', output: '0' }
  ],
  testCases: [
    { input: '3\n1 2 5\n11', expectedOutput: '3', isHidden: false },
    { input: '1\n2\n3', expectedOutput: '-1', isHidden: false },
    { input: '1\n1\n0', expectedOutput: '0', isHidden: false },
    { input: '4\n1 2 5 10\n18', expectedOutput: '4', isHidden: true },
    { input: '3\n1 2 5\n100', expectedOutput: '20', isHidden: true },
    { input: '1\n2\n4', expectedOutput: '2', isHidden: true },
    { input: '2\n2 5\n11', expectedOutput: '4', isHidden: true },
    { input: '4\n2 3 5 7\n17', expectedOutput: '3', isHidden: true },
    { input: '1\n1\n10000', expectedOutput: '10000', isHidden: true },
    { input: '2\n4 5\n3', expectedOutput: '-1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> coins(n);\n        for(int i = 0; i < n; i++) cin >> coins[i];\n        int amount; cin >> amount;\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    coins = [int(x) for x in lines[1:n+1]]\n    amount = int(lines[n+1])\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] coins = new int[n];\n        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();\n        int amount = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const coins = [];\n    for (let i = 0; i < n; i++) coins.push(parseInt(input[1 + i]));\n    const amount = parseInt(input[n+1]);\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    vector<int> coins(n);\n    for(int i=0; i<n; i++) cin>>coins[i];\n    int amount; cin>>amount;\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for(int i=1; i<=amount; i++) {\n      for(int c : coins) {\n        if(i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);\n      }\n    }\n    if(dp[amount] > amount) cout << -1 << "\\n";\n    else cout << dp[amount] << "\\n";\n  }\n  return 0;\n}'
  }
};

export const houseRobber: CodeClashProblemDefinition = {
  title: 'House Robber',
  slug: 'house-robber',
  description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.\n\nInput format:\nLine 1: N (number of houses)\nLine 2: N space-separated integers\n\nOutput format:\nInteger representing the maximum amount.',
  difficulty: Difficulty.Medium,
  topics: ['Array', 'Dynamic Programming'],
  constraints: [
    '1 <= nums.length <= 100',
    '0 <= nums[i] <= 400'
  ],
  examples: [
    { input: '4\n1 2 3 1', output: '4' },
    { input: '5\n2 7 9 3 1', output: '12' }
  ],
  testCases: [
    { input: '4\n1 2 3 1', expectedOutput: '4', isHidden: false },
    { input: '5\n2 7 9 3 1', expectedOutput: '12', isHidden: false },
    { input: '1\n100', expectedOutput: '100', isHidden: false },
    { input: '2\n5 10', expectedOutput: '10', isHidden: true },
    { input: '3\n5 1 5', expectedOutput: '10', isHidden: true },
    { input: '6\n10 1 1 10 1 1', expectedOutput: '21', isHidden: true },
    { input: '10\n0 0 0 0 0 0 0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '4\n2 1 1 2', expectedOutput: '4', isHidden: true },
    { input: '5\n100 1 1 100 1', expectedOutput: '200', isHidden: true },
    { input: '7\n400 400 400 400 400 400 400', expectedOutput: '1600', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n  int n; if(cin>>n) {\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin>>nums[i];\n    if(n == 1) { cout << nums[0] << "\\n"; return 0; }\n    vector<int> dp(n, 0);\n    dp[0] = nums[0];\n    dp[1] = max(nums[0], nums[1]);\n    for(int i=2; i<n; i++) {\n      dp[i] = max(dp[i-1], dp[i-2] + nums[i]);\n    }\n    cout << dp[n-1] << "\\n";\n  }\n  return 0;\n}'
  }
};

export const editDistance: CodeClashProblemDefinition = {
  title: 'Edit Distance',
  slug: 'edit-distance',
  description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character\n\nInput format:\nLine 1: string word1 (can be empty)\nLine 2: string word2 (can be empty)\n\nOutput format:\nInteger representing minimum operations.',
  difficulty: Difficulty.Hard,
  topics: ['String', 'Dynamic Programming'],
  constraints: [
    '0 <= word1.length, word2.length <= 500',
    'word1 and word2 consist of lowercase English letters.'
  ],
  examples: [
    { input: 'horse\nros', output: '3' },
    { input: 'intention\nexecution', output: '5' }
  ],
  testCases: [
    { input: 'horse\nros', expectedOutput: '3', isHidden: false },
    { input: 'intention\nexecution', expectedOutput: '5', isHidden: false },
    { input: 'a\nb', expectedOutput: '1', isHidden: false },
    { input: 'abc\nabc', expectedOutput: '0', isHidden: true },
    { input: 'abc\n', expectedOutput: '3', isHidden: true },
    { input: '\nabc', expectedOutput: '3', isHidden: true },
    { input: 'zoologicoarchaeologist\nzoogeologist', expectedOutput: '10', isHidden: true },
    { input: 'a\n', expectedOutput: '1', isHidden: true },
    { input: 'sea\nate', expectedOutput: '3', isHidden: true },
    { input: 'park\nspake', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string word1 = "", word2 = "";\n    // Handle possible empty lines carefully\n    getline(cin, word1);\n    getline(cin, word2);\n    // Write your code here and print the result\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().splitlines()\n    word1 = lines[0] if len(lines) > 0 else ""\n    word2 = lines[1] if len(lines) > 1 else ""\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String word1 = sc.hasNextLine() ? sc.nextLine() : "";\n        String word2 = sc.hasNextLine() ? sc.nextLine() : "";\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const lines = fs.readFileSync("/dev/stdin", "utf-8").split("\\n");\n    const word1 = lines[0] ? lines[0].trim() : "";\n    const word2 = lines[1] ? lines[1].trim() : "";\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n  string word1 = "", word2 = "";\n  getline(cin, word1); getline(cin, word2);\n  int m = word1.length();\n  int n = word2.length();\n  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n  for(int i=0; i<=m; i++) dp[i][0] = i;\n  for(int j=0; j<=n; j++) dp[0][j] = j;\n  for(int i=1; i<=m; i++) {\n    for(int j=1; j<=n; j++) {\n      if(word1[i-1] == word2[j-1]) {\n        dp[i][j] = dp[i-1][j-1];\n      } else {\n        dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});\n      }\n    }\n  }\n  cout << dp[m][n] << "\\n";\n  return 0;\n}'
  }
};
