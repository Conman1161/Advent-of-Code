import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let subX = 0;
  let subY = 0;

  for (let i = 0; i < input.length; i++) {
    let direction = input[i];
    direction = direction.split(' ');
    switch (direction[0]) {
      case 'forward':
        subX += parseInt(direction[1]);
        break;
      case 'down':
        subY += parseInt(direction[1]);
        break;
      case 'up':
        subY -= parseInt(direction[1]);
        break;
    }
  }
  return subX * subY;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let subX = 0;
  let subY = 0;
  let subAim = 0;

  for (let i = 0; i < input.length; i++) {
    let direction = input[i];
    direction = direction.split(' ');
    switch (direction[0]) {
      case 'down':
        subAim += parseInt(direction[1]);
        break;
      case 'up':
        subAim -= parseInt(direction[1]);
        break;
      case 'forward':
        subX += parseInt(direction[1]);
        subY += parseInt(subAim * direction[1])
        break;
    }
  }
  return subX * subY;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
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
