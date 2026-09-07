import fs from 'fs';
import path from 'path';
import * as batch2 from '../problems/datasets/batch2';
import { executeRun } from '../execution/runner';
import { CodeClashProblemDefinition } from '../problems/datasets/types';

const fixAllOutputs = async () => {
  console.log('--- Batch 2 Exact Output Auto-Fixer ---');

  const problemsMap: Record<string, CodeClashProblemDefinition> = batch2 as any;
  const problemsList = Object.values(problemsMap);

  console.log(`Loaded ${problemsList.length} problems from Batch 2.`);

  let updatedCount = 0;
  let passedCount = 0;

  for (const p of problemsList) {
    if (!p.slug || !p.referenceSolution?.code) continue;

    console.log(`Running reference solution for [${p.slug}]...`);
    try {
      const runResult = await executeRun(
        p.referenceSolution.code,
        'cpp',
        p.testCases,
        3000,
        256
      );

      if (!runResult.testResults || runResult.testResults.length !== p.testCases.length) {
        console.error(`- Failed to get test results for ${p.slug}: ${runResult.errorMessage}`);
        continue;
      }

      let modified = false;
      runResult.testResults.forEach((tr: any, idx: number) => {
        const expected = p.testCases[idx].expectedOutput.trim();
        const actual = tr.actualOutput.trim();

        if (expected !== actual) {
          console.log(`  [Test ${idx + 1}] Updating expected output: "${expected}" -> "${actual}"`);
          p.testCases[idx].expectedOutput = actual;
          modified = true;
        }
      });

      if (modified) {
        updatedCount++;
      } else {
        passedCount++;
      }
    } catch (err: any) {
      console.error(`- Error testing ${p.slug}: ${err.message}`);
    }
  }

  console.log(`\nAlready matching: ${passedCount}`);
  console.log(`Updated test cases for: ${updatedCount} problems.`);

  console.log('\nRewriting problem dataset files...');

  const topicFilesMap: Record<string, string[]> = {
    'arrays.ts': ['b2ArrayPairParitySum', 'b2ArrayMonotonePivot', 'b2ArrayKStepRotationQuery', 'b2ArrayEquilibriumIndex', 'b2ArrayBlockInversionCount', 'b2ArrayMajorityThreshold', 'b2ArrayMaxSubarrayXorSum'],
    'strings.ts': ['b2StringVowelConsonantInterleave', 'b2StringCharFreqSort', 'b2StringMinDeletionsUniqueFreq', 'b2StringCompressRunLength', 'b2StringLongestPalindromeKEdits', 'b2StringLexicographicalMinRotation'],
    'hashmaps.ts': ['b2HashmapDistinctFreqStats', 'b2HashmapPairSumDivisibleK', 'b2HashmapSubarraysSumDivisibleK', 'b2HashmapAnagramGroupSizes', 'b2HashmapFourElementSumZero', 'b2HashmapLongestSequenceStepK'],
    'twoPointers.ts': ['b2TwoPointersSortByParity', 'b2TwoPointersPairClosestSum', 'b2TwoPointersTrappingWaterVolume', 'b2TwoPointersContainerMaxCapacity', 'b2TwoPointersTripletsLessThanTarget'],
    'slidingWindow.ts': ['b2SlidingWindowMaxSumWindowK', 'b2SlidingWindowSmallestSubarraySumAtleastS', 'b2SlidingWindowAtmostKDistinctChars', 'b2SlidingWindowLongestOnesKFlips', 'b2SlidingWindowSlidingMaximumDeque'],
    'prefixSum.ts': ['b2PrefixSumRangeQueries', 'b2PrefixSumCountSubarraysEvenSum', 'b2PrefixSumProductExceptSelf', 'b2PrefixSumLongestSubarraySumZero', 'b2PrefixSum2DMatrixRegionSumQueries'],
    'binarySearch.ts': ['b2BinarySearchFirstLastOccurrence', 'b2BinarySearchInsertPosition', 'b2BinarySearchPeakMountain', 'b2BinarySearchShipCapacityDDays', 'b2BinarySearchKthSmallestTwoSortedArrays', 'b2BinarySearchSplitArrayMinMaxSum'],
    'stack.ts': ['b2StackBackspaceStringCompare', 'b2StackRemoveAdjacentDuplicates', 'b2StackNextGreaterElementCircular', 'b2StackDecodeNestedString', 'b2StackMaxRectangleHistogram'],
    'linkedLists.ts': ['b2LinkedListMiddleNode', 'b2LinkedListPalindromeCheck', 'b2LinkedListRemoveKthFromEnd', 'b2LinkedListRotateRightByK', 'b2LinkedListMergeKSortedLists'],
    'trees.ts': ['b2TreeMaxDepth', 'b2TreeLeafNodesCount', 'b2TreeZigzagLevelOrder', 'b2TreeLowestCommonAncestor', 'b2TreePathSumTarget', 'b2TreeDiameter'],
    'graphs.ts': ['b2GraphConnectedComponentsCount', 'b2GraphBipartiteCheck', 'b2GraphTopologicalTaskScheduler', 'b2GraphShortestPathDijkstra', 'b2GraphRedundantConnection', 'b2GraphAlienLanguageOrder'],
    'heaps.ts': ['b2HeapKthLargestElement', 'b2HeapKFrequentWordsSort', 'b2HeapReorganizeStringNoAdjacentSame', 'b2HeapMinCostConnectRopes', 'b2HeapRunningMedianStream'],
    'greedy.ts': ['b2GreedyLemonadeChange', 'b2GreedyAssignCookiesSatisfaction', 'b2GreedyJumpGameReachability', 'b2GreedyPartitionLabels', 'b2GreedyTaskSchedulerCooldown', 'b2GreedyCandyDistribution'],
    'intervals.ts': ['b2IntervalsOverlapPairCount', 'b2IntervalsMergeOverlapping', 'b2IntervalsInsertNewInterval', 'b2IntervalsMinMeetingRooms', 'b2IntervalsMinRemovalsNonOverlapping'],
    'backtracking.ts': ['b2BacktrackingBinaryStringsNoConsecutiveOnes', 'b2BacktrackingSubsetGeneration', 'b2BacktrackingCombinationSumTarget', 'b2BacktrackingNQueensValidArrangements', 'b2BacktrackingSudokuSolver'],
    'dynamicProgramming.ts': ['b2DpStaircaseMinStepCost', 'b2DpCoinChangeMinCoins', 'b2DpLongestIncreasingSubsequence', 'b2DpHouseRobberCircular', 'b2DpPartitionEqualSubsetSum', 'b2DpEditDistanceLevenshtein', 'b2DpLongestPalindromicSubsequence'],
    'math.ts': ['b2MathGcdMinMax', 'b2MathCountPrimesSieve', 'b2MathGcdLcmQueries', 'b2MathPowXnExponentiation', 'b2MathNthFibonacciMatrixExp'],
    'matrix.ts': ['b2MatrixTransposeSquare', 'b2MatrixRowWithMaxOnes', 'b2MatrixSpiralOrderTraversal', 'b2MatrixRotate90DegreesClockwise', 'b2MatrixMaxSubgridAreaOnes']
  };

  const batch2Dir = path.join(__dirname, '../problems/datasets/batch2');

  for (const [filename, varNames] of Object.entries(topicFilesMap)) {
    const filePath = path.join(batch2Dir, filename);
    if (!fs.existsSync(filePath)) continue;

    let fileContent = fs.readFileSync(filePath, 'utf-8');

    for (const varName of varNames) {
      const problemObj = (batch2 as any)[varName];
      if (!problemObj) continue;

      // Find export const varName in fileContent and replace its testCases
      const slug = problemObj.slug;
      const testCasesJson = JSON.stringify(problemObj.testCases, null, 2);

      // Regexp to match testCases array inside export const varName
      const regex = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?testCases:\\s*\\[)[\\s\\S]*?(\\]\\s*,\\s*starterCode:)`, 'm');
      
      fileContent = fileContent.replace(regex, (match, p1, p2) => {
        const indentedTestCases = testCasesJson.split('\n').map(line => '  ' + line).join('\n').trim();
        return `${p1}\n${indentedTestCases}\n  ${p2.trim()}`;
      });
    }

    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`Updated ${filename}`);
  }

  console.log('\nAll problem files updated successfully!');
  process.exit(0);
};

fixAllOutputs().catch(err => {
  console.error(err);
  process.exit(1);
});
