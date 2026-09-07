import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2GreedyLemonadeChange: CodeClashProblemDefinition = {
  title: 'Lemonade Change Transaction',
  slug: 'codeclash-b2-greedy-lemonade-change',
  description: 'Each lemonade costs $5. Customers stand in queue giving either $5, $10, or $20 bills. You start with no money. Determine if you can provide exact change to every customer. Output "YES" if possible, otherwise "NO".\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers (5, 10, or 20)\n\nOutput format:\nLine 1: "YES" or "NO".',
  difficulty: Difficulty.Easy,
  topics: ['Greedy', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    'bills[i] is 5, 10, or 20'
  ],
  examples: [
    { input: '5\n5 5 5 10 20', output: 'YES' },
    { input: '5\n5 5 10 10 20', output: 'NO' }
  ],
  testCases: [
    { input: '5\n5 5 5 10 20', expectedOutput: 'YES', isHidden: false },
    { input: '5\n5 5 10 10 20', expectedOutput: 'NO', isHidden: false },
    { input: '1\n5', expectedOutput: 'YES', isHidden: false },
    { input: '1\n10', expectedOutput: 'NO', isHidden: true },
    { input: '3\n5 5 10', expectedOutput: 'YES', isHidden: true },
    { input: '4\n10 10 10 10', expectedOutput: 'NO', isHidden: true },
    { input: '6\n5 5 5 20 5 10', expectedOutput: 'YES', isHidden: true },
    { input: '4\n5 5 5 20', expectedOutput: 'YES', isHidden: true },
    { input: '5\n5 5 5 5 20', expectedOutput: 'YES', isHidden: true },
    { input: '3\n5 10 5', expectedOutput: 'YES', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> bills(n);\n        for(int i = 0; i < n; i++) cin >> bills[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    bills = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] bills = new int[n];\n        for (int i = 0; i < n; i++) bills[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const bills = [];\n    for (let i = 0; i < n; i++) bills.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        int five = 0, ten = 0;\n        bool ok = true;\n        for (int i = 0; i < n; i++) {\n            int b;\n            cin >> b;\n            if (b == 5) {\n                five++;\n            } else if (b == 10) {\n                if (five == 0) { ok = false; break; }\n                five--; ten++;\n            } else {\n                if (ten > 0 && five > 0) {\n                    ten--; five--;\n                } else if (five >= 3) {\n                    five -= 3;\n                } else {\n                    ok = false; break;\n                }\n            }\n        }\n        cout << (ok ? "YES" : "NO") << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GreedyAssignCookiesSatisfaction: CodeClashProblemDefinition = {
  title: 'Child Cookie Satisfaction Maximizer',
  slug: 'codeclash-b2-greedy-assign-cookies-satisfaction',
  description: 'Given N children with greed factors g[i] and M cookies with sizes s[j], assign each child at most one cookie of size >= g[i] to maximize the total number of content children.\n\nInput format:\nLine 1: N M\nLine 2: N space-separated greed factors\nLine 3: M space-separated cookie sizes\n\nOutput format:\nLine 1: Maximum number of satisfied children integer.',
  difficulty: Difficulty.Easy,
  topics: ['Greedy', 'Two Pointers', 'Sorting'],
  constraints: [
    '1 <= N, M <= 10^5',
    '1 <= g[i], s[j] <= 10^9'
  ],
  examples: [
    { input: '3 2\n1 2 3\n1 1', output: '1' },
    { input: '2 3\n1 2\n1 2 3', output: '2' }
  ],
  testCases: [
    { input: '3 2\n1 2 3\n1 1', expectedOutput: '1', isHidden: false },
    { input: '2 3\n1 2\n1 2 3', expectedOutput: '2', isHidden: false },
    { input: '1 1\n5\n5', expectedOutput: '1', isHidden: false },
    { input: '3 1\n2 3 4\n1', expectedOutput: '0', isHidden: true },
    { input: '4 4\n1 2 3 4\n4 3 2 1', expectedOutput: '4', isHidden: true },
    { input: '3 3\n10 20 30\n5 15 25', expectedOutput: '2', isHidden: true },
    { input: '5 2\n1 1 1 1 1\n2 2', expectedOutput: '2', isHidden: true },
    { input: '2 5\n10 10\n1 2 3 4 5', expectedOutput: '0', isHidden: true },
    { input: '4 2\n5 10 15 20\n10 20', expectedOutput: '2', isHidden: true },
    { input: '3 3\n100 100 100\n100 100 100', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        vector<long long> g(n), s(m);\n        for(int i = 0; i < n; i++) cin >> g[i];\n        for(int i = 0; i < m; i++) cin >> s[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, m = int(lines[0]), int(lines[1])\n    idx = 2\n    g = [int(x) for x in lines[idx:idx+n]]; idx += n\n    s = [int(x) for x in lines[idx:idx+m]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        long[] g = new long[n];\n        for (int i = 0; i < n; i++) g[i] = sc.nextLong();\n        long[] s = new long[m];\n        for (int i = 0; i < m; i++) s[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const m = parseInt(input[1]);\n    let idx = 2;\n    const g = [];\n    for (let i = 0; i < n; i++) g.push(parseInt(input[idx++]));\n    const s = [];\n    for (let i = 0; i < m; i++) s.push(parseInt(input[idx++]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        vector<long long> g(n), s(m);\n        for (int i = 0; i < n; i++) cin >> g[i];\n        for (int i = 0; i < m; i++) cin >> s[i];\n        sort(g.begin(), g.end());\n        sort(s.begin(), s.end());\n        int child = 0, cookie = 0;\n        while (child < n && cookie < m) {\n            if (s[cookie] >= g[child]) child++;\n            cookie++;\n        }\n        cout << child << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GreedyJumpGameReachability: CodeClashProblemDefinition = {
  title: 'Jump Game Destination Reachability',
  slug: 'codeclash-b2-greedy-jump-game-reachability',
  description: 'Given an array of N non-negative integers where nums[i] represents your maximum jump length from position i, determine if you can reach the last index starting from index 0. Output "YES" if reachable, otherwise "NO".\n\nInput format:\nLine 1: N\nLine 2: N space-separated non-negative integers\n\nOutput format:\nLine 1: "YES" or "NO".',
  difficulty: Difficulty.Medium,
  topics: ['Greedy', 'Arrays', 'Dynamic Programming'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= nums[i] <= 10^5'
  ],
  examples: [
    { input: '5\n2 3 1 1 4', output: 'YES' },
    { input: '5\n3 2 1 0 4', output: 'NO' }
  ],
  testCases: [
    { input: '5\n2 3 1 1 4', expectedOutput: 'YES', isHidden: false },
    { input: '5\n3 2 1 0 4', expectedOutput: 'NO', isHidden: false },
    { input: '1\n0', expectedOutput: 'YES', isHidden: false },
    { input: '2\n0 1', expectedOutput: 'NO', isHidden: true },
    { input: '3\n2 0 0', expectedOutput: 'YES', isHidden: true },
    { input: '6\n1 1 1 1 1 1', expectedOutput: 'YES', isHidden: true },
    { input: '5\n1 0 1 0 1', expectedOutput: 'NO', isHidden: true },
    { input: '4\n5 0 0 0', expectedOutput: 'YES', isHidden: true },
    { input: '5\n2 0 1 0 1', expectedOutput: 'NO', isHidden: true },
    { input: '6\n10 0 0 0 0 0', expectedOutput: 'YES', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        int maxReach = 0;\n        for (int i = 0; i < n; i++) {\n            if (i > maxReach) break;\n            maxReach = max(maxReach, i + nums[i]);\n        }\n        cout << (maxReach >= n - 1 ? "YES" : "NO") << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GreedyPartitionLabels: CodeClashProblemDefinition = {
  title: 'Max Non-Overlapping Character Partitions',
  slug: 'codeclash-b2-greedy-partition-labels',
  description: 'Partition string S into as many parts as possible so that each letter appears in at most one part. Output the lengths of these partitions.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Space-separated partition lengths.',
  difficulty: Difficulty.Medium,
  topics: ['Greedy', 'Two Pointers', 'Strings', 'Hashing'],
  constraints: [
    '1 <= |S| <= 10^5',
    'S contains lowercase English letters'
  ],
  examples: [
    { input: 'ababcbacadefegdehijhklij', output: '9 7 8' },
    { input: 'eccbbbbdec', output: '10' }
  ],
  testCases: [
    { input: 'ababcbacadefegdehijhklij', expectedOutput: '9 7 8', isHidden: false },
    { input: 'eccbbbbdec', expectedOutput: '10', isHidden: false },
    { input: 'a', expectedOutput: '1', isHidden: false },
    { input: 'abcdef', expectedOutput: '1 1 1 1 1 1', isHidden: true },
    { input: 'aaaaa', expectedOutput: '5', isHidden: true },
    { input: 'abacaba', expectedOutput: '7', isHidden: true },
    { input: 'aebbed', expectedOutput: '1 4 1', isHidden: true },
    { input: 'abcabc', expectedOutput: '6', isHidden: true },
    { input: 'zyxzyx', expectedOutput: '6', isHidden: true },
    { input: 'abacabadabacaba', expectedOutput: '15', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s;\n    if (cin >> s) {\n        vector<int> last(26, 0);\n        int n = s.length();\n        for (int i = 0; i < n; i++) last[s[i] - \'a\'] = i;\n        vector<int> res;\n        int start = 0, maxLast = 0;\n        for (int i = 0; i < n; i++) {\n            maxLast = max(maxLast, last[s[i] - \'a\']);\n            if (i == maxLast) {\n                res.push_back(i - start + 1);\n                start = i + 1;\n            }\n        }\n        for (size_t i = 0; i < res.size(); i++) {\n            cout << res[i] << (i + 1 == res.size() ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GreedyTaskSchedulerCooldown: CodeClashProblemDefinition = {
  title: 'CPU Task Scheduler Minimum Cycles',
  slug: 'codeclash-b2-greedy-task-scheduler-cooldown',
  description: 'Given N uppercase tasks and a cooldown period K, calculate the minimum number of CPU time units required to finish all tasks. There must be at least K units of time between any two identical tasks.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated uppercase characters representing tasks\n\nOutput format:\nLine 1: Minimum CPU intervals integer.',
  difficulty: Difficulty.Medium,
  topics: ['Greedy', 'Heap / Priority Queue', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= K <= 100',
    'tasks are uppercase English letters'
  ],
  examples: [
    { input: '6 2\nA A A B B B', output: '8' },
    { input: '6 0\nA A A B B B', output: '6' }
  ],
  testCases: [
    { input: '6 2\nA A A B B B', expectedOutput: '8', isHidden: false },
    { input: '6 0\nA A A B B B', expectedOutput: '6', isHidden: false },
    { input: '6 2\nA A A B C D', expectedOutput: '7', isHidden: false },
    { input: '1 2\nA', expectedOutput: '1', isHidden: true },
    { input: '4 3\nA A A A', expectedOutput: '13', isHidden: true },
    { input: '6 3\nA B C D E F', expectedOutput: '6', isHidden: true },
    { input: '5 2\nA A A B C', expectedOutput: '7', isHidden: true },
    { input: '4 1\nA A B B', expectedOutput: '4', isHidden: true },
    { input: '6 10\nA A A B B B', expectedOutput: '24', isHidden: true },
    { input: '5 1\nA B A B A', expectedOutput: '5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<char> tasks(n);\n        for(int i = 0; i < n; i++) cin >> tasks[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    tasks = lines[2:2+n]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        char[] tasks = new char[n];\n        for (int i = 0; i < n; i++) tasks[i] = sc.next().charAt(0);\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const tasks = [];\n    for (let i = 0; i < n; i++) tasks.push(input[2 + i]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<int> freq(26, 0);\n        for (int i = 0; i < n; i++) {\n            char c; cin >> c;\n            freq[c - \'A\']++;\n        }\n        int maxF = *max_element(freq.begin(), freq.end());\n        int maxCount = 0;\n        for (int f : freq) if (f == maxF) maxCount++;\n        long long ans = (long long)(maxF - 1) * (k + 1) + maxCount;\n        cout << max((long long)n, ans) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GreedyCandyDistribution: CodeClashProblemDefinition = {
  title: 'Rating-Based Candy Minimizer',
  slug: 'codeclash-b2-greedy-candy-distribution',
  description: 'N children stand in line with ratings given in an array. Each child must get at least 1 candy. Children with a higher rating than their neighbor must receive more candies than that neighbor. Find the minimum total number of candies needed.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers (ratings)\n\nOutput format:\nLine 1: Minimum total candies integer.',
  difficulty: Difficulty.Hard,
  topics: ['Greedy', 'Arrays', 'Dynamic Programming'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= ratings[i] <= 10^5'
  ],
  examples: [
    { input: '3\n1 0 2', output: '5' },
    { input: '3\n1 2 2', output: '4' }
  ],
  testCases: [
    { input: '3\n1 0 2', expectedOutput: '5', isHidden: false },
    { input: '3\n1 2 2', expectedOutput: '4', isHidden: false },
    { input: '1\n10', expectedOutput: '1', isHidden: false },
    { input: '5\n1 2 3 4 5', expectedOutput: '15', isHidden: true },
    { input: '5\n5 4 3 2 1', expectedOutput: '15', isHidden: true },
    { input: '4\n0 0 0 0', expectedOutput: '4', isHidden: true },
    { input: '5\n1 3 2 2 1', expectedOutput: '7', isHidden: true },
    { input: '6\n1 6 10 8 7 32', expectedOutput: '11', isHidden: true },
    { input: '4\n1 3 4 5', expectedOutput: '10', isHidden: true },
    { input: '5\n10 20 10 20 10', expectedOutput: '7', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> ratings(n);\n        for(int i = 0; i < n; i++) cin >> ratings[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    ratings = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] ratings = new long[n];\n        for (int i = 0; i < n; i++) ratings[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const ratings = [];\n    for (let i = 0; i < n; i++) ratings.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> r(n);\n        for (int i = 0; i < n; i++) cin >> r[i];\n        vector<long long> candies(n, 1);\n        for (int i = 1; i < n; i++) {\n            if (r[i] > r[i - 1]) candies[i] = candies[i - 1] + 1;\n        }\n        for (int i = n - 2; i >= 0; i--) {\n            if (r[i] > r[i + 1]) candies[i] = max(candies[i], candies[i + 1] + 1);\n        }\n        long long total = 0;\n        for (long long c : candies) total += c;\n        cout << total << "\\n";\n    }\n    return 0;\n}'
  }
};
