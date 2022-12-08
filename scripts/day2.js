const pointsPerShape = { 'X': 1, 'Y': 2, 'Z': 3 };
const mapHandToOutcome = {
  'X': { 'A': 'Z', 'B': 'X', 'C': 'Y' },  // Lose
  'Y': { 'A': 'X', 'B': 'Y', 'C': 'Z' },  // Tie
  'Z': { 'A': 'Y', 'B': 'Z', 'C': 'X' },  // Win
};
const roundOutcome = {
  'A': { 'X': 3, 'Y': 6, 'Z': 0 },
  'B': { 'X': 0, 'Y': 3, 'Z': 6 },
  'C': { 'X': 6, 'Y': 0, 'Z': 3 },
};

function calcScoreV1(guide) {
  return guide.formatInput(guide)
    .map(hand => [                        // Map hand to points:
      roundOutcome[hand[0]][hand[1]],       // Points won because of the outcome.
      pointsPerShape[hand[1]],              // Points won because of the shape selected.
    ])
    .map(x => x.reduce((x, y) => x + y))  // Add up round points.
    .reduce((x, y) => x + y)              // Add up game points.
}

function calcScoreV2(guide) {
  return guide.formatInput(guide)
    .map(hand => [                        // Choose our hand to get the desired outcome.
      hand[0],                              // Other elf's hand.
      mapHandToOutcome[hand[1]][hand[0]],   // Our hand.
    ])
    .map(hand => [                        // Map hand to points:
      roundOutcome[hand[0]][hand[1]],       // Points won because of the outcome.
      pointsPerShape[hand[1]],              // Points won because of the shape selected.
    ])
    .map(x => x.reduce((x, y) => x + y))  // Add up round points.
    .reduce((x, y) => x + y)              // Add up game points.
}

function formatInput(input) {
  return input
    .trim()                               // Remove trailing spaces in input.
    .split(/\n/)                          // One array entry per round played.
    .map(x => x.split(' '))               // Split each round into the players hands.
}


//#region INPUT
const strategyGuide = `
A Z
C X
A Z
A Z
C Y
C Y
A Z
A Y
C Y
A Y
A Z
A Z
A Z
A Y
A Z
A Y
C Y
C X
A Y
C Y
C Y
C X
A Z
C Y
C X
A X
A Y
A Z
A Y
A Y
C X
C X
B Y
C X
C X
A Y
A Z
A Z
A X
A Z
A Z
C Y
A Z
A Z
A Y
C X
C Y
C X
B X
C Z
A Y
A Z
A Z
A Z
A Y
A Y
C X
A Y
A Z
C Y
A Y
A Y
A Z
A Z
C Y
A Z
C Y
A Y
A Z
A Z
C Y
B Z
A Z
A Z
A Z
A Z
C X
C X
A Y
A X
A Y
A Z
A Z
C X
A Z
C X
A Z
C Y
C X
A Z
A Z
A Z
A Z
C X
C Y
A Z
A Z
C Y
A Z
B Z
C X
A Z
A X
C X
A Z
C Z
A Z
C X
A Z
A Y
C X
C Z
A Z
C X
C Y
A Z
B Z
B Y
A X
A X
A X
A Z
A Z
A X
A Z
A X
A Z
A Z
C X
C X
B Z
A Z
A Y
A Z
A Z
A Z
A Z
C X
C X
C X
A Z
A Z
A Z
A Z
A X
A Y
A Y
C X
C X
B Z
C X
A X
A Z
A Z
C X
C Z
A Z
A Z
C Y
A X
A Z
C Y
A X
A Y
A Y
A Y
C Y
A Z
A Z
C X
C X
C X
C X
B Z
C Y
C X
C X
A Y
A Y
A Z
A Z
A X
C X
A Z
B Z
A Z
C X
A Y
A Z
A Z
A Y
A Y
A Z
C X
A Y
C X
C X
A Z
A Y
C X
A Z
A Z
A Y
A Z
A Z
C Y
C Z
A Y
A Z
C X
C X
A Z
A Z
C Y
A Y
A Z
A Y
A Z
C X
A Z
A Z
C X
A Y
A Y
C Y
A Z
C Y
A Z
A Z
C Y
A Y
B Z
C Y
C X
C X
A Z
C Y
A X
C Y
A Z
A Y
A Z
C X
C X
C Y
C Y
A Y
A Z
C X
C X
A Y
A X
A Y
B Z
A Y
C Y
C X
C X
A X
C X
B Z
A X
C Y
C X
C X
A X
A Z
B Z
A Z
A Z
A Y
A X
A Z
C X
A X
C Y
A Z
A Z
A X
A Z
A Z
C X
C X
A Z
A Z
A Z
A X
A Z
A X
B Y
A Z
A Y
C Y
A Z
C X
A Z
C X
A Y
A Z
C X
C Y
A Y
C Y
A Z
C X
A Z
A Z
C X
A Y
A Z
A X
A Z
A Z
A Z
B Y
C X
A X
A Z
A Z
C Y
C Y
C X
C X
C X
A X
A X
A Z
A X
A Y
A Z
A Y
A Z
C Y
C Z
A Y
A Z
A Z
A X
A Z
A Z
C X
C Y
A Y
C X
C X
A Z
C X
C X
C X
A X
A Z
A Z
A Z
A Z
B Y
A Y
A Y
A Z
C X
A Y
A Z
C X
A Z
C Z
A Y
C X
A Z
B Z
A Y
A X
A Z
C X
A Z
A Z
A Z
A Z
A Z
B Z
A Z
C X
A Y
C X
A Z
A Z
A Y
A Z
B Z
C X
A Y
C Y
A Z
A Z
C X
C X
A Y
C X
C Y
B Z
A Y
C X
A Y
C X
A X
A Y
A Z
A Z
A Y
C X
A X
C X
B Y
A Z
A Y
B Y
A Y
C X
A Z
A Z
C X
C Y
A Y
C X
C Y
A Y
A Z
A X
B Z
C X
A Z
A Y
A Z
B Z
A Z
A X
C Y
A X
A Z
A Y
C Y
A Z
C Y
A Z
C X
C X
A Y
C X
C X
A Y
A Z
A Z
A Y
A X
C Y
A Z
A Z
C X
A X
A Z
C Z
A Z
C Y
A Z
C X
A Z
A Z
A X
C X
C X
C Y
B Z
B Y
C Y
A Y
A X
A Z
C X
A Y
A Y
A Z
A Z
C Z
C X
C X
C X
A Z
C X
A Z
A Z
A Y
C Y
C X
C X
C X
A Y
C X
B Z
C X
A Z
C Y
A Y
C Y
A Z
A Z
C X
A X
A Z
A Y
A Z
B X
C Z
A Z
C Z
A X
C X
C X
C X
C X
A Z
A Y
A Z
A Z
A Z
A Z
A Z
C Z
C Y
C Y
C X
C Y
A Z
C X
C X
A Z
A Z
C X
C Y
C Y
A Z
A X
C Y
C Y
C X
A Y
C X
A Z
A Z
A Y
C Y
A Y
C X
C X
A Z
A Z
C Y
A Z
C X
A Y
A Y
A Z
C Y
A Z
C X
A Y
A Z
A Z
A Z
A Z
C Y
A Y
C Y
A Z
A Z
A X
A Y
A Y
A Z
C Y
A Z
A X
A Z
B Z
C X
C X
C Y
A Z
A Z
C X
C Z
A Z
C X
C Y
A Z
B Z
A Z
B Z
A X
A Y
A Z
A Z
A Z
A Z
C Y
A Z
A Z
A Z
B Z
A Z
C X
C X
A Z
C X
A X
A Z
A Y
A Y
A X
A Z
A Z
A Z
A Z
B Z
A Z
C Y
C Y
C X
C X
B Z
C Y
A Z
C Y
A Z
A Y
C Y
A X
A Y
C X
A Y
C X
A Z
A Z
B Z
A Y
C Y
C X
A Z
A Z
C X
A Y
A Z
A Z
A X
A Y
A Y
A Y
A Z
A Y
A Z
C X
A X
A Z
A Z
C Y
A Z
C X
A Z
C Y
A Y
A Z
A Z
A Z
A Z
C Y
A X
A Z
A Z
A Y
A Z
B Z
A X
A Y
C X
C X
A Y
A Z
C Y
A Z
A Y
A Y
A Z
A Y
A Y
A Z
A Z
A Z
C X
A Z
A Y
A Z
A Z
C Y
A Z
C X
A Y
C X
C Y
A Z
C Y
A Z
A Y
C Y
C Y
A Z
C X
C X
C X
A Z
A Z
A Y
C X
A Z
A X
A Z
A Z
C X
A Z
C Y
A Y
A Z
A Y
A Z
A Z
C Y
A Z
C X
A Z
A X
A Z
A Z
C X
A Z
A Z
C Y
C X
A Z
C Y
C X
C X
A Z
A Z
A Z
A X
C X
A Z
A Z
C Y
A Y
C X
A Y
C X
C Y
A Y
A Z
C X
A Z
B Y
A X
B Z
A Y
A X
C Y
A Z
A X
A Z
A Z
C Y
A Z
B Z
C X
C X
B Y
A Z
A Z
A Z
C Y
C X
A Z
A Y
A Y
A Y
C Y
C X
A Z
A X
A X
A X
A Z
A Z
A Z
A Z
C X
C X
A Z
C X
A Y
C X
B Z
A Z
A Z
C X
A Z
C X
C X
C X
A Y
C Y
C X
A Y
C X
C Y
B Z
A Z
C X
A Z
A X
B Z
A Y
B Y
A Z
A Z
A X
A Z
A X
A Z
A Z
C X
C Y
A X
C Y
C X
A Z
A Z
A Z
C Y
A X
A Y
A Z
A Y
C X
B Z
A Z
A Y
C Z
C X
A Z
A Z
A Z
B Z
A X
C X
A Z
A Z
B Z
A Z
A Z
B Z
A Z
C X
A Z
C X
A Z
C X
A Z
C Y
A Z
A X
A Y
A Y
C X
A Y
C X
B Z
A Z
A Z
A Z
A Z
C X
A Z
C X
A Z
A Y
A Z
B Z
A Y
C Z
A Y
C X
A Z
A Z
A Y
B Z
A X
C Y
A Z
A Y
A Z
A Y
A Y
A Z
A Z
A Z
A X
A Z
C Y
A Y
A X
A Y
C X
A Y
C X
A X
C X
A Z
C Y
A Y
A Z
A Z
A X
A Y
C X
C X
A Y
A X
A Z
B Z
A Y
A Z
A X
A Z
B Y
A Y
A Y
A Z
C X
A Z
A Z
A Y
A Z
C Z
A Z
A Z
A Z
A Z
C Y
C Y
A Y
B Z
C Y
A Y
C Y
A Z
A Z
A Z
A Z
C Y
A Z
A Z
C Y
C X
A Y
A Y
A Z
C X
C Z
C X
C X
A Z
A Z
A Y
A Z
A X
C Y
A Z
A Z
C Y
C X
A X
A Z
A Z
A X
C X
C X
C X
A Z
A X
C X
C Y
A X
A Z
C X
A Z
A Z
C X
A Y
A Z
A Z
A Y
A Z
C X
A Z
A Z
C X
A Y
A Z
A Z
C X
A Z
A Y
A Z
C Y
A X
A Z
A Z
C X
A Z
A Y
C Y
B Z
A Z
A Y
C X
A Z
B Z
A Z
C Z
A X
A Z
A Z
C Y
A Z
A Y
C X
C Y
A Z
A Z
A Y
A X
C Y
A Y
C X
C Y
A Z
C Y
A Z
C X
A Z
A Z
A X
A Z
A Z
B X
A X
A Z
C Y
A Z
A X
C X
A Z
A Z
C X
C Y
C Y
A X
A Y
C Y
A Y
A Z
A Z
A Z
A Z
A Y
C X
C X
C Y
C X
A Z
A X
B Z
B Y
C X
C Y
A Y
A Z
A Y
C X
C Z
A Z
A Y
C Y
C X
A Z
A Z
A Y
C X
C Z
C Y
A Z
C X
C Y
A X
A X
A Y
A Z
B Z
A X
A Y
A Y
C X
C Y
A Z
A X
A Z
A X
A Y
A Z
A Z
A Z
C X
A Z
A Z
A Z
C Z
C Y
C Y
A Z
C Y
C Y
C Y
C X
A Z
C X
C X
A Z
A Y
A Z
A Z
A X
A Y
A Y
C X
C X
A Z
A Z
A Z
A Z
A Y
A Z
A Z
A Z
A Z
A X
A X
A Y
A X
C Y
A Y
A Z
C X
A Y
A Y
A Z
A Z
A Z
C X
A Z
C X
C X
C Y
A Y
A Z
A Y
A Z
C X
C X
A Z
A Z
A Z
C X
A X
A Z
A Z
C Y
C Y
A Y
A Y
A Z
A Z
C Y
C X
C Y
A X
C Y
C X
C Y
A Z
A Z
A X
C Y
C Y
A Z
A Y
C X
A X
B Z
A Z
C X
A Y
A X
A Z
A Z
A Z
C Y
C X
A Z
C X
A Z
A Z
A Y
A Z
A Y
A X
A Z
C Z
A Z
A Z
A Z
A X
A Z
A X
C X
A Z
A Z
C Y
A X
A Z
C X
C X
A Y
A Z
A Z
C X
B X
A Z
C Y
A Z
C X
A Y
A Z
C X
A X
A Z
A X
A Z
C X
A Z
A X
A Z
C X
C Y
A Y
A X
A X
A Z
C Y
C Y
A Y
A Y
A Y
A X
A Z
A Z
A Z
C Y
C Y
A Y
B X
B X
A Z
C X
C X
A Z
C Y
C X
A Z
A Z
A Z
A Z
C X
A Z
A Z
C Y
A Y
C Y
A Z
C Y
C Y
A Z
C X
A Z
A X
A Z
C X
C X
A Y
B Z
A Y
C Y
A Z
C Y
A X
C X
A Y
C X
A Z
C Z
C Y
A Z
C X
C Y
A Z
A X
A Z
A Z
A Z
C X
A Z
A Z
A Z
A Z
A Z
A Z
A Z
A Z
A Z
A Y
A Z
A X
A Y
C Y
B Y
C X
B Z
A Z
A Z
A Y
B Z
A Z
A Z
C X
C Y
C X
A Y
A X
C X
C Y
A Y
C X
C Y
A Z
A Z
A Z
A Y
C X
A Y
C X
B Z
A Z
A Y
A Z
A Z
A Y
C X
A Z
C X
C Y
A Y
A Z
B Z
C X
A Y
C X
A Y
A Z
C X
A X
C X
B Y
C X
A Z
A Y
A Z
A Y
A X
C X
C X
A Y
C X
A Y
A Y
A X
B Y
A Y
C X
C X
A Y
B Z
B X
B Z
A Y
A Z
C Y
A Y
B Y
A Z
C X
A Z
A Z
A Z
A Z
B Z
C X
C Y
A Z
C Y
C Y
A X
C X
A Z
A Z
A Z
C X
C X
C X
A Y
C Z
C Z
A Z
C X
A Y
A Z
A Z
A Z
C X
A Z
A X
A Z
A Z
A Z
A Z
A Y
C Y
C X
A X
A Y
C X
A X
A Z
A Z
C X
A Z
A X
A Z
A Z
A X
A Z
A Z
A X
A Z
A X
B Y
A Y
A Y
C Y
A Z
A Y
C X
A Z
A Y
A X
C Y
B X
C Y
A Z
C X
A Y
A Z
A Y
A X
C Y
A Z
A Z
C Y
C X
A Z
C X
A Y
C X
A Z
A Y
A Z
A Z
A Z
A Y
A Z
C X
C X
A X
C X
C X
A Z
C X
A Z
C Y
C X
A Z
A Z
A Z
C X
A X
C Y
A Z
C Y
A X
A Z
C X
A Z
A Z
A X
A Z
C X
B X
A Z
A Z
A Z
C X
A Y
A Y
A X
C Y
C Y
A Z
A Y
A Z
A Z
C X
A X
A Y
A Z
A Z
A Z
A Z
B Z
C X
C X
C X
A Z
C Z
A X
C X
A Z
C Y
A Z
A Z
A Y
A Y
C X
A Z
A X
A Z
A Z
A Z
A Z
C Y
A Z
A Y
A X
A X
A Z
C X
A X
A X
A Z
A Y
C X
A Z
A Z
A Y
A Z
B Z
C X
C X
C Z
C Y
C X
A Z
C Y
A Z
C Z
A Z
A Y
A Y
A X
A X
A Z
A Y
A Y
A Y
A Y
A Z
C Y
A Z
A Z
C X
A Z
A Z
C Y
A Y
C X
A Y
C X
A Z
B Z
A X
B X
A Y
A X
A Y
B Z
A Y
A Z
C Y
C Y
A Z
A X
A Z
A Z
C Z
A Z
A Y
C X
A Y
C X
A X
A Y
C Y
A Y
A Z
A Z
C X
C X
B Z
A Z
A Z
A X
C X
C Y
A Z
A Z
A X
C X
C Z
A Z
C Y
A Y
B Z
C Y
A Z
C X
A X
A Z
A Z
A Z
A Y
C Y
A Z
C Y
A Z
A Z
A Z
A Z
A Y
C X
A Y
C Y
B Z
A Z
C X
C Y
A Z
C X
A Z
C X
C Z
A Z
C X
C X
A Z
A Z
A Y
A Y
A Y
C X
A Y
A Z
A Z
A Z
A Z
A Z
A Z
A Y
A Z
A X
C Y
A Z
A Z
A Z
A Y
A Z
A Z
A Z
A Z
C X
B Z
A Z
A Y
A Y
A X
A Z
A Z
C Z
A Z
C X
A Y
A X
B Z
A Z
A Z
A Z
C Y
C Z
C X
A Z
C Y
C Y
C Y
C X
B Z
A Z
A Z
C Z
A X
A Z
A Z
A Z
C X
A Z
A Z
C Y
C Y
A Z
A Z
C X
A Y
C Y
C Y
A Z
A Z
A X
A Z
A Z
A X
A X
C X
A Z
A X
C X
C X
A Z
A X
A Z
C X
C X
C X
C Y
A Z
A Z
A X
A Z
A Y
A Z
A Z
C Y
A Z
A Z
A Z
A X
A Z
C X
A X
A Z
A Z
A Z
A Z
A Z
A Z
A Z
A Y
A X
A Y
A X
C Y
A Z
A Z
C X
A Z
A Z
A Z
A X
A Z
A Z
A Y
C X
A Y
A Z
C X
A X
A Y
A Z
A Z
A X
A Z
A Y
C X
A Y
A Z
A Z
A Z
A Z
C X
C Y
A Z
B Z
C X
A Z
A Z
C Y
C Y
C X
A X
C Y
B Y
A Z
A Z
A Z
C Y
A Z
A X
A Y
A Z
A Z
A Z
C Y
A Z
C Y
C X
A Z
A Z
A Z
A Z
A Z
A X
A Z
A Z
C X
A Z
A Y
C Z
A Z
A Z
A Z
B X
C X
A Z
A Z
A Z
A Z
C X
A Z
A Z
A Y
A X
C X
C Y
A X
A Y
C X
A Z
A Z
C X
C X
A Z
C X
A Z
A Y
C X
A Z
B X
B Y
A X
C Y
A X
A Y
C Y
A Z
A Z
A Z
C X
A Z
A X
A Z
C Y
A Z
A Z
C X
A Z
A Z
A Y
A Z
A X
A Y
A Z
C X
C Y
B X
C Y
A Y
A Z
C X
A Z
C X
C Y
A X
A X
A Z
A Z
C Y
A Y
A Y
A Z
A Z
C X
A X
C X
A X
A Y
C X
A Z
A Z
B Y
A Z
A Z
A Z
A Z
A Z
A X
A Y
A X
A Z
A Z
C X
A Y
A Z
C Y
C X
C X
C X
C X
C Y
A X
A X
C Y
A X
A Y
A Y
B Z
A Z
B Y
C Y
A X
A Y
A Z
A Z
A Z
A X
C X
A Z
A Z
A Z
A Z
A Z
A Y
A Z
B Z
A Z
A Z
A Y
C Y
C Y
C X
A Z
A X
C X
A Y
B Z
C X
A Z
C X
C Y
C Y
A X
A X
C X
A Z
A Z
A Y
A X
A X
A Z
C Y
B X
A Z
A Z
A Z
A Z
A Y
A Y
A Z
C Y
C Y
A X
A Z
A Z
C Y
A Y
A Y
A X
A Y
A X
A X
A X
A Z
A Z
A Y
A Z
C X
A Z
A Y
A Z
A Z
A Y
A Z
A Z
C X
A Z
A Y
A Z
A Z
A Z
A Z
A Z
A Z
A Y
C X
B Z
C Z
A Z
A Y
A X
A X
C Y
C Y
A X
C X
B Z
A Z
C X
A Z
A Z
A Z
A Z
A Z
A Z
A Z
A Y
A Z
A Z
A Y
A Z
A Y
A Y
A Z
A Z
A Y
A Z
C Y
A Z
A Z
A Z
C X
C X
A Z
C Y
A Z
A Z
C X
A Z
C X
A Y
A Z
C Y
A Z
A Z
C X
C Y
A Z
C X
C X
A X
A Y
C Y
A Y
A Z
C X
A Z
A Z
A X
A Z
C Y
A Z
C X
A Z
C X
A Z
C X
A Y
C Y
A X
A Z
A Z
C Y
A X
A Z
A Y
B Z
A Z
A X
A Z
A Z
A X
C X
A Z
A Z
C Y
A Z
A Y
A Z
C Y
A Z
A Y
A Z
C Z
A Y
A Z
A Y
C Y
A Z
C X
A X
B Z
C X
C X
A Z
A Z
A Y
A X
A Z
A Z
B Z
A Z
C Z
A X
A Z
A Z
A Z
A Z
A X
A X
A Z
A X
A Z
A Z
A Z
A X
C X
C Y
A X
C X
C X
A Z
A X
C Y
B Z
A Z
A Z
C X
B X
A Z
A Z
C X
C X
B Z
C Y
A Z
A Z
C X
A X
A Y
C Y
C Y
B Z
A Y
C X
A Z
A Z
A Y
C X
A Z
A Z
C X
C Y
A Z
C X
C Y
C Y
C X
C Y
A Z
C Y
A Z
C X
A Z
C Y
C Z
A Z
B Z
A Z
C X
C X
B Y
B Z
C Y
C X
C X
A Y
C X
C X
A Z
A Y
A Z
C X
A X
A Z
A Z
A Z
A Z
A Z
A Z
A Z
C X
C X
A Z
C Y
C X
A Z
B Z
A Z
A Z
A X
C X
A Y
A Z
A Z
A Y
A X
C Y
B X
A Z
A X
C Y
C X
C X
C Y
C Y
A Z
A Z
C Y
A Z
A Y
C Y
A Y
C X
A Z
C X
C Y
C Y
A Z
A Z
A X
A Y
A Z
A X
A Z
A Z
A Z
C Y
A Z
A Z
C X
C Y
A Z
A Z
A Z
C Y
C X
A Z
C X
A Z
A Z
A Z
A X
A Z
A Z
A Y
B Z
A Z
A Z
A Z
C Y
A Z
B Z
A Z
C Z
A Z
A Y
C X
C Y
C X
C X
A Z
A Z
A Y
A Y
A Z
A Y
B Z
C Y
A Y
A Z
C X
A Z
A Z
C Y
A Y
A Z
A Y
C Y
A Z
A Z
A X
B Z
A Z
A X
C X
A Z
C Y
C Y
A Z
B Y
A Y
A Z
A Z
A Z
A Z
C X
C X
A Z
C X
A Y
A Z
A Z
C Y
A Z
A Z
C Y
C X
B Z
A Y
A Y
C X
C X
A Z
A X
B Z
A Z
C Y
A Z
A Y
A Z
A Z
A Y
C Y
C X
A Z
C X
A Z
C Y
A Z
C Y
A Y
A Z
A Y
A Z
C X
A Z
A Z
C X
A Z
B Y
A Z
A Z
C Y
C X
C X
A Z
A Z
C X
B Z
A Y
A Z
A Y
A Z
A Z
A Y
A X
C X
C X
A X
A Z
A Y
A Y
A Z
A Y
A Z
A Z
C Y
A X
A Z
A Z
C X
A Z
A X
B X
C X
A Z
A Y
B Z
C X
C Y
A Z
B Z
C Y
A Z
A Z
A X
A Z
A Z
A Z
A Z
A Z
A Z
A Z
`;
//#endregion