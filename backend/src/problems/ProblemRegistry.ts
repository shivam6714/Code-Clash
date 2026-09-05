import { ITestCase } from './providers/ProblemProvider';

export interface ProblemSupplementalData {
  starterCode?: Record<string, string>;
  hiddenTestCases?: ITestCase[];
  referenceSolution?: {
    language: 'cpp' | 'python' | 'java' | 'javascript';
    code: string;
  };
}

export class ProblemRegistry {
  private static registry: Record<string, ProblemSupplementalData> = {
    // Key format: "Provider:ExternalId"
    'Codeforces:4A': {
      starterCode: {
        cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int w;\n    if(cin >> w) {\n        // Your code here\n    }\n    return 0;\n}',
        python: 'import sys\n\ndef solve():\n    w = int(sys.stdin.read().strip())\n    # Your code here\n\nif __name__ == "__main__":\n    solve()',
      },
      hiddenTestCases: [
        { input: '1', expectedOutput: 'NO', isHidden: true },
        { input: '2', expectedOutput: 'NO', isHidden: true },
        { input: '4', expectedOutput: 'YES', isHidden: true },
        { input: '100', expectedOutput: 'YES', isHidden: true },
        { input: '99', expectedOutput: 'NO', isHidden: true }
      ],
      referenceSolution: {
        language: 'cpp',
        code: '#include <iostream>\nusing namespace std;\nint main() {\n  int w;\n  if (cin >> w) {\n    if (w > 2 && w % 2 == 0) cout << "YES\\n";\n    else cout << "NO\\n";\n  }\n  return 0;\n}'
      }
    },
    'Codeforces:71A': {
      starterCode: {
        cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    if(cin >> n) {\n        while(n--) {\n            string s;\n            cin >> s;\n            // Your code here\n        }\n    }\n    return 0;\n}',
        python: 'import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    for i in range(1, n + 1):\n        s = lines[i]\n        # Your code here\n\nif __name__ == "__main__":\n    solve()'
      },
      hiddenTestCases: [
        { input: '4\nword\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis', expectedOutput: 'word\nl10n\ni18n\np43s', isHidden: true },
        { input: '1\napple', expectedOutput: 'apple', isHidden: true },
        { input: '1\nautomatically', expectedOutput: 'a11y', isHidden: true },
        { input: '1\ninternationalization', expectedOutput: 'i18n', isHidden: true }
      ],
      referenceSolution: {
        language: 'cpp',
        code: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n  int n;\n  if (cin >> n) {\n    while (n--) {\n      string s;\n      cin >> s;\n      if (s.length() > 10) cout << s[0] << s.length() - 2 << s[s.length() - 1] << "\\n";\n      else cout << s << "\\n";\n    }\n  }\n  return 0;\n}'
      }
    },
    'Codeforces:1A': {
      starterCode: {
        cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n, m, a;\n    if(cin >> n >> m >> a) {\n        // Your code here\n    }\n    return 0;\n}',
        python: 'import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, m, a = int(lines[0]), int(lines[1]), int(lines[2])\n    # Your code here\n\nif __name__ == "__main__":\n    solve()'
      },
      hiddenTestCases: [
        { input: '6 6 4', expectedOutput: '4', isHidden: true },
        { input: '1 1 1', expectedOutput: '1', isHidden: true },
        { input: '1000000000 1000000000 1', expectedOutput: '1000000000000000000', isHidden: true }
      ],
      referenceSolution: {
        language: 'cpp',
        code: '#include <iostream>\nusing namespace std;\nint main() {\n  long long n, m, a;\n  if (cin >> n >> m >> a) {\n    long long x = n / a + (n % a != 0);\n    long long y = m / a + (m % a != 0);\n    cout << x * y << "\\n";\n  }\n  return 0;\n}'
      }
    },
    'Codeforces:231A': {
        starterCode: {
          cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if(cin >> n) {\n        // Your code here\n    }\n    return 0;\n}',
          python: 'import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    # Your code here\n\nif __name__ == "__main__":\n    solve()'
        },
        hiddenTestCases: [
          { input: '3\n1 1 0\n1 1 1\n1 0 0', expectedOutput: '2', isHidden: true },
          { input: '2\n1 0 0\n0 1 1', expectedOutput: '1', isHidden: true },
          { input: '1\n1 1 1', expectedOutput: '1', isHidden: true },
          { input: '1\n0 0 0', expectedOutput: '0', isHidden: true }
        ],
        referenceSolution: {
          language: 'cpp',
          code: '#include <iostream>\nusing namespace std;\nint main() {\n  int n; if(cin>>n){ int count=0; while(n--){ int a,b,c; cin>>a>>b>>c; if(a+b+c >= 2) count++; } cout<<count<<"\\n"; }\n  return 0;\n}'
        }
    },
    'Codeforces:158A': {
        starterCode: {
          cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if(cin >> n >> k) {\n        // Your code here\n    }\n    return 0;\n}',
          python: 'import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n, k = int(lines[0]), int(lines[1])\n    # Your code here\n\nif __name__ == "__main__":\n    solve()'
        },
        hiddenTestCases: [
          { input: '8 5\n10 9 8 7 7 7 5 5', expectedOutput: '6', isHidden: true },
          { input: '4 2\n0 0 0 0', expectedOutput: '0', isHidden: true },
          { input: '5 5\n1 1 1 1 1', expectedOutput: '5', isHidden: true }
        ],
        referenceSolution: {
          language: 'cpp',
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n  int n, k; if(cin>>n>>k){ vector<int> a(n); for(int i=0;i<n;i++)cin>>a[i]; int count=0; int limit=a[k-1]; for(int i=0;i<n;i++){ if(a[i]>=limit && a[i]>0) count++; } cout<<count<<"\\n"; }\n  return 0;\n}'
        }
    }
  };

  public static getSupplementalData(provider: string, externalId: string): ProblemSupplementalData | null {
    const key = `${provider}:${externalId}`;
    return this.registry[key] || null;
  }
}
