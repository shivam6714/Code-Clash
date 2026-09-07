import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2TreeMaxDepth: CodeClashProblemDefinition = {
  title: 'Binary Tree Maximum Depth',
  slug: 'codeclash-b2-tree-max-depth',
  description: 'Given a binary tree represented as an array in level-order traversal (where -1 represents a NULL node), calculate its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node. Return 0 for an empty tree.\n\nInput format:\nLine 1: N (number of elements in level-order array)\nLine 2: N space-separated integers (-1 for NULL)\n\nOutput format:\nLine 1: Maximum depth integer.',
  difficulty: Difficulty.Easy,
  topics: ['Trees', 'BFS', 'DFS'],
  constraints: [
    '0 <= N <= 10^5',
    '-1 <= nodes[i] <= 10^4'
  ],
  examples: [
    { input: '7\n3 9 20 -1 -1 15 7', output: '3' },
    { input: '2\n1 2', output: '2' }
  ],
  testCases: [
    { input: '7\n3 9 20 -1 -1 15 7', expectedOutput: '3', isHidden: false },
    { input: '2\n1 2', expectedOutput: '2', isHidden: false },
    { input: '1\n10', expectedOutput: '1', isHidden: false },
    { input: '0\n', expectedOutput: '0', isHidden: true },
    { input: '3\n1 -1 -1', expectedOutput: '1', isHidden: true },
    { input: '7\n1 2 3 4 5 6 7', expectedOutput: '3', isHidden: true },
    { input: '5\n1 2 -1 3 -1', expectedOutput: '3', isHidden: true },
    { input: '7\n10 -1 20 -1 30 -1 40', expectedOutput: '4', isHidden: true },
    { input: '3\n1 2 3', expectedOutput: '2', isHidden: true },
    { input: '6\n5 3 8 1 4 -1', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> tree(n);\n        for(int i = 0; i < n; i++) cin >> tree[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    tree = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] tree = new int[n];\n        for (int i = 0; i < n; i++) tree[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const tree = [];\n    for (let i = 0; i < n; i++) tree.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left = nullptr;\n    TreeNode* right = nullptr;\n    TreeNode(int v) : val(v) {}\n};\n\nTreeNode* buildTree(const vector<int>& arr) {\n    if (arr.empty() || arr[0] == -1) return nullptr;\n    TreeNode* root = new TreeNode(arr[0]);\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (!q.empty() && i < (int)arr.size()) {\n        TreeNode* curr = q.front(); q.pop();\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->left = new TreeNode(arr[i]);\n            q.push(curr->left);\n        }\n        i++;\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->right = new TreeNode(arr[i]);\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nint maxDepth(TreeNode* root) {\n    if (!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> tree(n);\n        for (int i = 0; i < n; i++) cin >> tree[i];\n        TreeNode* root = buildTree(tree);\n        cout << maxDepth(root) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TreeLeafNodesCount: CodeClashProblemDefinition = {
  title: 'Binary Tree Leaf Node Counter',
  slug: 'codeclash-b2-tree-leaf-nodes-count',
  description: 'Given a binary tree represented as an array in level-order traversal (-1 for NULL), count the number of leaf nodes (nodes with no left and no right child).\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers (-1 for NULL)\n\nOutput format:\nLine 1: Single integer leaf count.',
  difficulty: Difficulty.Easy,
  topics: ['Trees', 'DFS', 'BFS'],
  constraints: [
    '0 <= N <= 10^5',
    '-1 <= nodes[i] <= 10^4'
  ],
  examples: [
    { input: '7\n1 2 3 4 5 -1 6', output: '3' },
    { input: '3\n1 2 3', output: '2' }
  ],
  testCases: [
    { input: '7\n1 2 3 4 5 -1 6', expectedOutput: '3', isHidden: false },
    { input: '3\n1 2 3', expectedOutput: '2', isHidden: false },
    { input: '1\n10', expectedOutput: '1', isHidden: false },
    { input: '0\n', expectedOutput: '0', isHidden: true },
    { input: '5\n1 2 -1 3 -1', expectedOutput: '1', isHidden: true },
    { input: '7\n1 2 3 4 5 6 7', expectedOutput: '4', isHidden: true },
    { input: '3\n1 -1 -1', expectedOutput: '1', isHidden: true },
    { input: '6\n5 3 8 1 4 -1', expectedOutput: '3', isHidden: true },
    { input: '7\n10 -1 20 -1 30 -1 40', expectedOutput: '1', isHidden: true },
    { input: '5\n10 5 15 -1 -1', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> tree(n);\n        for(int i = 0; i < n; i++) cin >> tree[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    tree = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] tree = new int[n];\n        for (int i = 0; i < n; i++) tree[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const tree = [];\n    for (let i = 0; i < n; i++) tree.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left = nullptr;\n    TreeNode* right = nullptr;\n    TreeNode(int v) : val(v) {}\n};\n\nTreeNode* buildTree(const vector<int>& arr) {\n    if (arr.empty() || arr[0] == -1) return nullptr;\n    TreeNode* root = new TreeNode(arr[0]);\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (!q.empty() && i < (int)arr.size()) {\n        TreeNode* curr = q.front(); q.pop();\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->left = new TreeNode(arr[i]);\n            q.push(curr->left);\n        }\n        i++;\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->right = new TreeNode(arr[i]);\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nint countLeaves(TreeNode* root) {\n    if (!root) return 0;\n    if (!root->left && !root->right) return 1;\n    return countLeaves(root->left) + countLeaves(root->right);\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> tree(n);\n        for (int i = 0; i < n; i++) cin >> tree[i];\n        TreeNode* root = buildTree(tree);\n        cout << countLeaves(root) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TreeZigzagLevelOrder: CodeClashProblemDefinition = {
  title: 'Binary Tree Zig-Zag Level Order Traversal',
  slug: 'codeclash-b2-tree-zigzag-level-order',
  description: 'Given a binary tree represented as an array in level-order traversal (-1 for NULL), return its level order traversal in zig-zag order (i.e. left to right for level 1, right to left for level 2, left to right for level 3, and so on).\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers (-1 for NULL)\n\nOutput format:\nLine 1: Space-separated node values in zig-zag order.',
  difficulty: Difficulty.Medium,
  topics: ['Trees', 'BFS', 'Queue'],
  constraints: [
    '0 <= N <= 10^5',
    '-1 <= nodes[i] <= 10^4'
  ],
  examples: [
    { input: '7\n3 9 20 -1 -1 15 7', output: '3 20 9 15 7' },
    { input: '3\n1 2 3', output: '1 3 2' }
  ],
  testCases: [
    { input: '7\n3 9 20 -1 -1 15 7', expectedOutput: '3 20 9 15 7', isHidden: false },
    { input: '3\n1 2 3', expectedOutput: '1 3 2', isHidden: false },
    { input: '1\n10', expectedOutput: '10', isHidden: false },
    { input: '0\n', expectedOutput: '', isHidden: true },
    { input: '7\n1 2 3 4 5 6 7', expectedOutput: '1 3 2 4 5 6 7', isHidden: true },
    { input: '5\n1 2 3 4 -1', expectedOutput: '1 3 2 4', isHidden: true },
    { input: '6\n10 20 30 -1 40 50', expectedOutput: '10 30 20 40 50', isHidden: true },
    { input: '4\n1 2 -1 3', expectedOutput: '1 2 3', isHidden: true },
    { input: '5\n5 4 3 2 1', expectedOutput: '5 3 4 2 1', isHidden: true },
    { input: '7\n100 200 300 400 500 600 700', expectedOutput: '100 300 200 400 500 600 700', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> tree(n);\n        for(int i = 0; i < n; i++) cin >> tree[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    tree = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] tree = new int[n];\n        for (int i = 0; i < n; i++) tree[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const tree = [];\n    for (let i = 0; i < n; i++) tree.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left = nullptr;\n    TreeNode* right = nullptr;\n    TreeNode(int v) : val(v) {}\n};\n\nTreeNode* buildTree(const vector<int>& arr) {\n    if (arr.empty() || arr[0] == -1) return nullptr;\n    TreeNode* root = new TreeNode(arr[0]);\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (!q.empty() && i < (int)arr.size()) {\n        TreeNode* curr = q.front(); q.pop();\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->left = new TreeNode(arr[i]);\n            q.push(curr->left);\n        }\n        i++;\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->right = new TreeNode(arr[i]);\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> tree(n);\n        for (int i = 0; i < n; i++) cin >> tree[i];\n        TreeNode* root = buildTree(tree);\n        if (!root) return 0;\n        queue<TreeNode*> q;\n        q.push(root);\n        bool leftToRight = true;\n        vector<int> res;\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> level(sz);\n            for (int i = 0; i < sz; i++) {\n                TreeNode* node = q.front(); q.pop();\n                int idx = leftToRight ? i : (sz - 1 - i);\n                level[idx] = node->val;\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n            res.insert(res.end(), level.begin(), level.end());\n            leftToRight = !leftToRight;\n        }\n        for (size_t i = 0; i < res.size(); i++) {\n            cout << res[i] << (i + 1 == res.size() ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TreeLowestCommonAncestor: CodeClashProblemDefinition = {
  title: 'Binary Tree Lowest Common Ancestor',
  slug: 'codeclash-b2-tree-lowest-common-ancestor',
  description: 'Given a binary tree represented as an array in level-order traversal (-1 for NULL) and two distinct target node values P and Q present in the tree, find the value of their Lowest Common Ancestor (LCA).\n\nInput format:\nLine 1: N P Q\nLine 2: N space-separated integers (-1 for NULL)\n\nOutput format:\nLine 1: Single integer value of LCA.',
  difficulty: Difficulty.Medium,
  topics: ['Trees', 'DFS', 'Recursion'],
  constraints: [
    '2 <= N <= 10^5',
    'P != Q',
    'All node values are distinct (except -1)'
  ],
  examples: [
    { input: '7 5 1\n3 5 1 6 2 0 8', output: '3' },
    { input: '7 5 4\n3 5 1 6 2 0 8', output: '5' }
  ],
  testCases: [
    { input: '7 5 1\n3 5 1 6 2 0 8', expectedOutput: '3', isHidden: false },
    { input: '7 5 4\n3 5 1 6 2 0 8', expectedOutput: '5', isHidden: false },
    { input: '3 2 3\n1 2 3', expectedOutput: '1', isHidden: false },
    { input: '7 6 2\n3 5 1 6 2 0 8', expectedOutput: '5', isHidden: true },
    { input: '7 0 8\n3 5 1 6 2 0 8', expectedOutput: '1', isHidden: true },
    { input: '5 4 5\n1 2 3 4 5', expectedOutput: '2', isHidden: true },
    { input: '7 4 7\n1 2 3 4 5 6 7', expectedOutput: '1', isHidden: true },
    { input: '5 3 2\n1 2 -1 3 -1', expectedOutput: '2', isHidden: true },
    { input: '3 10 20\n10 20 -1', expectedOutput: '10', isHidden: true },
    { input: '7 6 7\n1 2 3 4 5 6 7', expectedOutput: '3', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, p, q;\n    if (cin >> n >> p >> q) {\n        vector<int> tree(n);\n        for(int i = 0; i < n; i++) cin >> tree[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, p, q = int(lines[0]), int(lines[1]), int(lines[2])\n    tree = [int(x) for x in lines[3:3+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int p = sc.nextInt();\n        int q = sc.nextInt();\n        int[] tree = new int[n];\n        for (int i = 0; i < n; i++) tree[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const p = parseInt(input[1]);\n    const q = parseInt(input[2]);\n    const tree = [];\n    for (let i = 0; i < n; i++) tree.push(parseInt(input[3 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left = nullptr;\n    TreeNode* right = nullptr;\n    TreeNode(int v) : val(v) {}\n};\n\nTreeNode* buildTree(const vector<int>& arr) {\n    if (arr.empty() || arr[0] == -1) return nullptr;\n    TreeNode* root = new TreeNode(arr[0]);\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (!q.empty() && i < (int)arr.size()) {\n        TreeNode* curr = q.front(); q.pop();\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->left = new TreeNode(arr[i]);\n            q.push(curr->left);\n        }\n        i++;\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->right = new TreeNode(arr[i]);\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nTreeNode* lca(TreeNode* root, int p, int q) {\n    if (!root || root->val == p || root->val == q) return root;\n    TreeNode* left = lca(root->left, p, q);\n    TreeNode* right = lca(root->right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n}\n\nint main() {\n    int n, p, q;\n    if (cin >> n >> p >> q) {\n        vector<int> tree(n);\n        for (int i = 0; i < n; i++) cin >> tree[i];\n        TreeNode* root = buildTree(tree);\n        TreeNode* ans = lca(root, p, q);\n        cout << (ans ? ans->val : -1) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TreePathSumTarget: CodeClashProblemDefinition = {
  title: 'Root-to-Leaf Path Target Sum Count',
  slug: 'codeclash-b2-tree-path-sum-target',
  description: 'Given a binary tree represented in level-order array (-1 for NULL) and a target integer S, count the number of root-to-leaf paths where the sum of node values along the path equals S.\n\nInput format:\nLine 1: N S\nLine 2: N space-separated integers (-1 for NULL)\n\nOutput format:\nLine 1: Single integer count of valid paths.',
  difficulty: Difficulty.Medium,
  topics: ['Trees', 'DFS', 'Backtracking'],
  constraints: [
    '0 <= N <= 10^5',
    '-10^9 <= S <= 10^9',
    '-10^4 <= nodes[i] <= 10^4'
  ],
  examples: [
    { input: '7 22\n5 4 8 11 -1 13 4', output: '0' },
    { input: '3 5\n1 2 3', output: '0' }
  ],
  testCases: [
    { input: '7 22\n5 4 8 11 -1 13 4', expectedOutput: '0', isHidden: false },
    { input: '3 5\n1 2 3', expectedOutput: '0', isHidden: false },
    { input: '1 10\n10', expectedOutput: '1', isHidden: false },
    { input: '0 0\n', expectedOutput: '0', isHidden: true },
    { input: '3 3\n1 2 2', expectedOutput: '2', isHidden: true },
    { input: '7 18\n10 5 15 3 3 -1 3', expectedOutput: '2', isHidden: true },
    { input: '5 0\n1 -2 3 -1 -1', expectedOutput: '0', isHidden: true },
    { input: '7 7\n1 2 3 4 5 6 7', expectedOutput: '1', isHidden: true },
    { input: '3 -5\n-2 -3 -1', expectedOutput: '1', isHidden: true },
    { input: '6 10\n5 2 3 3 1 -1', expectedOutput: '1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long s;\n    if (cin >> n >> s) {\n        vector<int> tree(n);\n        for(int i = 0; i < n; i++) cin >> tree[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, s = int(lines[0]), int(lines[1])\n    tree = [int(x) for x in lines[2:2+n]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long s = sc.nextLong();\n        int[] tree = new int[n];\n        for (int i = 0; i < n; i++) tree[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const s = parseInt(input[1]);\n    const tree = [];\n    for (let i = 0; i < n; i++) tree.push(parseInt(input[2 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    long long val;\n    TreeNode* left = nullptr;\n    TreeNode* right = nullptr;\n    TreeNode(long long v) : val(v) {}\n};\n\nTreeNode* buildTree(const vector<int>& arr) {\n    if (arr.empty() || arr[0] == -1) return nullptr;\n    TreeNode* root = new TreeNode(arr[0]);\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (!q.empty() && i < (int)arr.size()) {\n        TreeNode* curr = q.front(); q.pop();\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->left = new TreeNode(arr[i]);\n            q.push(curr->left);\n        }\n        i++;\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->right = new TreeNode(arr[i]);\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nint countPaths(TreeNode* root, long long currSum, long long target) {\n    if (!root) return 0;\n    currSum += root->val;\n    if (!root->left && !root->right) {\n        return currSum == target ? 1 : 0;\n    }\n    return countPaths(root->left, currSum, target) + countPaths(root->right, currSum, target);\n}\n\nint main() {\n    int n;\n    long long s;\n    if (cin >> n >> s) {\n        vector<int> tree(n);\n        for (int i = 0; i < n; i++) cin >> tree[i];\n        TreeNode* root = buildTree(tree);\n        cout << countPaths(root, 0, s) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2TreeDiameter: CodeClashProblemDefinition = {
  title: 'Binary Tree Diameter Measurement',
  slug: 'codeclash-b2-tree-serialize-deserialize-validation',
  description: 'Given a binary tree represented as an array in level-order traversal (-1 for NULL), compute its diameter. The diameter of a binary tree is the length of the longest path between any two nodes in the tree (measured by the number of edges between them).\n\nInput format:\nLine 1: N\nLine 2: N space-separated integers (-1 for NULL)\n\nOutput format:\nLine 1: Diameter integer.',
  difficulty: Difficulty.Hard,
  topics: ['Trees', 'DFS', 'Recursion'],
  constraints: [
    '0 <= N <= 10^5',
    '-1 <= nodes[i] <= 10^4'
  ],
  examples: [
    { input: '7\n1 2 3 4 5 -1 -1', output: '3' },
    { input: '2\n1 2', output: '1' }
  ],
  testCases: [
    { input: '7\n1 2 3 4 5 -1 -1', expectedOutput: '3', isHidden: false },
    { input: '2\n1 2', expectedOutput: '1', isHidden: false },
    { input: '1\n10', expectedOutput: '0', isHidden: false },
    { input: '0\n', expectedOutput: '0', isHidden: true },
    { input: '3\n1 2 3', expectedOutput: '2', isHidden: true },
    { input: '7\n1 2 3 4 5 6 7', expectedOutput: '4', isHidden: true },
    { input: '5\n1 2 -1 3 -1', expectedOutput: '2', isHidden: true },
    { input: '7\n10 -1 20 -1 30 -1 40', expectedOutput: '3', isHidden: true },
    { input: '6\n1 2 3 -1 4 5', expectedOutput: '4', isHidden: true },
    { input: '5\n10 20 30 -1 -1', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> tree(n);\n        for(int i = 0; i < n; i++) cin >> tree[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    tree = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] tree = new int[n];\n        for (int i = 0; i < n; i++) tree[i] = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const tree = [];\n    for (let i = 0; i < n; i++) tree.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left = nullptr;\n    TreeNode* right = nullptr;\n    TreeNode(int v) : val(v) {}\n};\n\nTreeNode* buildTree(const vector<int>& arr) {\n    if (arr.empty() || arr[0] == -1) return nullptr;\n    TreeNode* root = new TreeNode(arr[0]);\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (!q.empty() && i < (int)arr.size()) {\n        TreeNode* curr = q.front(); q.pop();\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->left = new TreeNode(arr[i]);\n            q.push(curr->left);\n        }\n        i++;\n        if (i < (int)arr.size() && arr[i] != -1) {\n            curr->right = new TreeNode(arr[i]);\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nint maxDiam = 0;\n\nint helper(TreeNode* root) {\n    if (!root) return 0;\n    int lh = helper(root->left);\n    int rh = helper(root->right);\n    maxDiam = max(maxDiam, lh + rh);\n    return 1 + max(lh, rh);\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> tree(n);\n        for (int i = 0; i < n; i++) cin >> tree[i];\n        TreeNode* root = buildTree(tree);\n        helper(root);\n        cout << maxDiam << "\\n";\n    }\n    return 0;\n}'
  }
};
