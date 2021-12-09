import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

// a includes all from b
function includes(a, b) {
  let set = new Set([...a]);
  return [...b].every((x => set.has(x)));
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let inputCopy = [...input];
  let allSignalPatters = [];
  let allOutputValues = [];
  let signalCounts = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  }
  for (let i = 0; i < inputCopy.length; i++) {
    inputCopy[i] = inputCopy[i].split(' | ');
    allSignalPatters.push(inputCopy[i][0].split(' '))
    allOutputValues.push(inputCopy[i][1].split(' '))
  }

  allOutputValues.forEach(value => {
    for (let i = 0; i < value.length; i++) {
      let currentSegment = value[i];
      if (currentSegment.length == 2) signalCounts[1]++;//1
      if (currentSegment.length == 4) signalCounts[4]++;//4
      if (currentSegment.length == 3) signalCounts[7]++;//7
      if (currentSegment.length == 7) signalCounts[9]++;//8
    }
  });

  return signalCounts[1] + signalCounts[4] + signalCounts[7] + signalCounts[9];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let inputCopy = [...input];
  let allSignalPatters = [];
  let allOutputValues = [];
  let sum = 0;
  for (let i = 0; i < inputCopy.length; i++) {
    inputCopy[i] = inputCopy[i].split(' | ');
    allSignalPatters.push(inputCopy[i][0].split(' ').map((string) => {
      let letters = [...string];
      letters.sort()
      return letters.join('');
    }));
    allOutputValues.push(inputCopy[i][1].split(' ').map((string) => {
      let letters = [...string];
      letters.sort()
      return letters.join('');
    }));
  }

  for (let i = 0; i < inputCopy.length; i++) {
    let value = allSignalPatters[i];
    let currentWires = {
      1: value.find(wire => wire.length == 2),
      4: value.find(wire => wire.length == 4),
      7: value.find(wire => wire.length == 3),
      8: value.find(wire => wire.length == 7),
    }
    // len6
    currentWires[6] = value.find(wire =>
      wire.length == 6 &&
      !includes(wire, currentWires[1]));

    currentWires[9] = value.find(wire =>
      wire.length == 6 &&
      wire != currentWires[6] &&
      includes(wire, currentWires[4]));

    currentWires[0] = value.find(wire =>
      wire.length == 6 &&
      wire != currentWires[6] &&
      wire != currentWires[9]);


    // len5
    currentWires[3] = value.find(wire =>
      wire.length == 5 &&
      includes(wire, currentWires[1]));

    currentWires[5] = value.find(wire =>
      wire.length == 5 &&
      wire != currentWires[3] &&
      includes(currentWires[6], wire));

    currentWires[2] = value.find(wire =>
      wire.length == 5 &&
      wire != currentWires[3] &&
      wire != currentWires[5]);

    const translationTable = Object.fromEntries(
      Object.entries(currentWires).map(x => x.reverse())
    );

    let digitReads = [];
    for (let j = 0; j < allOutputValues[i].length; j++) {
      let currentOutputValue = allOutputValues[i];
      let temp = Number(translationTable[currentOutputValue[j]]);
      digitReads.push(temp);
    }
    sum += Number(digitReads.join(''));
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 26
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`, expected: 5353 },
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 61229
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
