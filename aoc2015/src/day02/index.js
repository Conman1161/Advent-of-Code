import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let facesSum = 0;

  for (let i = 0; i < input.length; i++) {
    let current = input[i].split('x');
    let l = current[0];
    let w = current[1];
    let h = current[2];

    let faceOne = l * w;
    let faceTwo = w * h;
    let faceThree = h * l;
    let smallestFace = [faceOne, faceTwo, faceThree].sort((a, b) => a - b)[0];
    facesSum += (2 * faceOne) + (2 * faceTwo) + (2 * faceThree);
    facesSum += smallestFace;
  }

  return facesSum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let ribbonLength = 0;

  for (let i = 0; i < input.length; i++) {
    let current = input[i].split('x');
    let l = parseInt(current[0]);
    let w = parseInt(current[1]);
    let h = parseInt(current[2]);

    // let faceOneArea = l * w;
    // let faceTwoArea = w * h;
    // let faceThreeArea = h * l;

    let faceOnePerimeter = l + l + w + w;
    let faceTwoPerimeter = h + h + w + w;
    let faceThreePerimeter = l + l + h + h;
    // let smallestFace = [faceOneArea, faceTwoArea, faceThreeArea].sort((a, b) => a - b)[0];
    let smallestPerimeter = [faceOnePerimeter, faceTwoPerimeter, faceThreePerimeter].sort((a, b) => a - b)[0];
    let volume = l * w * h;
    ribbonLength += smallestPerimeter + volume;
  }

  return ribbonLength;
};

run({
  part1: {
    tests: [
      { input: `2x3x4`, expected: 58 },
      { input: `1x1x10`, expected: 43 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `2x3x4`, expected: 34 },
      { input: `1x1x10`, expected: 14 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
