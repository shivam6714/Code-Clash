import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2HeapKthLargestElement: CodeClashProblemDefinition = {
  title: 'K-th Largest Element Finder',
  slug: 'codeclash-b2-heap-kth-largest-stream',
  description: 'Given an array of N integers and a 1-based rank K (1 <= K <= N), find the K-th largest element in the array.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: K-th largest integer.',
  difficulty: Difficulty.Easy,
  topics: ['Heap / Priority Queue', 'Sorting', 'Arrays'],
  constraints: [
    '1 <= K <= N <= 10^5',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '6 2\n3 2 1 5 6 4', output: '5' },
    { input: '9 4\n3 2 3 1 2 4 5 5 6', output: '4' }
  ],
  testCases: [
    { input: '6 2\n3 2 1 5 6 4', expectedOutput: '5', isHidden: false },
    { input: '9 4\n3 2 3 1 2 4 5 5 6', expectedOutput: '4', isHidden: false },
    { input: '1 1\n42', expectedOutput: '42', isHidden: false },
    { input: '5 1\n10 20 30 40 50', expectedOutput: '50', isHidden: true },
    { input: '5 5\n10 20 30 40 50', expectedOutput: '10', isHidden: true },
    { input: '4 2\n-1 -2 -3 -4', expectedOutput: '-2', isHidden: true },
    { input: '5 3\n0 0 0 0 0', expectedOutput: '0', isHidden: true },
    { input: '6 3\n1 2 3 4 5 6', expectedOutput: '4', isHidden: true },
    { input: '7 2\n-10 100 50 -50 0 200 -200', expectedOutput: '100', isHidden: true },
    { input: '5 4\n5 1 4 2 3', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        priority_queue<long long, vector<long long>, greater<long long>> minHeap;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            minHeap.push(val);\n            if ((int)minHeap.size() > k) minHeap.pop();\n        }\n        cout << minHeap.top() << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HeapKFrequentWordsSort: CodeClashProblemDefinition = {
  title: 'Top K Frequent Lexicographical Words',
  slug: 'codeclash-b2-heap-k-frequent-words-sort',
  description: 'Given an array of N words and an integer K, return the top K most frequent words. Sort the words by frequency descending, and if frequencies are equal, sort them alphabetically in ascending order.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated lowercase words\n\nOutput format:\nLine 1: K space-separated words.',
  difficulty: Difficulty.Medium,
  topics: ['Heap / Priority Queue', 'Hashing', 'Strings', 'Sorting'],
  constraints: [
    '1 <= K <= N <= 10^4',
    '1 <= |words[i]| <= 30',
    'words contain lowercase English letters'
  ],
  examples: [
    { input: '6 2\ni love codeclash i love coding', output: 'i love' },
    { input: '6 4\nthe day is sunny the the the sunny is is', output: 'the is sunny day' }
  ],
  testCases: [
    { input: '6 2\ni love codeclash i love coding', expectedOutput: 'i love', isHidden: false },
    { input: '6 4\nthe day is sunny the the the sunny is is', expectedOutput: 'the day is sunny', isHidden: false },
    { input: '1 1\na', expectedOutput: 'a', isHidden: false },
    { input: '4 2\na b c d', expectedOutput: 'a b', isHidden: true },
    { input: '5 3\na a a b b', expectedOutput: 'a b', isHidden: true },
    { input: '4 1\napple banana apple cherry', expectedOutput: 'apple', isHidden: true },
    { input: '6 3\ncat act cat act dog bird', expectedOutput: 'act cat bird', isHidden: true },
    { input: '5 2\nz y x w v', expectedOutput: 'v w', isHidden: true },
    { input: '6 2\nalpha beta alpha beta gamma delta', expectedOutput: 'alpha beta', isHidden: true },
    { input: '4 4\nfoo bar foo bar', expectedOutput: 'bar foo', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<string> words(n);\n        for(int i = 0; i < n; i++) cin >> words[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    words = lines[2:2+n]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        String[] words = new String[n];\n        for (int i = 0; i < n; i++) words[i] = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const words = [];\n    for (let i = 0; i < n; i++) words.push(input[2 + i]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        unordered_map<string, int> freq;\n        for (int i = 0; i < n; i++) {\n            string s;\n            cin >> s;\n            freq[s]++;\n        }\n        vector<pair<string, int>> vec(freq.begin(), freq.end());\n        sort(vec.begin(), vec.end(), [](const pair<string, int>& a, const pair<string, int>& b) {\n            if (a.second != b.second) return a.second > b.second;\n            return a.first < b.first;\n        });\n        int limit = min((int)vec.size(), k);\n        for (int i = 0; i < limit; i++) {\n            cout << vec[i].first << (i + 1 == limit ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HeapReorganizeStringNoAdjacentSame: CodeClashProblemDefinition = {
  title: 'Non-Adjacent Character Reorganization',
  slug: 'codeclash-b2-heap-reorganize-string-no-adjacent-same',
  description: 'Rearrange characters of a lowercase string S so that no two adjacent characters are identical. Return any valid reorganized string. If impossible, output an empty line.\n\nInput format:\nLine 1: string S\n\nOutput format:\nLine 1: Reorganized string or empty line.',
  difficulty: Difficulty.Medium,
  topics: ['Heap / Priority Queue', 'Greedy', 'Strings', 'Hashing'],
  constraints: [
    '1 <= |S| <= 10^5',
    'S contains lowercase English letters'
  ],
  examples: [
    { input: 'aab', output: 'aba' },
    { input: 'aaab', output: '' }
  ],
  testCases: [
    { input: 'aab', expectedOutput: 'aba', isHidden: false },
    { input: 'aaab', expectedOutput: '', isHidden: false },
    { input: 'a', expectedOutput: 'a', isHidden: false },
    { input: 'vvvlo', expectedOutput: 'vovlv', isHidden: true },
    { input: 'aabbcc', expectedOutput: 'cbacba', isHidden: true },
    { input: 'aaaaa', expectedOutput: '', isHidden: true },
    { input: 'abacaba', expectedOutput: 'abacaba', isHidden: true },
    { input: 'aabcc', expectedOutput: 'cacba', isHidden: true },
    { input: 'aaaaabbbb', expectedOutput: 'ababababa', isHidden: true },
    { input: 'zz', expectedOutput: '', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s: return\n    s = s.split()[0]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim();\n    if (!input) return;\n    const s = input.split(/\\s+/)[0];\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <queue>\nusing namespace std;\nint main() {\n    string s;\n    if (cin >> s) {\n        unordered_map<char, int> freq;\n        for (char c : s) freq[c]++;\n        priority_queue<pair<int, char>> pq;\n        for (auto p : freq) pq.push({p.second, p.first});\n        string res = "";\n        pair<int, char> prev = {-1, \'#\'};\n        while (!pq.empty()) {\n            auto curr = pq.top(); pq.pop();\n            res += curr.second;\n            if (prev.first > 0) pq.push(prev);\n            curr.first--;\n            prev = curr;\n        }\n        if ((int)res.length() != (int)s.length()) cout << "\\n";\n        else cout << res << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HeapMinCostConnectRopes: CodeClashProblemDefinition = {
  title: 'Minimal Rope Connection Cost',
  slug: 'codeclash-b2-heap-min-cost-connect-ropes',
  description: 'Given N ropes of various lengths, you need to connect all ropes into one rope. The cost to connect two ropes of lengths X and Y is X + Y. Find the minimum total cost to connect all N ropes.\n\nInput format:\nLine 1: N\nLine 2: N space-separated positive integers\n\nOutput format:\nLine 1: Minimum total cost integer.',
  difficulty: Difficulty.Medium,
  topics: ['Heap / Priority Queue', 'Greedy', 'Arrays'],
  constraints: [
    '1 <= N <= 10^5',
    '1 <= ropes[i] <= 10^4'
  ],
  examples: [
    { input: '4\n4 3 2 6', output: '29' },
    { input: '3\n1 2 3', output: '9' }
  ],
  testCases: [
    { input: '4\n4 3 2 6', expectedOutput: '29', isHidden: false },
    { input: '3\n1 2 3', expectedOutput: '9', isHidden: false },
    { input: '1\n5', expectedOutput: '0', isHidden: false },
    { input: '5\n1 2 3 4 5', expectedOutput: '33', isHidden: true },
    { input: '2\n100 200', expectedOutput: '300', isHidden: true },
    { input: '4\n1 1 1 1', expectedOutput: '8', isHidden: true },
    { input: '5\n10 10 10 10 10', expectedOutput: '120', isHidden: true },
    { input: '3\n5 10 20', expectedOutput: '50', isHidden: true },
    { input: '6\n2 2 3 3 4 4', expectedOutput: '46', isHidden: true },
    { input: '4\n8 4 6 12', expectedOutput: '58', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> ropes(n);\n        for(int i = 0; i < n; i++) cin >> ropes[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    ropes = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] ropes = new long[n];\n        for (int i = 0; i < n; i++) ropes[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const ropes = [];\n    for (let i = 0; i < n; i++) ropes.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        priority_queue<long long, vector<long long>, greater<long long>> minHeap;\n        for (int i = 0; i < n; i++) {\n            long long x;\n            cin >> x;\n            minHeap.push(x);\n        }\n        long long totalCost = 0;\n        while (minHeap.size() > 1) {\n            long long a = minHeap.top(); minHeap.pop();\n            long long b = minHeap.top(); minHeap.pop();\n            long long sum = a + b;\n            totalCost += sum;\n            minHeap.push(sum);\n        }\n        cout << totalCost << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2HeapRunningMedianStream: CodeClashProblemDefinition = {
  title: 'Continuous Stream Running Median',
  slug: 'codeclash-b2-heap-running-median-stream',
  description: 'Process a stream of N numbers. After reading each number, print the running median of all numbers seen so far. If the total count is even, print the average of the two middle elements formatted to 1 decimal place. Otherwise print the middle element.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: N space-separated values representing running medians.',
  difficulty: Difficulty.Hard,
  topics: ['Heap / Priority Queue', 'Design', 'Data Structures'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '4\n2 1 5 7', output: '2 1.5 2 3.5' },
    { input: '3\n1 2 3', output: '1 1.5 2' }
  ],
  testCases: [
    { input: '4\n2 1 5 7', expectedOutput: '2 1.5 2 3.5', isHidden: false },
    { input: '3\n1 2 3', expectedOutput: '1 1.5 2', isHidden: false },
    { input: '1\n10', expectedOutput: '10', isHidden: false },
    { input: '5\n5 15 1 3 28', expectedOutput: '5 10 5 4 5', isHidden: true },
    { input: '2\n10 20', expectedOutput: '10 15', isHidden: true },
    { input: '4\n0 0 0 0', expectedOutput: '0 0 0 0', isHidden: true },
    { input: '5\n-10 -20 -30 -40 -50', expectedOutput: '-10 -15 -20 -25 -30', isHidden: true },
    { input: '3\n100 50 200', expectedOutput: '100 75 100', isHidden: true },
    { input: '6\n6 5 4 3 2 1', expectedOutput: '6 5.5 5 4.5 4 3.5', isHidden: true },
    { input: '4\n1 3 2 4', expectedOutput: '1 2 2 2.5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\n#include <iomanip>\nusing namespace std;\n\nvoid printVal(double val) {\n    if (val == (long long)val) cout << (long long)val;\n    else cout << fixed << setprecision(1) << val;\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        priority_queue<long long> maxHeap;\n        priority_queue<long long, vector<long long>, greater<long long>> minHeap;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            if (maxHeap.empty() || val <= maxHeap.top()) {\n                maxHeap.push(val);\n            } else {\n                minHeap.push(val);\n            }\n            if (maxHeap.size() > minHeap.size() + 1) {\n                minHeap.push(maxHeap.top()); maxHeap.pop();\n            } else if (minHeap.size() > maxHeap.size()) {\n                maxHeap.push(minHeap.top()); minHeap.pop();\n            }\n            double med;\n            if (maxHeap.size() == minHeap.size()) {\n                med = (maxHeap.top() + minHeap.top()) / 2.0;\n            } else {\n                med = maxHeap.top();\n            }\n            printVal(med);\n            cout << (i + 1 == n ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};
