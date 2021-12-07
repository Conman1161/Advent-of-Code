import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split(',');

const part1 = (rawInput) => {
  const input = parseInput(rawInput).map(Number);
  let inputCopy = [...input].sort((a, b) => a - b, 0);
  let bestPosition = inputCopy[inputCopy.length / 2]; // median

  let fuelUsed = 0;
  for (let i = 0; i < inputCopy.length; i++) {
    fuelUsed += Math.abs(inputCopy[i] - bestPosition);
  }

  return fuelUsed;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).map(Number);
  let inputCopy = [...input].sort((a, b) => a - b, 0);
  /**
  //!Average rounded up - needs to be 5 in test, 465 in prod???
  //!Should be Triangle Numbers
  */
  let bestPosition = Math.ceil(inputCopy.reduce((a, b) => a + b, 0) / inputCopy.length) - 1;

  let fuelUsed = 0;
  for (let i = 0; i < inputCopy.length; i++) {
    // for each increase from a to b, increase fuelUsed by new+old increase(s)
    let pos1 = input[i];
    let pos2 = bestPosition;
    let distance = Math.abs(pos1 - pos2);
    let currentFuelUsed = 0;
    for (let j = 1; j < distance + 1; j++) { // :shrug:
      currentFuelUsed += j;
    }
    fuelUsed += currentFuelUsed;
  }

  return fuelUsed;
};

run({
  part1: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
