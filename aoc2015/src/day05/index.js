import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let niceStrings = [];
  let aCount = 0;
  let eCount = 0;
  let iCount = 0;
  let oCount = 0;
  let uCount = 0;

  //nice checks
  for (let i = 0; i < input.length; i++) {
    let doubleCount = 0;
    let string = input[i];
    //3 vowels
    aCount = eCount = iCount = oCount = uCount = 0;
    for (let x = 0; x < string.length; x++) {
      switch (string[x]) {
        case 'a':
          aCount++;
          break;
        case 'e':
          eCount++;
          break;
        case 'i':
          iCount++;
          break;
        case 'o':
          oCount++;
          break;
        case 'u':
          uCount++;
          break;
      }
    }
    if (aCount + eCount + iCount + oCount + uCount < 3) {
      continue;
    }

    //1+ double letter

    for (let x = 0; x < string.length - 1; x++) {
      // get chars from string
      let charOne = string[x];
      let charTwo = string[x + 1];
      // compare 0 & 1 pos chars
      if (charOne === charTwo) {
        doubleCount++;
      }
    }
    // if no dupes, continue;
    if (doubleCount < 1) {
      continue;
    }

    //NO {ab,cd,pq,xy}
    if (string.includes('ab') || string.includes('cd') || string.includes('pq') || string.includes('xy')) {
      continue;
    }

    niceStrings.push(string)
  }
  return niceStrings.length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let niceStrings = [];

  //nice checks
  for (let i = 0; i < input.length; i++) {
    let dupeCount = 0;
    let pairCount = 0;
    let string = input[i];

    //pair of any two letters that appear >=twice w/o overlapping
    for (let y = 0; y < string.length - 1; y++) {
      for (let z = y + 2; z < string.length - 1; z++) {
        if (string[y] + string[y + 1] === string[z] + string[z + 1]) {
          pairCount++;
        }
      }
    }
    if (!pairCount) {
      continue;
    }

    //letter that repeats with 1 letter in-between 
    for (let x = 0; x < string.length - 2; x++) {
      if (string[x] === string[x + 2]) {
        dupeCount++;
      }
    }
    if (dupeCount < 1) {
      continue
    }

    niceStrings.push(string);
  }

  return niceStrings.length;
};

run({
  part1: {
    tests: [
      { input: `ugknbfddgicrmopn`, expected: 1 },
      { input: `aaa`, expected: 1 },
      { input: `jchzalrnumimnmhp`, expected: 0 },
      { input: `haegwjzuvuyypxyu`, expected: 0 },
      { input: `dvszwmarrgswjxmb`, expected: 0 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `qjhvhtzxzqqjkmpb`, expected: 1 },
      { input: `xxyxx`, expected: 1 },
      { input: `uurcxstgmygtbstg`, expected: 0 },
      { input: `ieodomkazucvgmuy`, expected: 0 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
