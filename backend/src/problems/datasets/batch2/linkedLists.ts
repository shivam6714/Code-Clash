import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2LinkedListMiddleNode: CodeClashProblemDefinition = {
  title: 'Singly Linked List Middle Element',
  slug: 'codeclash-b2-linkedlist-middle-node',
  description: 'Given the elements of a singly linked list of N node values, find the middle node value. If there are two middle nodes (N is even), return the second middle node.\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Single integer value of middle node.',
  difficulty: Difficulty.Easy,
  topics: ['Linked List', 'Two Pointers'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= nodes[i] <= 10^9'
  ],
  examples: [
    { input: '5\n1 2 3 4 5', output: '3' },
    { input: '6\n1 2 3 4 5 6', output: '4' }
  ],
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: '3', isHidden: false },
    { input: '6\n1 2 3 4 5 6', expectedOutput: '4', isHidden: false },
    { input: '1\n42', expectedOutput: '42', isHidden: false },
    { input: '2\n10 20', expectedOutput: '20', isHidden: true },
    { input: '3\n-5 0 5', expectedOutput: '0', isHidden: true },
    { input: '4\n1 1 1 1', expectedOutput: '1', isHidden: true },
    { input: '7\n1 2 3 4 5 6 7', expectedOutput: '4', isHidden: true },
    { input: '5\n100 200 300 400 500', expectedOutput: '300', isHidden: true },
    { input: '2\n-1 -2', expectedOutput: '-2', isHidden: true },
    { input: '6\n9 8 7 6 5 4', expectedOutput: '6', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nodes(n);\n        for(int i = 0; i < n; i++) cin >> nodes[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nodes = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nodes = new long[n];\n        for (int i = 0; i < n; i++) nodes[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nodes = [];\n    for (let i = 0; i < n; i++) nodes.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nodes(n);\n        for (int i = 0; i < n; i++) cin >> nodes[i];\n        int slow = 0, fast = 0;\n        while (fast < n && fast + 1 < n) {\n            slow += 1;\n            fast += 2;\n        }\n        cout << nodes[slow] << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2LinkedListPalindromeCheck: CodeClashProblemDefinition = {
  title: 'Linked List Palindrome Validator',
  slug: 'codeclash-b2-linkedlist-palindrome-check',
  description: 'Given the elements of a singly linked list of N node values, determine if the sequence of node values forms a palindrome. Output "YES" if palindromic, otherwise "NO".\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: "YES" or "NO".',
  difficulty: Difficulty.Easy,
  topics: ['Linked List', 'Two Pointers'],
  constraints: [
    '1 <= N <= 10^5',
    '-10^9 <= nodes[i] <= 10^9'
  ],
  examples: [
    { input: '4\n1 2 2 1', output: 'YES' },
    { input: '2\n1 2', output: 'NO' }
  ],
  testCases: [
    { input: '4\n1 2 2 1', expectedOutput: 'YES', isHidden: false },
    { input: '2\n1 2', expectedOutput: 'NO', isHidden: false },
    { input: '1\n100', expectedOutput: 'YES', isHidden: false },
    { input: '3\n1 2 1', expectedOutput: 'YES', isHidden: true },
    { input: '5\n1 2 3 2 1', expectedOutput: 'YES', isHidden: true },
    { input: '4\n-1 -2 -2 -1', expectedOutput: 'YES', isHidden: true },
    { input: '5\n1 2 3 4 5', expectedOutput: 'NO', isHidden: true },
    { input: '3\n0 0 0', expectedOutput: 'YES', isHidden: true },
    { input: '4\n10 20 20 15', expectedOutput: 'NO', isHidden: true },
    { input: '6\n1 2 3 3 2 1', expectedOutput: 'YES', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nodes(n);\n        for(int i = 0; i < n; i++) cin >> nodes[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nodes = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nodes = new long[n];\n        for (int i = 0; i < n; i++) nodes[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nodes = [];\n    for (let i = 0; i < n; i++) nodes.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nodes(n);\n        for (int i = 0; i < n; i++) cin >> nodes[i];\n        bool pal = true;\n        for (int i = 0; i < n / 2; i++) {\n            if (nodes[i] != nodes[n - 1 - i]) {\n                pal = false;\n                break;\n            }\n        }\n        cout << (pal ? "YES" : "NO") << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2LinkedListRemoveKthFromEnd: CodeClashProblemDefinition = {
  title: 'Remove K-th Node From End of List',
  slug: 'codeclash-b2-linkedlist-remove-kth-from-end',
  description: 'Given a singly linked list of N nodes and an integer K (1 <= K <= N), remove the K-th node from the end of the list and print the values of the modified list.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: Space-separated integers of the modified list (or empty line if list becomes empty).',
  difficulty: Difficulty.Medium,
  topics: ['Linked List', 'Two Pointers'],
  constraints: [
    '1 <= K <= N <= 10^5',
    '-10^9 <= nodes[i] <= 10^9'
  ],
  examples: [
    { input: '5 2\n1 2 3 4 5', output: '1 2 3 5' },
    { input: '1 1\n1', output: '' }
  ],
  testCases: [
    { input: '5 2\n1 2 3 4 5', expectedOutput: '1 2 3 5', isHidden: false },
    { input: '1 1\n1', expectedOutput: '', isHidden: false },
    { input: '2 1\n1 2', expectedOutput: '1', isHidden: false },
    { input: '2 2\n1 2', expectedOutput: '2', isHidden: true },
    { input: '4 4\n10 20 30 40', expectedOutput: '20 30 40', isHidden: true },
    { input: '4 1\n10 20 30 40', expectedOutput: '10 20 30', isHidden: true },
    { input: '3 2\n-1 -2 -3', expectedOutput: '-1 -3', isHidden: true },
    { input: '5 3\n5 4 3 2 1', expectedOutput: '5 4 2 1', isHidden: true },
    { input: '6 6\n1 2 3 4 5 6', expectedOutput: '2 3 4 5 6', isHidden: true },
    { input: '3 1\n100 200 300', expectedOutput: '100 200', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nodes(n);\n        for(int i = 0; i < n; i++) cin >> nodes[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nodes = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nodes = new long[n];\n        for (int i = 0; i < n; i++) nodes[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nodes = [];\n    for (let i = 0; i < n; i++) nodes.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nodes(n);\n        for (int i = 0; i < n; i++) cin >> nodes[i];\n        int targetIdx = n - k;\n        vector<long long> res;\n        for (int i = 0; i < n; i++) {\n            if (i != targetIdx) res.push_back(nodes[i]);\n        }\n        for (size_t i = 0; i < res.size(); i++) {\n            cout << res[i] << (i + 1 == res.size() ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2LinkedListRotateRightByK: CodeClashProblemDefinition = {
  title: 'Rotate Linked List Right K Positions',
  slug: 'codeclash-b2-linkedlist-rotate-right-by-k',
  description: 'Given a singly linked list of N nodes, right rotate the list by K places. Print the values of the rotated list.\n\nInput format:\nLine 1: N K\nLine 2: N space-separated integers\n\nOutput format:\nLine 1: N space-separated integers representing rotated list.',
  difficulty: Difficulty.Medium,
  topics: ['Linked List', 'Two Pointers'],
  constraints: [
    '1 <= N <= 10^5',
    '0 <= K <= 10^9',
    '-10^9 <= nodes[i] <= 10^9'
  ],
  examples: [
    { input: '5 2\n1 2 3 4 5', output: '4 5 1 2 3' },
    { input: '3 4\n0 1 2', output: '2 0 1' }
  ],
  testCases: [
    { input: '5 2\n1 2 3 4 5', expectedOutput: '4 5 1 2 3', isHidden: false },
    { input: '3 4\n0 1 2', expectedOutput: '2 0 1', isHidden: false },
    { input: '1 100\n42', expectedOutput: '42', isHidden: false },
    { input: '4 0\n10 20 30 40', expectedOutput: '10 20 30 40', isHidden: true },
    { input: '4 4\n1 2 3 4', expectedOutput: '1 2 3 4', isHidden: true },
    { input: '5 1\n1 2 3 4 5', expectedOutput: '5 1 2 3 4', isHidden: true },
    { input: '3 1000000000\n10 20 30', expectedOutput: '30 10 20', isHidden: true },
    { input: '4 2\n-1 -2 -3 -4', expectedOutput: '-3 -4 -1 -2', isHidden: true },
    { input: '5 3\n5 4 3 2 1', expectedOutput: '3 2 1 5 4', isHidden: true },
    { input: '6 2\n10 20 30 40 50 60', expectedOutput: '50 60 10 20 30 40', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long k;\n    if (cin >> n >> k) {\n        vector<long long> nodes(n);\n        for(int i = 0; i < n; i++) cin >> nodes[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    nodes = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long k = sc.nextLong();\n        long[] nodes = new long[n];\n        for (int i = 0; i < n; i++) nodes[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const k = parseInt(input[1]);\n    const nodes = [];\n    for (let i = 0; i < n; i++) nodes.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    long long k;\n    if (cin >> n >> k) {\n        vector<long long> nodes(n);\n        for (int i = 0; i < n; i++) cin >> nodes[i];\n        long long shift = k % n;\n        vector<long long> res(n);\n        for (int i = 0; i < n; i++) {\n            res[(i + shift) % n] = nodes[i];\n        }\n        for (int i = 0; i < n; i++) {\n            cout << res[i] << (i + 1 == n ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2LinkedListMergeKSortedLists: CodeClashProblemDefinition = {
  title: 'Merge K Sorted Linked Streams',
  slug: 'codeclash-b2-linkedlist-merge-k-sorted-lists',
  description: 'You are given K sorted linked lists. Merge all the K lists into one single sorted list and print the result.\n\nInput format:\nLine 1: K (number of sorted lists)\nNext K lines: M_i followed by M_i space-separated sorted integers (where M_i is the size of i-th list)\n\nOutput format:\nLine 1: Space-separated integers of merged sorted list.',
  difficulty: Difficulty.Hard,
  topics: ['Linked List', 'Heap / Priority Queue', 'Merge Sort'],
  constraints: [
    '1 <= K <= 500',
    '0 <= M_i <= 500',
    'Total elements N <= 10^5',
    '-10^9 <= val <= 10^9'
  ],
  examples: [
    { input: '3\n3 1 4 5\n3 1 3 4\n2 2 6', output: '1 1 2 3 4 4 5 6' },
    { input: '1\n2 1 2', output: '1 2' }
  ],
  testCases: [
    { input: '3\n3 1 4 5\n3 1 3 4\n2 2 6', expectedOutput: '1 1 2 3 4 4 5 6', isHidden: false },
    { input: '1\n2 1 2', expectedOutput: '1 2', isHidden: false },
    { input: '2\n0\n0', expectedOutput: '', isHidden: false },
    { input: '3\n1 10\n1 5\n1 1', expectedOutput: '1 5 10', isHidden: true },
    { input: '2\n3 1 2 3\n3 4 5 6', expectedOutput: '1 2 3 4 5 6', isHidden: true },
    { input: '3\n2 -5 0\n2 -10 10\n2 -20 20', expectedOutput: '-20 -10 -5 0 10 20', isHidden: true },
    { input: '4\n1 100\n1 200\n1 300\n1 400', expectedOutput: '100 200 300 400', isHidden: true },
    { input: '2\n4 1 1 1 1\n2 2 2', expectedOutput: '1 1 1 1 2 2', isHidden: true },
    { input: '3\n1 0\n0\n1 0', expectedOutput: '0 0', isHidden: true },
    { input: '3\n3 10 20 30\n3 15 25 35\n3 5 12 28', expectedOutput: '5 10 12 15 20 25 28 30 35', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int k;\n    if (cin >> k) {\n        // Read K lists and write your solution\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    k = int(lines[0])\n    # Read K lists and write your solution\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int k = sc.nextInt();\n        // Read K lists and write your solution\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const k = parseInt(input[0]);\n    // Read K lists and write your solution\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int k;\n    if (cin >> k) {\n        priority_queue<long long, vector<long long>, greater<long long>> pq;\n        for (int i = 0; i < k; i++) {\n            int m;\n            cin >> m;\n            for (int j = 0; j < m; j++) {\n                long long val;\n                cin >> val;\n                pq.push(val);\n            }\n        }\n        bool first = true;\n        while (!pq.empty()) {\n            if (!first) cout << " ";\n            cout << pq.top();\n            pq.pop();\n            first = false;\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};
