import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

function checkBingo(card) {
  let rowBingo, columnBingo;  //check rows
  for (let i = 0; i < card.length; i++) {
    let row = card[i];

    rowBingo = isNaN(row[0]) && isNaN(row[1]) && isNaN(row[2]) && isNaN(row[3]) && isNaN(row[4]);
    columnBingo = isNaN(card[0][i]) && isNaN(card[1][i]) && isNaN(card[2][i]) && isNaN(card[3][i]) && isNaN(card[4][i]);

    if (rowBingo || columnBingo) {
      return true;
    }
  }
  return false;
}

function getUnmarkedSum(card) {
  let winners = [];
  card.forEach(row => {
    row.forEach(square => {
      if (!isNaN(square)) {
        winners.push(parseInt(square))
      }
    });
  });
  return winners;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let callNumbers = input.shift().split(',');
  let bingoCards = [];
  input.shift();
  while (input.length > 0) { // put each bingo card in it's own array element
    bingoCards.push(input.splice(0, 5));
    input.shift();
  }
  bingoCards.forEach(currentCard => {
    currentCard.forEach((cardRow, index) => { // separate each value
      cardRow = cardRow.split(' ');
      for (let i = 0; i < cardRow.length; i++) {
        if (isNaN(parseInt(cardRow[i]))) {
          cardRow.splice(i--, 1);
        } else {
          cardRow[i] = parseInt(cardRow[i]);
        }
      }
      currentCard[index] = cardRow;
    });
  });
  // "call" each callNumber
  for (let j = 0; j < callNumbers.length; j++) {
    // console.log(`Pulling: ${callNumbers[j]}`);
    //mark all cards
    bingoCards.forEach(currentCard => {
      currentCard.forEach(currentRow => {
        currentRow.forEach((square, index) => {
          if (square == parseInt(callNumbers[j])) {
            currentRow[index] += '*';
          }
        })
      })
    });

    //check all cards for bingo
    for (let i = 0; i < bingoCards.length; i++) {
      let currentCard = bingoCards[i];
      if (checkBingo(currentCard)) {
        let nonDottedSum = getUnmarkedSum(currentCard).reduce((a, b) => a + b, 0);
        return nonDottedSum * callNumbers[j];
      }
    }
  }

  return 'oh no';
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let callNumbers = input.shift().split(',');
  let bingoCards = [];
  let bingoIndexes = [];
  input.shift();
  while (input.length > 0) { // put each bingo card in it's own array element
    bingoCards.push(input.splice(0, 5));
    input.shift();
  }
  bingoCards.forEach(currentCard => {
    currentCard.forEach((cardRow, index) => { // separate each value
      cardRow = cardRow.split(' ');
      for (let i = 0; i < cardRow.length; i++) {
        if (isNaN(parseInt(cardRow[i]))) {
          cardRow.splice(i--, 1);
        } else {
          cardRow[i] = parseInt(cardRow[i]);
        }
      }
      currentCard[index] = cardRow;
    });
  });
  let bingoCardsCopy = [...bingoCards];
  // "call" each callNumber
  for (let j = 0; j < callNumbers.length; j++) {
    // console.log(`Pulling: ${callNumbers[j]}`);
    //mark all cards
    bingoCards.forEach(currentCard => {
      currentCard.forEach(currentRow => {
        currentRow.forEach((square, index) => {
          if (square == parseInt(callNumbers[j])) {
            currentRow[index] += '*';
          }
        })
      })
    });

    //check all cards for bingo
    for (let i = 0; i < bingoCards.length; i++) {
      let currentCard = bingoCards[i];
      if (checkBingo(currentCard)) {
        bingoIndexes.push(i);
        bingoCards.splice(i--, 1);
        if (bingoCards.length == 0) { // no more cards do not have bingo
          let nonDottedSum = getUnmarkedSum(currentCard).reduce((a, b) => a + b, 0);
          return nonDottedSum * callNumbers[j];
        }
      }
    }
  }
  return 'oh no';
};

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19
      
3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6
      
14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`, expected: 4512
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19
      
3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6
      
14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`, expected: 1924
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
