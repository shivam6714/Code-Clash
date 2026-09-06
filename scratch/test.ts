import { executeSubmission } from '../backend/src/execution/runner';
import * as batch1 from '../backend/src/problems/datasets/batch1';
import mongoose from 'mongoose';

const test = async () => {
    const problems = [
        batch1.firstUniqueCharacter,
        batch1.longestPalindromicSubstring,
        batch1.subarraySumEqualsK
    ];

    for (const p of problems) {
        console.log(`Testing ${p.slug}...`);
        const result = await executeSubmission(
            p.referenceSolution.code,
            'cpp',
            p.testCases,
            2000,
            256
        );
        console.log(`Result for ${p.slug}: ${result.status}`);
        if (result.status === 'WRONG_ANSWER') {
            console.log(`Failed tests:`);
            p.testCases.forEach((tc, i) => {
                console.log(`Test ${i}: Input='${tc.input}', Expected='${tc.expectedOutput}'`);
            });
        }
    }
};
test();
