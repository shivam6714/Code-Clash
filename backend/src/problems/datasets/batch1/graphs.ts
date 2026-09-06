import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const numberOfIslands: CodeClashProblemDefinition = {
  title: 'Number of Islands',
  slug: 'number-of-islands',
  description: 'Given an m x n 2D binary grid grid which represents a map of 1s (land) and 0s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.\n\nInput format:\nLine 1: m n (rows and columns)\nNext m lines: A string of n characters (0 or 1)\n\nOutput format:\nInteger representing the number of islands.',
  difficulty: Difficulty.Medium,
  topics: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Matrix'],
  constraints: [
    '1 <= m, n <= 300',
    'grid[i][j] is 0 or 1'
  ],
  examples: [
    { input: '4 5\n11110\n11010\n11000\n00000', output: '1' },
    { input: '4 5\n11000\n11000\n00100\n00011', output: '3' }
  ],
  testCases: [
    { input: '4 5\n11110\n11010\n11000\n00000', expectedOutput: '1', isHidden: false },
    { input: '4 5\n11000\n11000\n00100\n00011', expectedOutput: '3', isHidden: false },
    { input: '1 1\n1', expectedOutput: '1', isHidden: false },
    { input: '1 1\n0', expectedOutput: '0', isHidden: true },
    { input: '3 3\n101\n010\n101', expectedOutput: '5', isHidden: true },
    { input: '2 2\n11\n11', expectedOutput: '1', isHidden: true },
    { input: '3 4\n1001\n0110\n1001', expectedOutput: '5', isHidden: true },
    { input: '5 5\n11111\n10001\n10101\n10001\n11111', expectedOutput: '2', isHidden: true },
    { input: '3 1\n1\n0\n1', expectedOutput: '2', isHidden: true },
    { input: '1 4\n1010', expectedOutput: '2', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int m, n;\n    if (cin >> m >> n) {\n        vector<string> grid(m);\n        for(int i = 0; i < m; i++) cin >> grid[i];\n        // Write your code here and print the result\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    m, n = int(lines[0]), int(lines[1])\n    grid = lines[2:2+m]\n    # Write your code here and print the result\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int m = sc.nextInt();\n        int n = sc.nextInt();\n        String[] grid = new String[m];\n        for (int i = 0; i < m; i++) grid[i] = sc.next();\n        // Write your code here and print the result\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const m = parseInt(input[0]);\n    const n = parseInt(input[1]);\n    const grid = [];\n    for (let i = 0; i < m; i++) grid.push(input[2 + i]);\n    // Write your code here and print the result\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nvoid dfs(vector<string>& grid, int i, int j, int m, int n) {\n  if(i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == \'0\') return;\n  grid[i][j] = \'0\';\n  dfs(grid, i+1, j, m, n);\n  dfs(grid, i-1, j, m, n);\n  dfs(grid, i, j+1, m, n);\n  dfs(grid, i, j-1, m, n);\n}\n\nint main() {\n  int m, n; if(cin>>m>>n) {\n    vector<string> grid(m);\n    for(int i=0; i<m; i++) cin>>grid[i];\n    int count = 0;\n    for(int i=0; i<m; i++) {\n      for(int j=0; j<n; j++) {\n        if(grid[i][j] == \'1\') {\n          count++;\n          dfs(grid, i, j, m, n);\n        }\n      }\n    }\n    cout << count << "\\n";\n  }\n  return 0;\n}'
  }
};

export const courseSchedule: CodeClashProblemDefinition = {
  title: 'Course Schedule',
  slug: 'course-schedule',
  description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b first if you want to take course a.\n\nReturn true if you can finish all courses. Otherwise, return false.\n\nInput format:\nLine 1: numCourses numPrerequisites\nNext numPrerequisites lines: a b (space-separated integers representing prerequisites[i])\n\nOutput format:\n"true" or "false".',
  difficulty: Difficulty.Medium,
  topics: ['Graph', 'Depth-First Search', 'Breadth-First Search', 'Topological Sort'],
  constraints: [
    '1 <= numCourses <= 2000',
    '0 <= numPrerequisites <= 5000',
    'prerequisites[i].length == 2',
    '0 <= a, b < numCourses',
    'All the pairs prerequisites[i] are unique.'
  ],
  examples: [
    { input: '2 1\n1 0', output: 'true' },
    { input: '2 2\n1 0\n0 1', output: 'false' }
  ],
  testCases: [
    { input: '2 1\n1 0', expectedOutput: 'true', isHidden: false },
    { input: '2 2\n1 0\n0 1', expectedOutput: 'false', isHidden: false },
    { input: '1 0', expectedOutput: 'true', isHidden: false },
    { input: '4 4\n1 0\n2 1\n3 2\n1 3', expectedOutput: 'false', isHidden: true },
    { input: '5 4\n1 0\n2 1\n3 2\n4 3', expectedOutput: 'true', isHidden: true },
    { input: '3 3\n0 1\n1 2\n2 0', expectedOutput: 'false', isHidden: true },
    { input: '3 2\n0 1\n0 2', expectedOutput: 'true', isHidden: true },
    { input: '4 5\n0 1\n1 2\n2 3\n3 1\n0 2', expectedOutput: 'false', isHidden: true },
    { input: '5 5\n1 0\n2 0\n3 1\n3 2\n4 3', expectedOutput: 'true', isHidden: true },
    { input: '2 0', expectedOutput: 'true', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int numCourses, p;\n    if (cin >> numCourses >> p) {\n        vector<pair<int,int>> req(p);\n        for(int i = 0; i < p; i++) cin >> req[i].first >> req[i].second;\n        // Write your code here and print "true" or "false"\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    numCourses = int(lines[0])\n    p = int(lines[1])\n    req = []\n    idx = 2\n    for _ in range(p):\n        req.append((int(lines[idx]), int(lines[idx+1])))\n        idx += 2\n    # Write your code here and print "true" or "false"\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int numCourses = sc.nextInt();\n        int p = sc.nextInt();\n        int[][] req = new int[p][2];\n        for (int i = 0; i < p; i++) {\n            req[i][0] = sc.nextInt();\n            req[i][1] = sc.nextInt();\n        }\n        // Write your code here and print "true" or "false"\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const numCourses = parseInt(input[0]);\n    const p = parseInt(input[1]);\n    const req = [];\n    let idx = 2;\n    for (let i = 0; i < p; i++) {\n        req.push([parseInt(input[idx]), parseInt(input[idx+1])]);\n        idx += 2;\n    }\n    // Write your code here and print "true" or "false"\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nint main() {\n  int numCourses, p; if(cin>>numCourses>>p) {\n    vector<vector<int>> adj(numCourses);\n    vector<int> indegree(numCourses, 0);\n    for(int i=0; i<p; i++) {\n      int u, v; cin>>u>>v;\n      adj[v].push_back(u);\n      indegree[u]++;\n    }\n    queue<int> q;\n    for(int i=0; i<numCourses; i++) {\n      if(indegree[i] == 0) q.push(i);\n    }\n    int count = 0;\n    while(!q.empty()) {\n      int curr = q.front(); q.pop();\n      count++;\n      for(int next : adj[curr]) {\n        indegree[next]--;\n        if(indegree[next] == 0) q.push(next);\n      }\n    }\n    if(count == numCourses) cout << "true\\n";\n    else cout << "false\\n";\n  }\n  return 0;\n}'
  }
};
