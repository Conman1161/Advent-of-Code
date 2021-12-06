import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  let floor = 0;

  const input = parseInput(rawInput)[0];
  for (let i = 0; i < input.length; i++) {
    if (input[i] == '(') {
      floor += 1;
    } else {
      floor -= 1;
    }
  }

  return floor;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)[0];
  let floor = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] == '(') {
      floor += 1;
    } else {
      floor -= 1;
    }
    if (floor == -1) {
      return i + 1;
    }
  }
  return floor;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" }, no example provided
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" }, 
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
