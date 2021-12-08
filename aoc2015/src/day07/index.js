import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

function bitwiseNOT(bits) {
  bits = bits.toString(2);
  let newBits = '';
  for (let i = bits.length; i < 16; i++) {
    bits = '0' + bits;
  }
  for (let i = 0; i < bits.length; i++) {
    newBits += bits[i] == 0 ? 1 : 0;
  }
  return parseInt(newBits, 2);
}

function bitwiseAND(bitOne, bitTwo) {
  let newBit = '';
  bitOne = bitOne.toString(2);
  bitTwo = bitTwo.toString(2);

  // make both bits the same length
  for (let i = bitOne.length; i < bitTwo.length; i++) {
    bitOne = '0' + bitOne
  }
  for (let i = bitTwo.length; i < bitOne.length; i++) {
    bitTwo = '0' + bitTwo
  }

  for (let i = 0; i < bitOne.length; i++) {
    newBit += bitOne[i] == 1 && bitTwo[i] == 1 ? 1 : 0;
  }

  return parseInt(newBit, 2);
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let inputCopy = [...input];
  for (let i = 0; i < inputCopy.length; i++) {
    inputCopy[i] = inputCopy[i].split(' ');
  }
  let wires = {};
  while (isNaN(wires.a)) {
    for (let i = 0; i < inputCopy.length; i++) { // put all entires into wires
      let instruction = inputCopy[i];
      switch (instruction.length) {
        case 3: // EQUALS (value assignment)
          if (!isNaN(parseInt(wires[instruction[0]]))) { // first is wire
            wires[instruction[2]] = parseInt(wires[instruction[0]]);
          } else if (!isNaN(parseInt(instruction[0]))) { // first is number
            wires[instruction[2]] = parseInt(instruction[0]);
          } else {
            wires[instruction[2]] = instruction[0];
          }
          break;
        case 4: // NOT
          if (!isNaN(wires[instruction[1]])) {
            wires[instruction[3]] = bitwiseNOT(wires[instruction[1]]);
          } else {
            wires[instruction[3]] = [instruction[0], instruction[1]];
          }
          break;
        case 5: // AND, OR
          if (!isNaN(wires[instruction[0]]) && !isNaN(wires[instruction[2]])) { // if both are wires
            switch (instruction[1]) {
              case 'AND':
                wires[instruction[4]] = bitwiseAND(parseInt(wires[instruction[0]].toString(2), 2), parseInt(wires[instruction[2]].toString(2), 2));
                break;
              case 'OR':
                wires[instruction[4]] = parseInt(wires[instruction[0]].toString(2), 2) | parseInt(wires[instruction[2]].toString(2), 2);
                break;
            }
          } else if (!isNaN(wires[instruction[0]]) && !isNaN(instruction[2])) { // if second is number
            switch (instruction[1]) {
              case 'LSHIFT':
                wires[instruction[4]] = parseInt(wires[instruction[0]].toString(2), 2) << parseInt(instruction[2]);
                break;
              case 'RSHIFT':
                wires[instruction[4]] = parseInt(wires[instruction[0]].toString(2), 2) >> parseInt(instruction[2]);
                break;
            }
          } else if (!isNaN(instruction[0]) && !isNaN(wires[instruction[2]])) { // if right is number (only AND possible)
            wires[instruction[4]] = bitwiseAND(parseInt(instruction[0].toString(2), 2), parseInt(wires[instruction[2]].toString(2), 2));
            break;
          } else {
            wires[instruction[4]] = [instruction[0], instruction[1], instruction[2]]
          }
          break;
      }
    }
  }
  return wires.a;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let inputCopy = [...input];
  for (let i = 0; i < inputCopy.length; i++) {
    inputCopy[i] = inputCopy[i].split(' ');
  }
  let wires = {};
  while (isNaN(wires.a)) {
    for (let i = 0; i < inputCopy.length; i++) { // put all entires into wires
      let instruction = inputCopy[i];
      // override wire b
      if (instruction[instruction.length - 1] == 'b') {
        wires.b = 16076;
        continue;
      }

      switch (instruction.length) {
        case 3: // EQUALS (value assignment)
          if (!isNaN(parseInt(wires[instruction[0]]))) { // first is wire
            wires[instruction[2]] = parseInt(wires[instruction[0]]);
          } else if (!isNaN(parseInt(instruction[0]))) { // first is number
            wires[instruction[2]] = parseInt(instruction[0]);
          } else {
            wires[instruction[2]] = instruction[0];
          }
          break;
        case 4: // NOT
          if (!isNaN(wires[instruction[1]])) {
            wires[instruction[3]] = bitwiseNOT(wires[instruction[1]]);
          } else {
            wires[instruction[3]] = [instruction[0], instruction[1]];
          }
          break;
        case 5: // AND, OR
          if (!isNaN(wires[instruction[0]]) && !isNaN(wires[instruction[2]])) { // if both are wires
            switch (instruction[1]) {
              case 'AND':
                wires[instruction[4]] = bitwiseAND(parseInt(wires[instruction[0]].toString(2), 2), parseInt(wires[instruction[2]].toString(2), 2));
                break;
              case 'OR':
                wires[instruction[4]] = parseInt(wires[instruction[0]].toString(2), 2) | parseInt(wires[instruction[2]].toString(2), 2);
                break;
            }
          } else if (!isNaN(wires[instruction[0]]) && !isNaN(instruction[2])) { // if second is number
            switch (instruction[1]) {
              case 'LSHIFT':
                wires[instruction[4]] = parseInt(wires[instruction[0]].toString(2), 2) << parseInt(instruction[2]);
                break;
              case 'RSHIFT':
                wires[instruction[4]] = parseInt(wires[instruction[0]].toString(2), 2) >> parseInt(instruction[2]);
                break;
            }
          } else if (!isNaN(instruction[0]) && !isNaN(wires[instruction[2]])) { // if right is number (only AND possible)
            wires[instruction[4]] = bitwiseAND(parseInt(instruction[0].toString(2), 2), parseInt(wires[instruction[2]].toString(2), 2));
            break;
          } else {
            wires[instruction[4]] = [instruction[0], instruction[1], instruction[2]]
          }
          break;
      }
    }
  }
  return wires.a;
};

run({
  part1: {
    tests: [
      {
        input: `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
1 -> a`, expected: 1
      },
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
