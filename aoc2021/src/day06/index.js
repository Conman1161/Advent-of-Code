import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split(',');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let desiredDays = 80;
  let fishTimers = [...input].map(Number); // convert input to array of Numbers
  let fishCount = {};
  fishTimers.forEach(timer => {
    /*
    Take every timer from input and put it into fishCount as a key:value pair
    This is to make the cycling smaller so processing is faster than an array of all fishes at once
    */
    if (fishCount[timer] === undefined) fishCount[timer] = 0;
    fishCount[timer] += 1;
  });

  for (let i = 0; i < desiredDays; i++) {
    let newFishCount = {};
    for (let j = 0; j < Object.keys(fishCount).length; j++) { // for each timer
      let currentFishTimer = parseInt(Object.keys(fishCount)[j]); // get the current timer value
      let currentTimerCount = fishCount[currentFishTimer]; // get the amount of fish in that timer value
      if (currentFishTimer > 0) { // if fish has time left on timers
        // if timer-1 doesn't exist
        if (newFishCount[currentFishTimer - 1] === undefined) newFishCount[currentFishTimer - 1] = 0;
        newFishCount[currentFishTimer - 1] += currentTimerCount; // move current timer(s) down 1
      } else { // timer needs to "turn over"
        // if timer hasn't been created yet
        if (newFishCount[6] === undefined) newFishCount[6] = 0;
        if (newFishCount[8] === undefined) newFishCount[8] = 0;
        newFishCount[6] += currentTimerCount; // add pre-duped fish
        newFishCount[8] += currentTimerCount; // add duped-fish
      }
    };
    fishCount = newFishCount;
  };
  return Object.values(fishCount).reduce((a, b) => a + b, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let desiredDays = 256;
  let fishTimers = [...input].map(Number); // convert input to array of Numbers
  let fishCount = {};
  fishTimers.forEach(timer => {
    /*
    Take every timer from input and put it into fishCount as a key:value pair
    This is to make the cycling smaller so processing is faster than an array of all fishes at once
    */
    if (fishCount[timer] === undefined) fishCount[timer] = 0;
    fishCount[timer] += 1;
  });

  for (let i = 0; i < desiredDays; i++) {
    let newFishCount = {};
    for (let j = 0; j < Object.keys(fishCount).length; j++) { // for each timer
      let currentFishTimer = parseInt(Object.keys(fishCount)[j]); // get the current timer value
      let currentTimerCount = fishCount[currentFishTimer]; // get the amount of fish in that timer value
      if (currentFishTimer > 0) { // if fish has time left on timers
        // if timer-1 doesn't exist
        if (newFishCount[currentFishTimer - 1] === undefined) newFishCount[currentFishTimer - 1] = 0;
        newFishCount[currentFishTimer - 1] += currentTimerCount; // move current timer(s) down 1
      } else { // timer needs to "turn over"
        // if timer hasn't been created yet
        if (newFishCount[6] === undefined) newFishCount[6] = 0;
        if (newFishCount[8] === undefined) newFishCount[8] = 0;
        newFishCount[6] += currentTimerCount; // add pre-duped fish
        newFishCount[8] += currentTimerCount; // add duped-fish
      }
    };
    fishCount = newFishCount;
  };
  return Object.values(fishCount).reduce((a, b) => a + b, 0);
}
run({
  part1: {
    tests: [
      { input: `3,4,3,1,2`, expected: 5934 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `3,4,3,1,2`, expected: 26984457539 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
