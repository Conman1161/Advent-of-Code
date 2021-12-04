import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

function getFrequentByte(bitNumber, input) {
  let zeroCount = 0, oneCount = 0;
  input.forEach(value => {
    if (value[bitNumber] == 0) zeroCount++;
    if (value[bitNumber] == 1) oneCount++;
  });
  if (zeroCount > oneCount) return 0;
  if (zeroCount < oneCount) return 1;
  return -1;
}

function invertBits(bits) {
  let newBits = '';
  for (let i = 0; i < bits.toString().length; i++) {
    if (bits[i] == 0) {
      newBits += '1';
    } else {
      newBits += '0';
    }
  }
  return newBits;
}

function getRatings(bits) {
  let types = ['oxygen', 'co2'];
  let runningBit = '';
  let finalBits = [];

  for (let i = 0; i < types.length; i++) {
    let index = 0;
    runningBit = '';
    let currentBits = [...bits];
    while (currentBits.length > 1) {// while there are all but one bit left
      let freqByte = getFrequentByte(index, currentBits);
      if (types[i] === 'oxygen') {
        if (freqByte == -1) {
          freqByte = '1';
        }
      } else {
        if (freqByte == 0) freqByte = '1';
        else freqByte = '0';
      }
      runningBit += freqByte;

      //remove bits that don't match finalBit
      for (let j = 0; j < currentBits.length; j++) {
        if (currentBits[j].slice(0, runningBit.length) != runningBit) {
          currentBits.splice(j--, 1);
        }
      }
      index++;
    }
    finalBits.push(currentBits[0]);
  }

  return finalBits;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let frequentBits = '';
  for (let i = 0; i < input[0].length; i++) {
    frequentBits += getFrequentByte(i, input);
  }
  let inverseBits = invertBits(frequentBits);
  return parseInt(frequentBits, 2) * parseInt(inverseBits, 2);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let ratings = getRatings(input);
  let oxygen = parseInt(ratings[0], 2);
  let co2 = parseInt(ratings[1], 2);

  return oxygen * co2;
};

run({
  part1: {
    tests: [
      {
        input:
          `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`, expected: 198
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`, expected: 230
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
