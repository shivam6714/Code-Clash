import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2IntervalsOverlapPairCount: CodeClashProblemDefinition = {
  title: 'Overlapping Interval Pair Counter',
  slug: 'codeclash-b2-intervals-overlap-count',
  description: 'Given N intervals where each interval is represented by [start, end] (start <= end), count the number of pairs of intervals (i, j) with 0 <= i < j < N that overlap (i.e. max(start_i, start_j) <= min(end_i, end_j)).\n\nInput format:\nLine 1: N\nNext N lines: start end\n\nOutput format:\nLine 1: Total count of overlapping pairs integer.',
  difficulty: Difficulty.Easy,
  topics: ['Intervals', 'Arrays', 'Sorting'],
  constraints: [
    '1 <= N <= 2000',
    '-10^9 <= start <= end <= 10^9'
  ],
  examples: [
    { input: '3\n1 3\n2 6\n8 10', output: '1' },
    { input: '3\n1 4\n2 5\n3 6', output: '3' }
  ],
  testCases: [
    { input: '3\n1 3\n2 6\n8 10', expectedOutput: '1', isHidden: false },
    { input: '3\n1 4\n2 5\n3 6', expectedOutput: '3', isHidden: false },
    { input: '1\n1 10', expectedOutput: '0', isHidden: false },
    { input: '4\n1 2\n3 4\n5 6\n7 8', expectedOutput: '0', isHidden: true },
    { input: '3\n1 5\n5 10\n10 15', expectedOutput: '2', isHidden: true },
    { input: '4\n1 10\n2 3\n4 5\n6 7', expectedOutput: '3', isHidden: true },
    { input: '2\n0 5\n0 5', expectedOutput: '1', isHidden: true },
    { input: '5\n1 2\n1 2\n1 2\n1 2\n1 2', expectedOutput: '10', isHidden: true },
    { input: '3\n-10 0\n-5 5\n0 10', expectedOutput: '3', isHidden: true },
    { input: '4\n1 3\n2 4\n5 7\n6 8', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<long long, long long>> intervals(n);\n        for(int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    idx = 1\n    intervals = []\n    for _ in range(n):\n        intervals.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[][] intervals = new long[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextLong();\n            intervals[i][1] = sc.nextLong();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    let idx = 1;\n    const intervals = [];\n    for (let i = 0; i < n; i++) {\n        intervals.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<long long, long long>> iv(n);\n        for (int i = 0; i < n; i++) cin >> iv[i].first >> iv[i].second;\n        long long count = 0;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (max(iv[i].first, iv[j].first) <= min(iv[i].second, iv[j].second)) {\n                    count++;\n                }\n            }\n        }\n        cout << count << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2IntervalsMergeOverlapping: CodeClashProblemDefinition = {
  title: 'Merge Overlapping Interval Sets',
  slug: 'codeclash-b2-intervals-merge-overlapping',
  description: 'Given N intervals [start, end], merge all overlapping intervals and print the resulting non-overlapping intervals sorted by start time.\n\nInput format:\nLine 1: N\nNext N lines: start end\n\nOutput format:\nLine 1: Number of merged intervals M\nNext M lines: start end',
  difficulty: Difficulty.Medium,
  topics: ['Intervals', 'Sorting', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= start <= end <= 10^9'
  ],
  examples: [
    { input: '4\n1 3\n2 6\n8 10\n15 18', output: '3\n1 6\n8 10\n15 18' },
    { input: '2\n1 4\n4 5', output: '1\n1 5' }
  ],
  testCases: [
    { input: '4\n1 3\n2 6\n8 10\n15 18', expectedOutput: '3\n1 6\n8 10\n15 18', isHidden: false },
    { input: '2\n1 4\n4 5', expectedOutput: '1\n1 5', isHidden: false },
    { input: '1\n5 10', expectedOutput: '1\n5 10', isHidden: false },
    { input: '3\n1 10\n2 5\n3 4', expectedOutput: '1\n1 10', isHidden: true },
    { input: '3\n1 2\n3 4\n5 6', expectedOutput: '3\n1 2\n3 4\n5 6', isHidden: true },
    { input: '4\n1 4\n2 3\n5 8\n6 7', expectedOutput: '2\n1 4\n5 8', isHidden: true },
    { input: '3\n-10 -5\n-6 0\n0 5', expectedOutput: '1\n-10 5', isHidden: true },
    { input: '5\n1 2\n1 2\n1 2\n1 2\n1 2', expectedOutput: '1\n1 2', isHidden: true },
    { input: '2\n0 0\n0 0', expectedOutput: '1\n0 0', isHidden: true },
    { input: '4\n1 5\n6 10\n2 7\n12 15', expectedOutput: '2\n1 10\n12 15', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<long long, long long>> intervals(n);\n        for(int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    idx = 1\n    intervals = []\n    for _ in range(n):\n        intervals.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[][] intervals = new long[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextLong();\n            intervals[i][1] = sc.nextLong();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    let idx = 1;\n    const intervals = [];\n    for (let i = 0; i < n; i++) {\n        intervals.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<long long, long long>> iv(n);\n        for (int i = 0; i < n; i++) cin >> iv[i].first >> iv[i].second;\n        sort(iv.begin(), iv.end());\n        vector<pair<long long, long long>> res;\n        for (auto curr : iv) {\n            if (res.empty() || res.back().second < curr.first) {\n                res.push_back(curr);\n            } else {\n                res.back().second = max(res.back().second, curr.second);\n            }\n        }\n        cout << res.size() << "\\n";\n        for (auto p : res) {\n            cout << p.first << " " << p.second << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2IntervalsInsertNewInterval: CodeClashProblemDefinition = {
  title: 'Insert Interval into Non-Overlapping Set',
  slug: 'codeclash-b2-intervals-insert-new-interval',
  description: 'Given a set of non-overlapping intervals sorted by start time and a new interval [newStart, newEnd], insert newInterval into the set (merging if necessary). Print the resulting non-overlapping intervals.\n\nInput format:\nLine 1: N newStart newEnd\nNext N lines: start end\n\nOutput format:\nLine 1: Number of intervals M\nNext M lines: start end',
  difficulty: Difficulty.Medium,
  topics: ['Intervals', 'Arrays'],
  constraints: [
    '0 <= N <= 10^5',
    '-10^9 <= start <= end <= 10^9'
  ],
  examples: [
    { input: '2 2 5\n1 3\n6 9', output: '2\n1 5\n6 9' },
    { input: '5 4 8\n1 2\n3 5\n6 7\n8 10\n12 16', output: '3\n1 2\n3 10\n12 16' }
  ],
  testCases: [
    { input: '2 2 5\n1 3\n6 9', expectedOutput: '2\n1 5\n6 9', isHidden: false },
    { input: '5 4 8\n1 2\n3 5\n6 7\n8 10\n12 16', expectedOutput: '3\n1 2\n3 10\n12 16', isHidden: false },
    { input: '0 5 7\n', expectedOutput: '1\n5 7', isHidden: false },
    { input: '1 0 0\n1 5', expectedOutput: '2\n0 0\n1 5', isHidden: true },
    { input: '1 6 8\n1 5', expectedOutput: '2\n1 5\n6 8', isHidden: true },
    { input: '2 1 10\n2 3\n4 5', expectedOutput: '1\n1 10', isHidden: true },
    { input: '3 2 4\n1 2\n3 5\n6 7', expectedOutput: '2\n1 5\n6 7', isHidden: true },
    { input: '2 3 6\n1 2\n7 8', expectedOutput: '3\n1 2\n3 6\n7 8', isHidden: true },
    { input: '1 2 3\n2 3', expectedOutput: '1\n2 3', isHidden: true },
    { input: '3 -5 0\n1 2\n3 4\n5 6', expectedOutput: '4\n-5 0\n1 2\n3 4\n5 6', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long ns, ne;\n    if (cin >> n >> ns >> ne) {\n        vector<pair<long long, long long>> intervals(n);\n        for(int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, ns, ne = int(lines[0]), int(lines[1]), int(lines[2])\n    idx = 3\n    intervals = []\n    for _ in range(n):\n        intervals.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long ns = sc.nextLong(), ne = sc.nextLong();\n        long[][] intervals = new long[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextLong();\n            intervals[i][1] = sc.nextLong();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const ns = parseInt(input[1]);\n    const ne = parseInt(input[2]);\n    let idx = 3;\n    const intervals = [];\n    for (let i = 0; i < n; i++) {\n        intervals.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    long long ns, ne;\n    if (cin >> n >> ns >> ne) {\n        vector<pair<long long, long long>> iv(n);\n        for (int i = 0; i < n; i++) cin >> iv[i].first >> iv[i].second;\n        vector<pair<long long, long long>> res;\n        int i = 0;\n        while (i < n && iv[i].second < ns) {\n            res.push_back(iv[i]);\n            i++;\n        }\n        while (i < n && iv[i].first <= ne) {\n            ns = min(ns, iv[i].first);\n            ne = max(ne, iv[i].second);\n            i++;\n        }\n        res.push_back({ns, ne});\n        while (i < n) {\n            res.push_back(iv[i]);\n            i++;\n        }\n        cout << res.size() << "\\n";\n        for (auto p : res) cout << p.first << " " << p.second << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2IntervalsMinMeetingRooms: CodeClashProblemDefinition = {
  title: 'Minimum Meeting Rooms Required',
  slug: 'codeclash-b2-intervals-min-meeting-rooms',
  description: 'Given N meeting time intervals [start, end], find the minimum number of conference rooms required so that all meetings can take place without overlap.\n\nInput format:\nLine 1: N\nNext N lines: start end\n\nOutput format:\nLine 1: Minimum rooms integer.',
  difficulty: Difficulty.Medium,
  topics: ['Intervals', 'Heap / Priority Queue', 'Greedy', 'Sorting'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= start < end <= 10^9'
  ],
  examples: [
    { input: '3\n0 30\n5 10\n15 20', output: '2' },
    { input: '2\n7 10\n2 4', output: '1' }
  ],
  testCases: [
    { input: '3\n0 30\n5 10\n15 20', expectedOutput: '2', isHidden: false },
    { input: '2\n7 10\n2 4', expectedOutput: '1', isHidden: false },
    { input: '1\n0 10', expectedOutput: '1', isHidden: false },
    { input: '3\n1 5\n5 10\n10 15', expectedOutput: '1', isHidden: true },
    { input: '4\n1 10\n2 10\n3 10\n4 10', expectedOutput: '4', isHidden: true },
    { input: '3\n1 4\n2 5\n3 6', expectedOutput: '3', isHidden: true },
    { input: '5\n1 2\n1 2\n1 2\n1 2\n1 2', expectedOutput: '5', isHidden: true },
    { input: '4\n1 3\n3 5\n5 7\n7 9', expectedOutput: '1', isHidden: true },
    { input: '3\n1 10\n2 5\n6 9', expectedOutput: '2', isHidden: true },
    { input: '4\n0 5\n1 4\n2 3\n3 6', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<long long, long long>> intervals(n);\n        for(int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    idx = 1\n    intervals = []\n    for _ in range(n):\n        intervals.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[][] intervals = new long[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextLong();\n            intervals[i][1] = sc.nextLong();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    let idx = 1;\n    const intervals = [];\n    for (let i = 0; i < n; i++) {\n        intervals.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<long long, long long>> iv(n);\n        for (int i = 0; i < n; i++) cin >> iv[i].first >> iv[i].second;\n        sort(iv.begin(), iv.end());\n        priority_queue<long long, vector<long long>, greater<long long>> pq;\n        for (auto p : iv) {\n            if (!pq.empty() && pq.top() <= p.first) {\n                pq.pop();\n            }\n            pq.push(p.second);\n        }\n        cout << pq.size() << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2IntervalsMinRemovalsNonOverlapping: CodeClashProblemDefinition = {
  title: 'Non-Overlapping Intervals Minimum Deletions',
  slug: 'codeclash-b2-intervals-min-removals-non-overlapping',
  description: 'Given N intervals [start, end], find the minimum number of intervals you need to remove to make the remaining intervals non-overlapping.\n\nInput format:\nLine 1: N\nNext N lines: start end\n\nOutput format:\nLine 1: Minimum removals integer.',
  difficulty: Difficulty.Hard,
  topics: ['Intervals', 'Greedy', 'Sorting'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= start < end <= 10^9'
  ],
  examples: [
    { input: '4\n1 2\n2 3\n3 4\n1 3', output: '1' },
    { input: '3\n1 2\n1 2\n1 2', output: '2' }
  ],
  testCases: [
    { input: '4\n1 2\n2 3\n3 4\n1 3', expectedOutput: '1', isHidden: false },
    { input: '3\n1 2\n1 2\n1 2', expectedOutput: '2', isHidden: false },
    { input: '3\n1 2\n2 3\n3 4', expectedOutput: '0', isHidden: false },
    { input: '1\n10 20', expectedOutput: '0', isHidden: true },
    { input: '4\n1 10\n2 3\n4 5\n6 7', expectedOutput: '1', isHidden: true },
    { input: '5\n1 10\n2 4\n3 5\n6 8\n7 9', expectedOutput: '3', isHidden: true },
    { input: '3\n-10 0\n-5 5\n0 10', expectedOutput: '1', isHidden: true },
    { input: '4\n1 5\n2 4\n3 6\n5 7', expectedOutput: '2', isHidden: true },
    { input: '2\n1 100\n50 60', expectedOutput: '1', isHidden: true },
    { input: '4\n1 2\n1 3\n1 4\n1 5', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<long long, long long>> intervals(n);\n        for(int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    idx = 1\n    intervals = []\n    for _ in range(n):\n        intervals.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[][] intervals = new long[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextLong();\n            intervals[i][1] = sc.nextLong();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    let idx = 1;\n    const intervals = [];\n    for (let i = 0; i < n; i++) {\n        intervals.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<long long, long long>> iv(n);\n        for (int i = 0; i < n; i++) cin >> iv[i].first >> iv[i].second;\n        sort(iv.begin(), iv.end(), [](const pair<long long, long long>& a, const pair<long long, long long>& b) {\n            return a.second < b.second;\n        });\n        int count = 0;\n        long long lastEnd = -1e18;\n        for (auto p : iv) {\n            if (p.first >= lastEnd) {\n                lastEnd = p.second;\n            } else {\n                count++;\n            }\n        }\n        cout << count << "\\n";\n    }\n    return 0;\n}'
  }
};
