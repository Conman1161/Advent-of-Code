import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let seaFloorGrid = {};
  let commands = [...input];
  let twoPlusCount = 0;
  //split each line into digestible vars
  for (let i = 0; i < commands.length; i++) {
    //[x1,y1,x2,y2]
    commands[i] = commands[i].split(' ');
    commands[i].splice(1, 1);
    commands[i] = commands[i].toString();
    commands[i] = commands[i].split(',');
  }
  commands.forEach((currentCommand, index) => { // "trace" each command
    let x1 = parseInt(currentCommand[0]);
    let y1 = parseInt(currentCommand[1]);
    let x2 = parseInt(currentCommand[2]);
    let y2 = parseInt(currentCommand[3]);
    if (x1 != x2 && y1 != y2) return;
    // console.log(x1, y1, ' - ', x2, y2);
    // check "direction" of movement
    if (x1 < x2) {        // x+
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          //  loop through each value
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x},${y}`] += 1;
          } else {
            seaFloorGrid[`${x},${y}`] = 1;
          }
        }
      }
    } else if (x1 > x2) { // x-
      for (let x = x1; x >= x2; x--) {
        for (let y = y1; y <= y2; y++) {
          //  loop through each value
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x},${y}`] += 1;
          } else {
            seaFloorGrid[`${x},${y}`] = 1;
          }
        }
      }
    } else if (y1 < y2) { // y+
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          //  loop through each value
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x},${y}`] += 1;
          } else {
            seaFloorGrid[`${x},${y}`] = 1;
          }
        }
      }
    } else if (y1 > y2) { // y-
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y >= y2; y--) {
          //  loop through each value
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x},${y}`] += 1;
          } else {
            seaFloorGrid[`${x},${y}`] = 1;
          }
        }
      }
    }
  });
  Object.values(seaFloorGrid).forEach(value => {
    if (value >= 2) twoPlusCount++;
  })
  return twoPlusCount;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let seaFloorGrid = {};
  let commands = [...input];
  let twoPlusCount = 0;
  //split each line into digestible vars
  for (let i = 0; i < commands.length; i++) {
    //[x1,y1,x2,y2]
    commands[i] = commands[i].split(' ');
    commands[i].splice(1, 1);
    commands[i] = commands[i].toString();
    commands[i] = commands[i].split(',');
  }
  commands.forEach((currentCommand, index) => { // "trace" each command
    let x1 = parseInt(currentCommand[0]);
    let y1 = parseInt(currentCommand[1]);
    let x2 = parseInt(currentCommand[2]);
    let y2 = parseInt(currentCommand[3]);
    // check "direction" of movement

    if (x1 < x2 && y1 < y2) { // x+, y+ diagonal
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x++},${y}`] += 1;
          } else {
            seaFloorGrid[`${x++},${y}`] = 1;
          }
        }
      }
    } else if (x1 > x2 && y1 < y2) {// x-, y+ diagonal
      for (let x = x1; x >= x2; x--) {
        for (let y = y1; y <= y2; y++) {
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x--},${y}`] += 1;
          } else {
            seaFloorGrid[`${x--},${y}`] = 1;
          }
        }
      }
    } else if (x1 < x2 && y1 > y2) {// x+, y- diagonal
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y >= y2; y--) {
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x++},${y}`] += 1;
          } else {
            seaFloorGrid[`${x++},${y}`] = 1;
          }
        }
      }
    } else if (x1 > x2 && y1 > y2) {// x-, y- diagonal
      for (let x = x1; x >= x2; x--) {
        for (let y = y1; y >= y2; y--) {
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x--},${y}`] += 1;
          } else {
            seaFloorGrid[`${x--},${y}`] = 1;
          }
        }
      }
    } else if (x1 < x2) { // x+ exclusive
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          //  loop through each value
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x},${y}`] += 1;
          } else {
            seaFloorGrid[`${x},${y}`] = 1;
          }
        }
      }
    } else if (x1 > x2) { // x- exclusive
      for (let x = x1; x >= x2; x--) {
        for (let y = y1; y <= y2; y++) {
          //  loop through each value
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x},${y}`] += 1;
          } else {
            seaFloorGrid[`${x},${y}`] = 1;
          }
        }
      }
    } else if (y1 < y2) { // y+ exclusive
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          //  loop through each value
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x},${y}`] += 1;
          } else {
            seaFloorGrid[`${x},${y}`] = 1;
          }
        }
      }
    } else if (y1 > y2) { // y- exclusive
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y >= y2; y--) {
          //  loop through each value
          if (`${x},${y}` in seaFloorGrid) {
            seaFloorGrid[`${x},${y}`] += 1;
          } else {
            seaFloorGrid[`${x},${y}`] = 1;
          }
        }
      }
    }
  });
  Object.values(seaFloorGrid).forEach(value => {
    if (value >= 2) twoPlusCount++;
  })
  return twoPlusCount;
};

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, expected: 5
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, expected: 12
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
