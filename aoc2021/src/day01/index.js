import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let increaseCount = 0;
  let prev = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] > prev) {
      increaseCount++;
    }
    prev = input[i];
  }
  return increaseCount;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let increaseCount = 0;
  let prev = 0;

  for (let i = 0; i < input.length; i++) {
    let triplet = parseInt(input[i]) + parseInt(input[i + 1] || 0) + parseInt(input[i + 2] || 0)
    increaseCount += triplet > prev
    prev = triplet
  }
  return increaseCount - 1;
};

run({
  part1: {
    tests: [
      {
        input: `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`, expected: 7
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`, expected: 5
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
