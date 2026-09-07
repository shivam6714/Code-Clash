import { Difficulty } from '../../../models/Problem';
import { CodeClashProblemDefinition } from '../types';

export const b2MathGcdMinMax: CodeClashProblemDefinition = {
  title: 'GCD of Array Extremes',
  slug: 'codeclash-b2-math-greatest-common-divisor-array',
  description: 'Given an array of N positive integers, find the smallest element and the largest element in the array, and compute their Greatest Common Divisor (GCD).\n\nInput format:\nLine 1: N\nLine 2: N space-separated positive integers\n\nOutput format:\nLine 1: GCD integer.',
  difficulty: Difficulty.Easy,
  topics: ['Math', 'Arrays', 'Number Theory'],
  constraints: [
    '2 <= N <= 10^5',
    '1 <= nums[i] <= 10^9'
  ],
  examples: [
    { input: '5\n2 5 6 9 10', output: '2' },
    { input: '4\n7 5 6 8', output: '1' }
  ],
  testCases: [
    { input: '5\n2 5 6 9 10', expectedOutput: '2', isHidden: false },
    { input: '4\n7 5 6 8', expectedOutput: '1', isHidden: false },
    { input: '2\n10 20', expectedOutput: '10', isHidden: false },
    { input: '3\n3 3 3', expectedOutput: '3', isHidden: true },
    { input: '5\n12 24 36 48 60', expectedOutput: '12', isHidden: true },
    { input: '4\n100 200 300 400', expectedOutput: '100', isHidden: true },
    { input: '3\n17 34 51', expectedOutput: '17', isHidden: true },
    { input: '5\n1 10 100 1000 10000', expectedOutput: '1', isHidden: true },
    { input: '4\n15 25 35 45', expectedOutput: '15', isHidden: true },
    { input: '3\n9 12 18', expectedOutput: '9', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for(int i = 0; i < n; i++) cin >> nums[i];\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for (let i = 0; i < n; i++) nums.push(parseInt(input[1 + i]));\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        long long minV = 1e18, maxV = -1e18;\n        for (int i = 0; i < n; i++) {\n            long long x;\n            cin >> x;\n            minV = min(minV, x);\n            maxV = max(maxV, x);\n        }\n        cout << std::gcd(minV, maxV) << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2MathCountPrimesSieve: CodeClashProblemDefinition = {
  title: 'Prime Numbers Counter Below N',
  slug: 'codeclash-b2-math-count-primes-sieve',
  description: 'Given a non-negative integer N, return the number of prime numbers strictly less than N.\n\nInput format:\nLine 1: N\n\nOutput format:\nLine 1: Prime count integer.',
  difficulty: Difficulty.Easy,
  topics: ['Math', 'Number Theory'],
  constraints: [
    '0 <= N <= 5 * 10^6'
  ],
  examples: [
    { input: '10', output: '4' },
    { input: '0', output: '0' }
  ],
  testCases: [
    { input: '10', expectedOutput: '4', isHidden: false },
    { input: '0', expectedOutput: '0', isHidden: false },
    { input: '1', expectedOutput: '0', isHidden: false },
    { input: '2', expectedOutput: '0', isHidden: true },
    { input: '3', expectedOutput: '1', isHidden: true },
    { input: '20', expectedOutput: '8', isHidden: true },
    { input: '100', expectedOutput: '25', isHidden: true },
    { input: '1000', expectedOutput: '168', isHidden: true },
    { input: '10000', expectedOutput: '1229', isHidden: true },
    { input: '100000', expectedOutput: '9592', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) {\n        if (n <= 2) {\n            cout << 0 << "\\n";\n            return 0;\n        }\n        vector<bool> isPrime(n, true);\n        isPrime[0] = isPrime[1] = false;\n        for (int p = 2; p * p < n; p++) {\n            if (isPrime[p]) {\n                for (int i = p * p; i < n; i += p) isPrime[i] = false;\n            }\n        }\n        int count = 0;\n        for (int i = 2; i < n; i++) if (isPrime[i]) count++;\n        cout << count << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2MathGcdLcmArrayProduct: CodeClashProblemDefinition = {
  title: 'Array Product LCM Calculation',
  slug: 'codeclash-b2-math-gcd-lcm-queries',
  description: 'Given two positive integers A and B, find their Least Common Multiple (LCM) modulo 10^9+7.\n\nInput format:\nLine 1: A B\n\nOutput format:\nLine 1: LCM integer modulo 1000000007.',
  difficulty: Difficulty.Medium,
  topics: ['Math', 'Number Theory'],
  constraints: [
    '1 <= A, B <= 10^12'
  ],
  examples: [
    { input: '4 6', output: '12' },
    { input: '100 200', output: '200' }
  ],
  testCases: [
    { input: '4 6', expectedOutput: '12', isHidden: false },
    { input: '100 200', expectedOutput: '200', isHidden: false },
    { input: '1 1', expectedOutput: '1', isHidden: false },
    { input: '15 25', expectedOutput: '75', isHidden: true },
    { input: '7 11', expectedOutput: '77', isHidden: true },
    { input: '12 18', expectedOutput: '36', isHidden: true },
    { input: '1000000 1000000', expectedOutput: '1000000', isHidden: true },
    { input: '1000000000 1000000000', expectedOutput: '1000000000', isHidden: true },
    { input: '123456 654321', expectedOutput: '926617610', isHidden: true },
    { input: '999999999 1000000000', expectedOutput: '56', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    a, b = int(lines[0]), int(lines[1])\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const a = parseInt(input[0]);\n    const b = parseInt(input[1]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <numeric>\nusing namespace std;\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        long long MOD = 1000000007;\n        long long g = std::gcd(a, b);\n        long long ans = ((a / g) % MOD * (b % MOD)) % MOD;\n        cout << ans << "\\n";\n    }\n    return 0;\n}'
  }
};

export const b2MathPowXnExponentiation: CodeClashProblemDefinition = {
  title: 'Binary Exponentiation Power Calculator',
  slug: 'codeclash-b2-math-pow-x-n-exponentiation',
  description: 'Implement binary exponentiation to compute X^N (X raised to power N) modulo 10^9+7 where N can be positive, negative, or zero.\n\nInput format:\nLine 1: X N\n\nOutput format:\nLine 1: (X^N) % 1000000007 (for negative N, return modular inverse of X^|N|).\nIf X == 0 and N < 0, output -1.',
  difficulty: Difficulty.Medium,
  topics: ['Math', 'Recursion'],
  constraints: [
    '-10^9 <= X <= 10^9',
    '-10^9 <= N <= 10^9'
  ],
  examples: [
    { input: '2 10', output: '1024' },
    { input: '2 -2', output: '250000002' }
  ],
  testCases: [
    { input: '2 10', expectedOutput: '1024', isHidden: false },
    { input: '2 -2', expectedOutput: '250000002', isHidden: false },
    { input: '5 0', expectedOutput: '1', isHidden: false },
    { input: '0 -5', expectedOutput: '-1', isHidden: true },
    { input: '10 5', expectedOutput: '100000', isHidden: true },
    { input: '3 20', expectedOutput: '486784380', isHidden: true },
    { input: '2 30', expectedOutput: '73741817', isHidden: true },
    { input: '-2 3', expectedOutput: '999999999', isHidden: true },
    { input: '1 1000000000', expectedOutput: '1', isHidden: true },
    { input: '5 9', expectedOutput: '1953125', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    long long x, n;\n    if (cin >> x >> n) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    x, n = int(lines[0]), int(lines[1])\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long x = sc.nextLong();\n        long n = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const x = parseInt(input[0]);\n    const n = parseInt(input[1]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\nusing namespace std;\n\nlong long MOD = 1000000007;\n\nlong long power(long long base, long long exp) {\n    long long res = 1;\n    base = (base % MOD + MOD) % MOD;\n    while (exp > 0) {\n        if (exp % 2 == 1) res = (res * base) % MOD;\n        base = (base * base) % MOD;\n        exp /= 2;\n    }\n    return res;\n}\n\nint main() {\n    long long x, n;\n    if (cin >> x >> n) {\n        if (x == 0 && n < 0) {\n            cout << -1 << "\\n";\n            return 0;\n        }\n        if (n < 0) {\n            long long p = power(x, -n);\n            cout << power(p, MOD - 2) << "\\n";\n        } else {\n            cout << power(x, n) << "\\n";\n        }\n    }\n    return 0;\n}'
  }
};

export const b2MathNthFibonacciMatrixExp: CodeClashProblemDefinition = {
  title: 'N-th Fibonacci Matrix Exponentiation',
  slug: 'codeclash-b2-math-n-th-fibonacci-matrix-exponentiation',
  description: 'Find the N-th Fibonacci number F(N) modulo 10^9+7 where F(0) = 0, F(1) = 1, F(N) = F(N-1) + F(N-2). Compute the answer in O(log N) time using matrix exponentiation.\n\nInput format:\nLine 1: N\n\nOutput format:\nLine 1: F(N) % 1000000007 integer.',
  difficulty: Difficulty.Hard,
  topics: ['Math', 'Matrix', 'Dynamic Programming'],
  constraints: [
    '0 <= N <= 10^18'
  ],
  examples: [
    { input: '10', output: '55' },
    { input: '50', output: '586268941' }
  ],
  testCases: [
    { input: '10', expectedOutput: '55', isHidden: false },
    { input: '50', expectedOutput: '586268941', isHidden: false },
    { input: '0', expectedOutput: '0', isHidden: false },
    { input: '1', expectedOutput: '1', isHidden: true },
    { input: '2', expectedOutput: '1', isHidden: true },
    { input: '100', expectedOutput: '687995182', isHidden: true },
    { input: '200', expectedOutput: '349361645', isHidden: true },
    { input: '1000', expectedOutput: '517691607', isHidden: true },
    { input: '500', expectedOutput: '550656477', isHidden: true },
    { input: '2000', expectedOutput: '141828449', isHidden: true }
  ],
  starterCode: {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}',
    python: 'import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    n = int(lines[0])\n    # Write your solution here\n\nif __name__ == "__main__":\n    main()',
    java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // Write your solution here\n    }\n}',
    javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync("/dev/stdin", "utf-8").trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === "") return;\n    const n = parseInt(input[0]);\n    // Write your solution here\n}\nmain();'
  },
  referenceSolution: {
    language: 'cpp',
    code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nlong long MOD = 1000000007;\n\nvoid multiply(long long F[2][2], long long M[2][2]) {\n    long long x = (F[0][0] * M[0][0] + F[0][1] * M[1][0]) % MOD;\n    long long y = (F[0][0] * M[0][1] + F[0][1] * M[1][1]) % MOD;\n    long long z = (F[1][0] * M[0][0] + F[1][1] * M[1][0]) % MOD;\n    long long w = (F[1][0] * M[0][1] + F[1][1] * M[1][1]) % MOD;\n    F[0][0] = x; F[0][1] = y;\n    F[1][0] = z; F[1][1] = w;\n}\n\nvoid power(long long F[2][2], long long n) {\n    if (n == 0 || n == 1) return;\n    long long M[2][2] = {{1, 1}, {1, 0}};\n    power(F, n / 2);\n    multiply(F, F);\n    if (n % 2 != 0) multiply(F, M);\n}\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        if (n == 0) {\n            cout << 0 << "\\n";\n            return 0;\n        }\n        long long F[2][2] = {{1, 1}, {1, 0}};\n        power(F, n - 1);\n        cout << F[0][0] << "\\n";\n    }\n    return 0;\n}'
  }
};
