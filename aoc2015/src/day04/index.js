import run from "aocrunner";
import path from 'path';
import md5 from 'md5'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput)[0];

  for (let i = 0; i < 1000000; i++) {
    let current = input.concat(i);
    let currentHash = md5(current);
    let currentSlice = currentHash.slice(0, 5);
    if (currentSlice === '00000') {
      return i;
    }
  }
  return 'oh no';
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)[0];

  for (let i = 0; i < 10000000; i++) {
    let current = input.concat(i);
    let currentHash = md5(current);
    let currentSlice = currentHash.slice(0, 6);
    if (currentSlice === '000000') {
      return i;
    }
  }
  return 'oh no';
};

run({
  part1: {
    tests: [
      { input: `abcdef`, expected: 609043 },
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
