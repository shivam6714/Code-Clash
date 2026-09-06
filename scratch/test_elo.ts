function calculateEloChange(ratingA: number, ratingB: number, actualScoreA: number): { changeA: number, changeB: number, newRatingA: number, newRatingB: number } {
  const K = 32;

  const expectedScoreA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedScoreB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

  const actualScoreB = 1 - actualScoreA;

  const changeA = Math.round(K * (actualScoreA - expectedScoreA));
  const changeB = Math.round(K * (actualScoreB - expectedScoreB));

  const newRatingA = Math.max(0, ratingA + changeA);
  const newRatingB = Math.max(0, ratingB + changeB);

  return { changeA, changeB, newRatingA, newRatingB };
}

console.log("--- Test Case 1: 300 vs 300 (Player A wins) ---");
console.log(calculateEloChange(300, 300, 1));

console.log("\n--- Test Case 2: 300 vs 500 (Player A [300] wins - Underdog victory) ---");
console.log(calculateEloChange(300, 500, 1));

console.log("\n--- Test Case 3: 500 vs 300 (Player B [500] wins - Favorite victory) ---");
console.log(calculateEloChange(300, 500, 0));

console.log("\n--- Test Case 4: 10 vs 500 (Player A [10] loses, rating floor check) ---");
console.log(calculateEloChange(10, 500, 0));
