import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  //make 2D array from (0,0) to (999,999) with false  (1000x1000)    
  let grid = new Array(1000).fill(new Array(1000).fill(false));
  let litCount = 0;

  //loop through instruction
  for (let i = 0; i < input.length; i++) {
    let instruction = input[i];
    instruction = instruction.split(' ');

    if (instruction.length == 5) {
      instruction[0] = `${instruction[0]}${instruction[1]}`;
      instruction.splice(1, 1);
    }

    let startX = parseInt(instruction[1].split(',')[0]);
    let startY = parseInt(instruction[1].split(',')[1]);
    let endX = parseInt(instruction[3].split(',')[0]);
    let endY = parseInt(instruction[3].split(',')[1]);

    switch (instruction[0]) {
      case 'toggle':
        for (let x = startX; x < endX + 1; x++) {
          let row = grid[x].toString().split(',');
          for (let y = startY; y < endY + 1; y++) {
            row[y] = !JSON.parse(row[y]);
            grid[x] = row;
          }
        }
        break;
      case 'turnon':
        for (let x = startX; x < endX + 1; x++) {
          let row = grid[x].toString().split(',');
          for (let y = startY; y < endY + 1; y++) {
            row[y] = true;
            grid[x] = row;
          }
        }
        break;
      case 'turnoff':
        for (let x = startX; x < endX + 1; x++) {
          let row = grid[x].toString().split(',');
          for (let y = startY; y < endY + 1; y++) {
            row[y] = false;
            grid[x] = row;
          }
        }
        break;
    }
  }

  //find total lights on
  grid.forEach(line => {
    line.forEach(light => {
      litCount += JSON.parse(light);
    })
  });

  return litCount;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let litCount = 0;
  let grid = new Array(1000).fill(new Array(1000).fill(0));

  //loop through instruction
  for (let i = 0; i < input.length; i++) {
    let instruction = input[i];
    instruction = instruction.split(' ');

    if (instruction.length == 5) {
      instruction[0] = `${instruction[0]}${instruction[1]}`;
      instruction.splice(1, 1);
    }

    let startX = parseInt(instruction[1].split(',')[0]);
    let startY = parseInt(instruction[1].split(',')[1]);
    let endX = parseInt(instruction[3].split(',')[0]);
    let endY = parseInt(instruction[3].split(',')[1]);

    switch (instruction[0]) {
      case 'toggle':
        for (let x = startX; x < endX + 1; x++) {
          let row = grid[x].toString().split(',');
          for (let y = startY; y < endY + 1; y++) {
            row[y] = parseInt(row[y]) + 2;
            grid[x] = row;
          }
        }
        break;
      case 'turnon':
        for (let x = startX; x < endX + 1; x++) {
          let row = grid[x].toString().split(',');
          for (let y = startY; y < endY + 1; y++) {
            row[y] = parseInt(row[y]) + 1;
            grid[x] = row;
          }
        }
        break;
      case 'turnoff':
        for (let x = startX; x < endX + 1; x++) {
          let row = grid[x].toString().split(',');
          for (let y = startY; y < endY + 1; y++) {
            row[y] = parseInt(row[y]) - 1 < 0 ? 0 : parseInt(row[y]) - 1;
            grid[x] = row;
          }
        }
        break;
    }
  }

  //find total lights on
  grid.forEach((line) => {
    line.forEach((light) => {
      litCount += parseInt(light);
    })
  });

  return litCount;
};

run({
  part1: {
    tests: [
      { input: `turn on 0,0 through 999,999`, expected: 1000000 },
      { input: `toggle 0,0 through 999,0`, expected: 1000 },
      { input: `turn off 499,499 through 500,500`, expected: 0 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `turn on 0,0 through 0,0`, expected: 1 },
      { input: `toggle 0,0 through 999,999`, expected: 2000000 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
