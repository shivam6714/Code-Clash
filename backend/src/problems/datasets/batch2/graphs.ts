import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2GraphConnectedComponentsCount: CodeClashProblemDefinition = {
  title: 'Undirected Graph Component Counter',
  slug: 'codeclash-b2-graph-connected-components-count',
  description: 'Given an undirected graph with V vertices (labeled 1 to V) and E edges, count the total number of connected components in the graph.\n\nInput format:\nLine 1: V E\nNext E lines: u v (1-based indices of connected vertices)\n\nOutput format:\nLine 1: Single integer count of connected components.',
  difficulty: Difficulty.Easy,
  topics: ['Graphs', 'BFS', 'DFS', 'Union Find'],
  constraints: [
    '1 <= V <= 10^5',
    '0 <= E <= 10^5',
    '1 <= u, v <= V'
  ],
  examples: [
    { input: '5 3\n1 2\n2 3\n4 5', output: '2' },
    { input: '4 0', output: '4' }
  ],
  testCases: [
    { input: '5 3\n1 2\n2 3\n4 5', expectedOutput: '2', isHidden: false },
    { input: '4 0', expectedOutput: '4', isHidden: false },
    { input: '1 0', expectedOutput: '1', isHidden: false },
    { input: '4 3\n1 2\n2 3\n3 4', expectedOutput: '1', isHidden: true },
    { input: '6 4\n1 2\n3 4\n5 6\n1 3', expectedOutput: '2', isHidden: true },
    { input: '5 5\n1 2\n2 3\n3 4\n4 5\n5 1', expectedOutput: '1', isHidden: true },
    { input: '3 1\n1 3', expectedOutput: '2', isHidden: true },
    { input: '6 3\n1 2\n3 4\n5 6', expectedOutput: '3', isHidden: true },
    { input: '7 4\n1 2\n2 3\n4 5\n6 7', expectedOutput: '3', isHidden: true },
    { input: '5 4\n1 2\n1 3\n1 4\n1 5', expectedOutput: '1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int v, e;\n    if (cin >> v >> e) {\n        vector<pair<int, int>> edges(e);\n        for(int i = 0; i < e; i++) cin >> edges[i].first >> edges[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    v, e = int(lines[0]), int(lines[1])\n    idx = 2\n    edges = []\n    for _ in range(e):\n        edges.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int v = sc.nextInt();\n        int e = sc.nextInt();\n        int[][] edges = new int[e][2];\n        for (int i = 0; i < e; i++) {\n            edges[i][0] = sc.nextInt();\n            edges[i][1] = sc.nextInt();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const v = parseInt(input[0]);\n    const e = parseInt(input[1]);\n    let idx = 2;\n    const edges = [];\n    for (let i = 0; i < e; i++) {\n        edges.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct DSU {\n    vector<int> parent;\n    int components;\n    DSU(int n) : parent(n + 1), components(n) {\n        for (int i = 1; i <= n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\n    void unite(int i, int j) {\n        int rootI = find(i);\n        int rootJ = find(j);\n        if (rootI != rootJ) {\n            parent[rootI] = rootJ;\n            components--;\n        }\n    }\n};\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int v, e;\n    if (cin >> v >> e) {\n        DSU dsu(v);\n        for (int i = 0; i < e; i++) {\n            int u, w;\n            cin >> u >> w;\n            dsu.unite(u, w);\n        }\n        cout << dsu.components << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GraphBipartiteCheck: CodeClashProblemDefinition = {
  title: 'Graph Bipartite 2-Colorability',
  slug: 'codeclash-b2-graph-bipartite-colorability-check',
  description: 'Given an undirected graph with V vertices (1 to V) and E edges, determine if it is bipartite (can be colored using 2 colors such that no two adjacent vertices share the same color). Output "YES" if bipartite, otherwise "NO".\n\nInput format:\nLine 1: V E\nNext E lines: u v (1-based indices of connected vertices)\n\nOutput format:\nLine 1: "YES" or "NO".',
  difficulty: Difficulty.Medium,
  topics: ['Graphs', 'BFS', 'DFS'],
  constraints: [
    '1 <= V <= 10^4',
    '0 <= E <= 2 * 10^4',
    '1 <= u, v <= V'
  ],
  examples: [
    { input: '4 4\n1 2\n2 3\n3 4\n4 1', output: 'YES' },
    { input: '3 3\n1 2\n2 3\n3 1', output: 'NO' }
  ],
  testCases: [
    { input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: 'YES', isHidden: false },
    { input: '3 3\n1 2\n2 3\n3 1', expectedOutput: 'NO', isHidden: false },
    { input: '1 0', expectedOutput: 'YES', isHidden: false },
    { input: '5 5\n1 2\n2 3\n3 4\n4 5\n5 1', expectedOutput: 'NO', isHidden: true },
    { input: '6 5\n1 2\n2 3\n3 4\n4 5\n5 6', expectedOutput: 'YES', isHidden: true },
    { input: '4 3\n1 2\n1 3\n1 4', expectedOutput: 'YES', isHidden: true },
    { input: '4 6\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4', expectedOutput: 'NO', isHidden: true },
    { input: '5 4\n1 2\n2 3\n3 4\n4 5', expectedOutput: 'YES', isHidden: true },
    { input: '6 6\n1 2\n2 3\n3 1\n4 5\n5 6\n6 4', expectedOutput: 'NO', isHidden: true },
    { input: '5 0', expectedOutput: 'YES', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int v, e;\n    if (cin >> v >> e) {\n        vector<pair<int, int>> edges(e);\n        for(int i = 0; i < e; i++) cin >> edges[i].first >> edges[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    v, e = int(lines[0]), int(lines[1])\n    idx = 2\n    edges = []\n    for _ in range(e):\n        edges.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int v = sc.nextInt();\n        int e = sc.nextInt();\n        int[][] edges = new int[e][2];\n        for (int i = 0; i < e; i++) {\n            edges[i][0] = sc.nextInt();\n            edges[i][1] = sc.nextInt();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const v = parseInt(input[0]);\n    const e = parseInt(input[1]);\n    let idx = 2;\n    const edges = [];\n    for (let i = 0; i < e; i++) {\n        edges.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint main() {\n    int v, e;\n    if (cin >> v >> e) {\n        vector<vector<int>> adj(v + 1);\n        for (int i = 0; i < e; i++) {\n            int u, w;\n            cin >> u >> w;\n            adj[u].push_back(w);\n            adj[w].push_back(u);\n        }\n        vector<int> color(v + 1, 0);\n        bool ok = true;\n        for (int i = 1; i <= v; i++) {\n            if (color[i] != 0) continue;\n            color[i] = 1;\n            queue<int> q;\n            q.push(i);\n            while (!q.empty()) {\n                int curr = q.front(); q.pop();\n                for (int nxt : adj[curr]) {\n                    if (color[nxt] == 0) {\n                        color[nxt] = -color[curr];\n                        q.push(nxt);\n                    } else if (color[nxt] == color[curr]) {\n                        ok = false;\n                        break;\n                    }\n                }\n                if (!ok) break;\n            }\n            if (!ok) break;\n        }\n        cout << (ok ? "YES" : "NO") << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GraphTopologicalTaskScheduler: CodeClashProblemDefinition = {
  title: 'Topological Prerequisite Order',
  slug: 'codeclash-b2-graph-topological-task-scheduler',
  description: 'Given V tasks labeled 1 to V and E directed prerequisite edges u v (meaning task u must be completed before task v), output a valid topological order of all tasks. If a cycle exists, output -1.\n\nInput format:\nLine 1: V E\nNext E lines: u v\n\nOutput format:\nLine 1: V space-separated task IDs in valid topological order, or -1 if impossible.',
  difficulty: Difficulty.Medium,
  topics: ['Graphs', 'Topological Sort', 'BFS'],
  constraints: [
    '1 <= V <= 10^4',
    '0 <= E <= 2 * 10^4',
    '1 <= u, v <= V'
  ],
  examples: [
    { input: '4 3\n1 2\n2 3\n3 4', output: '1 2 3 4' },
    { input: '3 3\n1 2\n2 3\n3 1', output: '-1' }
  ],
  testCases: [
    { input: '4 3\n1 2\n2 3\n3 4', expectedOutput: '1 2 3 4', isHidden: false },
    { input: '3 3\n1 2\n2 3\n3 1', expectedOutput: '-1', isHidden: false },
    { input: '1 0', expectedOutput: '1', isHidden: false },
    { input: '4 2\n1 3\n2 4', expectedOutput: '1 2 3 4', isHidden: true },
    { input: '5 4\n1 2\n1 3\n2 4\n3 5', expectedOutput: '1 2 3 4 5', isHidden: true },
    { input: '2 2\n1 2\n2 1', expectedOutput: '-1', isHidden: true },
    { input: '6 6\n6 5\n5 4\n4 3\n3 2\n2 1\n5 1', expectedOutput: '6 5 4 3 2 1', isHidden: true },
    { input: '3 1\n2 3', expectedOutput: '1 2 3', isHidden: true },
    { input: '4 4\n1 2\n2 3\n3 4\n4 2', expectedOutput: '-1', isHidden: true },
    { input: '5 0', expectedOutput: '1 2 3 4 5', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int v, e;\n    if (cin >> v >> e) {\n        vector<pair<int, int>> edges(e);\n        for(int i = 0; i < e; i++) cin >> edges[i].first >> edges[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    v, e = int(lines[0]), int(lines[1])\n    idx = 2\n    edges = []\n    for _ in range(e):\n        edges.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int v = sc.nextInt();\n        int e = sc.nextInt();\n        int[][] edges = new int[e][2];\n        for (int i = 0; i < e; i++) {\n            edges[i][0] = sc.nextInt();\n            edges[i][1] = sc.nextInt();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const v = parseInt(input[0]);\n    const e = parseInt(input[1]);\n    let idx = 2;\n    const edges = [];\n    for (let i = 0; i < e; i++) {\n        edges.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint main() {\n    int v, e;\n    if (cin >> v >> e) {\n        vector<vector<int>> adj(v + 1);\n        vector<int> inDegree(v + 1, 0);\n        for (int i = 0; i < e; i++) {\n            int u, w;\n            cin >> u >> w;\n            adj[u].push_back(w);\n            inDegree[w]++;\n        }\n        priority_queue<int, vector<int>, greater<int>> q;\n        for (int i = 1; i <= v; i++) {\n            if (inDegree[i] == 0) q.push(i);\n        }\n        vector<int> topo;\n        while (!q.empty()) {\n            int curr = q.top(); q.pop();\n            topo.push_back(curr);\n            for (int nxt : adj[curr]) {\n                inDegree[nxt]--;\n                if (inDegree[nxt] == 0) q.push(nxt);\n            }\n        }\n        if ((int)topo.size() != v) {\n            cout << -1 << "\\n";\n        } else {\n            for (int i = 0; i < v; i++) {\n                cout << topo[i] << (i + 1 == v ? "" : " ");\n            }\n            cout << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2GraphShortestPathDijkstra: CodeClashProblemDefinition = {
  title: 'Dijkstra Shortest Path Finder',
  slug: 'codeclash-b2-graph-shortest-path-dijkstra',
  description: 'Given a directed weighted graph with V vertices (1 to V) and E edges, a source vertex S and a destination vertex T, find the minimum cost to travel from S to T. If T is unreachable from S, output -1.\n\nInput format:\nLine 1: V E S T\nNext E lines: u v w (1-based directed edge from u to v with weight w)\n\nOutput format:\nLine 1: Minimum total edge weight, or -1.',
  difficulty: Difficulty.Medium,
  topics: ['Graphs', 'Heap / Priority Queue', 'Shortest Path'],
  constraints: [
    '1 <= V <= 10^4',
    '0 <= E <= 2 * 10^4',
    '1 <= S, T, u, v <= V',
    '0 <= w <= 10^4'
  ],
  examples: [
    { input: '4 4 1 4\n1 2 2\n2 4 5\n1 3 1\n3 4 2', output: '3' },
    { input: '3 1 1 3\n1 2 10', output: '-1' }
  ],
  testCases: [
    { input: '4 4 1 4\n1 2 2\n2 4 5\n1 3 1\n3 4 2', expectedOutput: '3', isHidden: false },
    { input: '3 1 1 3\n1 2 10', expectedOutput: '-1', isHidden: false },
    { input: '1 0 1 1', expectedOutput: '0', isHidden: false },
    { input: '5 6 1 5\n1 2 10\n1 3 3\n2 4 1\n3 2 4\n3 4 8\n4 5 2', expectedOutput: '10', isHidden: true },
    { input: '3 3 1 3\n1 2 5\n2 3 5\n1 3 12', expectedOutput: '10', isHidden: true },
    { input: '4 3 1 4\n1 2 1\n2 3 1\n3 4 1', expectedOutput: '3', isHidden: true },
    { input: '4 2 1 4\n1 2 5\n3 4 5', expectedOutput: '-1', isHidden: true },
    { input: '3 2 1 1\n1 2 5\n2 3 5', expectedOutput: '0', isHidden: true },
    { input: '5 5 1 5\n1 2 1\n2 3 1\n3 4 1\n4 5 1\n1 5 10', expectedOutput: '4', isHidden: true },
    { input: '4 4 1 4\n1 2 100\n1 3 10\n3 2 10\n2 4 10', expectedOutput: '30', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int v, e, s, t;\n    if (cin >> v >> e >> s >> t) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    v, e, s, t = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int v = sc.nextInt();\n        int e = sc.nextInt();\n        int s = sc.nextInt();\n        int t = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const v = parseInt(input[0]);\n    const e = parseInt(input[1]);\n    const s = parseInt(input[2]);\n    const t = parseInt(input[3]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int v, e, s, t;\n    if (cin >> v >> e >> s >> t) {\n        vector<vector<pair<int, long long>>> adj(v + 1);\n        for (int i = 0; i < e; i++) {\n            int u, w;\n            long long weight;\n            cin >> u >> w >> weight;\n            adj[u].push_back({w, weight});\n        }\n        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;\n        vector<long long> dist(v + 1, 1e18);\n        dist[s] = 0;\n        pq.push({0, s});\n        while (!pq.empty()) {\n            auto [d, curr] = pq.top(); pq.pop();\n            if (d > dist[curr]) continue;\n            if (curr == t) break;\n            for (auto edge : adj[curr]) {\n                int nxt = edge.first;\n                long long weight = edge.second;\n                if (dist[curr] + weight < dist[nxt]) {\n                    dist[nxt] = dist[curr] + weight;\n                    pq.push({dist[nxt], nxt});\n                }\n            }\n        }\n        cout << (dist[t] == 1e18 ? -1 : dist[t]) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GraphRedundantConnection: CodeClashProblemDefinition = {
  title: 'Tree Redundant Cycle Edge Removal',
  slug: 'codeclash-b2-graph-union-find-redundant-connection',
  description: 'A tree of N nodes (1 to N) had one extra undirected edge added, creating a cycle. You are given the N edges in input order. Find the edge that can be removed so that the resulting graph is a tree of N nodes. If there are multiple answers, return the edge that occurs last in the input.\n\nInput format:\nLine 1: N\nNext N lines: u v (1-based undirected edge)\n\nOutput format:\nLine 1: Two space-separated integers (u v) representing the redundant edge in input order.',
  difficulty: Difficulty.Hard,
  topics: ['Graphs', 'Union Find', 'Tree'],
  constraints: [
    '3 <= N <= 10^5',
    '1 <= u, v <= N'
  ],
  examples: [
    { input: '3\n1 2\n1 3\n2 3', output: '2 3' },
    { input: '5\n1 2\n2 3\n3 4\n1 4\n1 5', output: '1 4' }
  ],
  testCases: [
    { input: '3\n1 2\n1 3\n2 3', expectedOutput: '2 3', isHidden: false },
    { input: '5\n1 2\n2 3\n3 4\n1 4\n1 5', expectedOutput: '1 4', isHidden: false },
    { input: '4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '4 1', isHidden: false },
    { input: '5\n1 2\n1 3\n1 4\n1 5\n2 3', expectedOutput: '2 3', isHidden: true },
    { input: '6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 1', expectedOutput: '6 1', isHidden: true },
    { input: '4\n1 2\n1 3\n2 4\n3 4', expectedOutput: '3 4', isHidden: true },
    { input: '5\n2 3\n3 4\n4 5\n5 2\n1 2', expectedOutput: '5 2', isHidden: true },
    { input: '3\n3 1\n1 2\n2 3', expectedOutput: '2 3', isHidden: true },
    { input: '5\n1 2\n2 3\n3 1\n4 5\n5 1', expectedOutput: '3 1', isHidden: true },
    { input: '4\n1 4\n4 3\n3 2\n2 1', expectedOutput: '2 1', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<pair<int, int>> edges(n);\n        for(int i = 0; i < n; i++) cin >> edges[i].first >> edges[i].second;\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    idx = 1\n    edges = []\n    for _ in range(n):\n        edges.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[][] edges = new int[n][2];\n        for (int i = 0; i < n; i++) {\n            edges[i][0] = sc.nextInt();\n            edges[i][1] = sc.nextInt();\n        }\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    let idx = 1;\n    const edges = [];\n    for (let i = 0; i < n; i++) {\n        edges.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct DSU {\n    vector<int> parent;\n    DSU(int n) : parent(n + 1) {\n        for (int i = 1; i <= n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\n    bool unite(int i, int j) {\n        int rootI = find(i);\n        int rootJ = find(j);\n        if (rootI == rootJ) return false;\n        parent[rootI] = rootJ;\n        return true;\n    }\n};\n\nint main() {\n    int n;\n    if (cin >> n) {\n        DSU dsu(n);\n        int ansU = -1, ansV = -1;\n        for (int i = 0; i < n; i++) {\n            int u, v;\n            cin >> u >> v;\n            if (!dsu.unite(u, v)) {\n                ansU = u;\n                ansV = v;\n            }\n        }\n        cout << ansU << " " << ansV << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2GraphAlienLanguageOrder: CodeClashProblemDefinition = {
  title: 'Alien Dictionary Character Ordering',
  slug: 'codeclash-b2-graph-alien-language-dictionary-order',
  description: 'There is a new alien language that uses the lowercase English alphabet. You are given a list of N words from the alien dictionary sorted lexicographically by the rules of this language. Derive the order of characters in the alien language. If there are multiple valid orders, output the lexicographically smallest valid string of unique alien letters. If the order is invalid or cyclic, output "INVALID".\n\nInput format:\nLine 1: N\nNext N lines: one word per line\n\nOutput format:\nLine 1: String of unique characters in alien alphabet order, or "INVALID".',
  difficulty: Difficulty.Hard,
  topics: ['Graphs', 'Topological Sort', 'Strings'],
  constraints: [
    '1 <= N <= 500',
    '1 <= |words[i]| <= 100',
    'words contain lowercase English letters'
  ],
  examples: [
    { input: '5\nwrt\nwrf\ner\nett\nrftt', output: 'wertf' },
    { input: '2\nz\nx', output: 'zx' }
  ],
  testCases: [
    { input: '5\nwrt\nwrf\ner\nett\nrftt', expectedOutput: 'wertf', isHidden: false },
    { input: '2\nz\nx', expectedOutput: 'zx', isHidden: false },
    { input: '2\nabc\nab', expectedOutput: 'INVALID', isHidden: false },
    { input: '3\nz\nx\nz', expectedOutput: 'INVALID', isHidden: true },
    { input: '1\ncodeclash', expectedOutput: 'acdehlos', isHidden: true },
    { input: '3\na\nb\nc', expectedOutput: 'abc', isHidden: true },
    { input: '4\nbaa\nabcd\nabca\ncab', expectedOutput: 'bdac', isHidden: true },
    { input: '2\napple\napp', expectedOutput: 'INVALID', isHidden: true },
    { input: '3\nx\ny\nz', expectedOutput: 'xyz', isHidden: true },
    { input: '4\ncat\ncab\nbar\nbat', expectedOutput: 'acrtb', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<string> words(n);\n        for(int i = 0; i < n; i++) cin >> words[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    words = lines[1:n+1]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        String[] words = new String[n];\n        for (int i = 0; i < n; i++) words[i] = sc.next();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const words = [];\n    for (let i = 0; i < n; i++) words.push(input[1 + i]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <unordered_set>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<string> words(n);\n        for (int i = 0; i < n; i++) cin >> words[i];\n        unordered_set<char> present;\n        for (const string& w : words) {\n            for (char c : w) present.insert(c);\n        }\n        unordered_map<char, unordered_set<char>> adj;\n        unordered_map<char, int> inDegree;\n        for (char c : present) inDegree[c] = 0;\n        bool invalid = false;\n        for (int i = 0; i < n - 1; i++) {\n            const string& w1 = words[i];\n            const string& w2 = words[i + 1];\n            if (w1.length() > w2.length() && w1.substr(0, w2.length()) == w2) {\n                invalid = true;\n                break;\n            }\n            for (size_t j = 0; j < min(w1.length(), w2.length()); j++) {\n                if (w1[j] != w2[j]) {\n                    if (!adj[w1[j]].count(w2[j])) {\n                        adj[w1[j]].insert(w2[j]);\n                        inDegree[w2[j]]++;\n                    }\n                    break;\n                }\n            }\n        }\n        if (invalid) {\n            cout << "INVALID\\n";\n            return 0;\n        }\n        priority_queue<char, vector<char>, greater<char>> q;\n        for (char c : present) {\n            if (inDegree[c] == 0) q.push(c);\n        }\n        string res = "";\n        while (!q.empty()) {\n            char curr = q.top(); q.pop();\n            res += curr;\n            for (char nxt : adj[curr]) {\n                inDegree[nxt]--;\n                if (inDegree[nxt] == 0) q.push(nxt);\n            }\n        }\n        if (res.length() != present.size()) cout << "INVALID\\n";\n        else cout << res << "\\n";\n    }\n    return 0;\n}'
  }
};
