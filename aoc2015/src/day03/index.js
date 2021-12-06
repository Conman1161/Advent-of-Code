import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput)[0];
  let santaVisited = [];

  //start at 0,0 on grid
  let santaX = 0;
  let santaY = 0;

  for (let i = 0; i < input.length; i++) {
    let currentMovement = input[i];
    let hasCurrentHouse = santaVisited.find(current => current == `${santaX},${santaY}`);

    if (!hasCurrentHouse) {
      santaVisited.push(`${santaX},${santaY}`);
    }

    switch (currentMovement) {
      case '^': //north
        santaY += 1;
        break;
      case 'v': //south
        santaY -= 1;
        break;
      case '>': //east
        santaX += 1;
        break;
      case '<': //west
        santaX -= 1;
        break;
    }
  }

  return santaVisited.length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)[0];
  let santaVisited = [];
  let roboVisited = [];

  //start at 0,0 on grid
  let santaX = 0;
  let santaY = 0;
  let roboX = 0;
  let roboY = 0;


  for (let i = 0; i < input.length; i++) {
    let currentMovement = input[i];
    let hasCurrentHouse;
    if (i % 2 == 0) {
      //santa's move
      hasCurrentHouse = santaVisited.find(current => current == `${santaX},${santaY}`);
      if (!hasCurrentHouse) {
        santaVisited.push(`${santaX},${santaY}`);
      }
      switch (currentMovement) {
        case '^': //north
          santaY += 1;
          break;
        case 'v': //south
          santaY -= 1;
          break;
        case '>': //east
          santaX += 1;
          break;
        case '<': //west
          santaX -= 1;
          break;
      }
    } else {
      //robo's move
      hasCurrentHouse = roboVisited.find(current => current == `${roboX},${roboY}`);
      if (!hasCurrentHouse) {
        roboVisited.push(`${roboX},${roboY}`);
      }

      switch (currentMovement) {
        case '^': //north
          roboY += 1;
          break;
        case 'v': //south
          roboY -= 1;
          break;
        case '>': //east
          roboX += 1;
          break;
        case '<': //west
          roboX -= 1;
          break;
      }
    }
  }

  return [... new Set(santaVisited.concat(roboVisited))].length;
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
