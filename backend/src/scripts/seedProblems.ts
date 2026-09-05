import mongoose from 'mongoose';
import { Problem, Difficulty } from '../models/Problem';
import { config } from '../config/env';

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    difficulty: Difficulty.Easy,
    topics: ['Arrays', 'Hashing'],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
      python: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}',
      javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};'
    },
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isHidden: false },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]', isHidden: false },
      { input: '[3,3]\n6', expectedOutput: '[0,1]', isHidden: true },
      { input: '[-1,-2,-3,-4,-5]\n-8', expectedOutput: '[2,4]', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    difficulty: Difficulty.Easy,
    topics: ['Strings', 'Stack'],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};',
      python: 'class Solution:\n    def isValid(self, s: str) -> bool:\n        ',
      java: 'class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}',
      javascript: '/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};'
    },
    testCases: [
      { input: '"()"', expectedOutput: 'true', isHidden: false },
      { input: '"()[]{}"', expectedOutput: 'true', isHidden: false },
      { input: '"(]"', expectedOutput: 'false', isHidden: false },
      { input: '"([)]"', expectedOutput: 'false', isHidden: true },
      { input: '"{[]}"', expectedOutput: 'true', isHidden: true }
    ],
    timeLimit: 1500,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    description: 'You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
    difficulty: Difficulty.Easy,
    topics: ['Linked List', 'Two Pointers'],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]'
      }
    ],
    starterCode: {
      cpp: '/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};',
      python: '# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        ',
      java: '/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}',
      javascript: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    \n};'
    },
    testCases: [
      { input: '[1,2,4]\n[1,3,4]', expectedOutput: '[1,1,2,3,4,4]', isHidden: false },
      { input: '[]\n[]', expectedOutput: '[]', isHidden: false },
      { input: '[]\n[0]', expectedOutput: '[0]', isHidden: true },
      { input: '[5]\n[1,2,4]', expectedOutput: '[1,2,4,5]', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    difficulty: Difficulty.Medium,
    topics: ['Arrays', 'Dynamic Programming', 'Greedy'],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      {
        input: 'nums = [1]',
        output: '1',
        explanation: 'The subarray [1] has the largest sum 1.'
      }
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};',
      python: 'class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        ',
      java: 'class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}',
      javascript: '/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};'
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', isHidden: false },
      { input: '[1]', expectedOutput: '1', isHidden: false },
      { input: '[5,4,-1,7,8]', expectedOutput: '23', isHidden: false },
      { input: '[-1]', expectedOutput: '-1', isHidden: true },
      { input: '[-2,-1]', expectedOutput: '-1', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'LRU Cache',
    slug: 'lru-cache',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.\n\nThe functions get and put must each run in O(1) average time complexity.',
    difficulty: Difficulty.Medium,
    topics: ['Hashing', 'Linked List'],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]'
      }
    ],
    starterCode: {
      cpp: 'class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    \n    int get(int key) {\n        \n    }\n    \n    void put(int key, int value) {\n        \n    }\n};',
      python: 'class LRUCache:\n    def __init__(self, capacity: int):\n        \n    def get(self, key: int) -> int:\n        \n    def put(self, key: int, value: int) -> None:\n        ',
      java: 'class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    public int get(int key) {\n        \n    }\n    public void put(int key, int value) {\n        \n    }\n}',
      javascript: '/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n    \n};\n/** \n * @param {number} key\n * @return {number}\n */\nLRUCache.prototype.get = function(key) {\n    \n};\n/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */\nLRUCache.prototype.put = function(key, value) {\n    \n};'
    },
    testCases: [
      { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', expectedOutput: '[null,null,null,1,null,-1,null,-1,3,4]', isHidden: false },
      { input: '["LRUCache","put","get","put","get","get"]\n[[1],[2,1],[2],[3,2],[2],[3]]', expectedOutput: '[null,null,1,null,-1,2]', isHidden: true }
    ],
    timeLimit: 3000,
    memoryLimit: 512,
    isPublished: true,
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: Difficulty.Medium,
    topics: ['Strings', 'Hashing', 'Sliding Window'],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};',
      python: 'class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        ',
      java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}',
      javascript: '/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    \n};'
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3', isHidden: false },
      { input: '"bbbbb"', expectedOutput: '1', isHidden: false },
      { input: '"pwwkew"', expectedOutput: '3', isHidden: false },
      { input: '""', expectedOutput: '0', isHidden: true },
      { input: '"au"', expectedOutput: '2', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
    difficulty: Difficulty.Medium,
    topics: ['Trees', 'Queue'],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000'
    ],
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]'
      },
      {
        input: 'root = [1]',
        output: '[[1]]'
      }
    ],
    starterCode: {
      cpp: '/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        \n    }\n};',
      python: '# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        ',
      java: '/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        \n    }\n}',
      javascript: '/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nvar levelOrder = function(root) {\n    \n};'
    },
    testCases: [
      { input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]', isHidden: false },
      { input: '[1]', expectedOutput: '[[1]]', isHidden: false },
      { input: '[]', expectedOutput: '[]', isHidden: false },
      { input: '[1,2,null,3,null,4,null,5]', expectedOutput: '[[1],[2],[3],[4],[5]]', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\n\nReturn true if you can finish all courses. Otherwise, return false.',
    difficulty: Difficulty.Medium,
    topics: ['Graphs', 'Trees'],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= ai, bi < numCourses',
      'All the pairs prerequisites[i] are unique.'
    ],
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.'
      },
      {
        input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        output: 'false',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.'
      }
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};',
      python: 'class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        ',
      java: 'class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}',
      javascript: '/**\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {boolean}\n */\nvar canFinish = function(numCourses, prerequisites) {\n    \n};'
    },
    testCases: [
      { input: '2\n[[1,0]]', expectedOutput: 'true', isHidden: false },
      { input: '2\n[[1,0],[0,1]]', expectedOutput: 'false', isHidden: false },
      { input: '1\n[]', expectedOutput: 'true', isHidden: true },
      { input: '3\n[[1,0],[2,1],[2,0]]', expectedOutput: 'true', isHidden: true }
    ],
    timeLimit: 2500,
    memoryLimit: 256,
    isPublished: true,
  },
  {
    title: 'Word Search II',
    slug: 'word-search-ii',
    description: 'Given an m x n board of characters and a list of strings words, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.',
    difficulty: Difficulty.Hard,
    topics: ['Trees', 'Backtracking', 'Strings'],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 12',
      'board[i][j] is a lowercase English letter.',
      '1 <= words.length <= 3 * 10^4',
      '1 <= words[i].length <= 10',
      'words[i] consists of lowercase English letters.',
      'All the strings of words are unique.'
    ],
    examples: [
      {
        input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]'
      },
      {
        input: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
        output: '[]'
      }
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n        \n    }\n};',
      python: 'class Solution:\n    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:\n        ',
      java: 'class Solution {\n    public List<String> findWords(char[][] board, String[] words) {\n        \n    }\n}',
      javascript: '/**\n * @param {character[][]} board\n * @param {string[]} words\n * @return {string[]}\n */\nvar findWords = function(board, words) {\n    \n};'
    },
    testCases: [
      { input: '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]\n["oath","pea","eat","rain"]', expectedOutput: '["eat","oath"]', isHidden: false },
      { input: '[["a","b"],["c","d"]]\n["abcb"]', expectedOutput: '[]', isHidden: false },
      { input: '[["a"]]\n["a"]', expectedOutput: '["a"]', isHidden: true }
    ],
    timeLimit: 5000,
    memoryLimit: 512,
    isPublished: true,
  },
  {
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).',
    difficulty: Difficulty.Hard,
    topics: ['Arrays', 'Binary Search'],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6'
    ],
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};',
      python: 'class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        ',
      java: 'class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}',
      javascript: '/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};'
    },
    testCases: [
      { input: '[1,3]\n[2]', expectedOutput: '2.00000', isHidden: false },
      { input: '[1,2]\n[3,4]', expectedOutput: '2.50000', isHidden: false },
      { input: '[0,0]\n[0,0]', expectedOutput: '0.00000', isHidden: true },
      { input: '[]\n[1]', expectedOutput: '1.00000', isHidden: true },
      { input: '[2]\n[]', expectedOutput: '2.00000', isHidden: true }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    isPublished: true,
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected.');
    
    console.log('Deleting existing problems (only!)...');
    // Important: Only delete from Problem collection
    await Problem.deleteMany({});
    
    console.log('Inserting seed problems...');
    await Problem.insertMany(problems);
    
    console.log('Successfully seeded 10 problems.');
  } catch (error) {
    console.error('Failed to seed problems:', error);
  } finally {
    console.log('Closing database connection...');
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDB();
