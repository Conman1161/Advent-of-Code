import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split(',');

// TODO: GET THIS EXPLAINED AT HOC
// https://topaz.github.io/paste/#XQAAAQDoBAAAAAAAAAAxm8oZxjYXows3V67OFtTdE1VwEUwcUm0RsTsdZFLSszFRh7rxx94tYDRq62V4soq3m0HjhMcwM9yO/ACGqq+uYoMTS7VWE1vPEaOB+w3G1vsyN4hI75EipF8VrRsknk9JarcabO9sAEFRRozxpjwv5OTILggx+PSedyuPcuZF9v6hFvj6P9OysiIcfGci0TSmS/tjONKC3b43x6WYqhpBLnb05B9yIImyoFNrYS1KXixgUf5HXelIswHxOvNAVH4OV8JG3sEsjEnWb5DDGOjaJLoM9FJPS5XpPhayZn5ERzsyO6wlVEetN8nAwdtYLO+Q63UotS4EjS5VGGKHNe60dhqt2vUuDDHClS4nQesDuSr8KdPoDrG4bHrpezxspdUthkmAXO3rmcUcRdg7EOHaChjUn7Zooc01vAxqOzZ6Zu8fN0q8SgDqhhk7PrhrcrZ+8vLU6+nyafbugWGsOjy1Yh2Jqp4bPb6i6wq5QhB4fLnQX4sfASgUtL1F84H+ZsEWhwl0oQVkEoj4mR0X/YyfSomS7iaTUsff9vy9uHq5d6mg27uHBpWopDecL2DEEk5xJO/77UqlEmsBwnPpH/F/hOD4YwcfXlTaQze1Y96XNpNN+NzKB5oap/nXzxGU8lg+DqbUrsAAFF4/zONU8VC9rqse9bG/pEZ3ypmOTuzNuR762Ac6G4yj78+cKMFacryPLYl7ut6Dlf7wW/I=

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let desiredDays = 80;
  let fishTimers = [...input].map(Number);
  let fishCount = {};
  fishTimers.forEach(timer => {
    if (fishCount[timer] === undefined) fishCount[timer] = 0;
    fishCount[timer] += 1;
  });

  for (let i = 0; i < desiredDays; i++) {
    let newFishCount = {};
    for (let fishIndex in fishCount) {
      fishIndex = parseInt(fishIndex);
      let currentFish = fishCount[fishIndex];
      if (fishIndex > 0) {
        if (newFishCount[fishIndex - 1] === undefined) newFishCount[fishIndex - 1] = 0;
        newFishCount[fishIndex - 1] += currentFish;
      } else {
        if (newFishCount[6] === undefined) newFishCount[6] = 0;
        if (newFishCount[8] === undefined) newFishCount[8] = 0;
        newFishCount[6] += currentFish;
        newFishCount[8] += currentFish;
      }
    };
    fishCount = newFishCount;
  };
  return Object.values(fishCount).reduce((a, b) => a + b, 0);;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let desiredDays = 256;
  let fishTimers = [...input].map(Number);
  let fishCount = {};
  fishTimers.forEach(timer => {
    if (fishCount[timer] === undefined) fishCount[timer] = 0;
    fishCount[timer] += 1;
  });

  for (let i = 0; i < desiredDays; i++) {
    let newFishCount = {};
    for (let fishIndex in fishCount) {
      fishIndex = parseInt(fishIndex);
      let currentFish = fishCount[fishIndex];
      if (fishIndex > 0) {
        if (newFishCount[fishIndex - 1] === undefined) newFishCount[fishIndex - 1] = 0;
        newFishCount[fishIndex - 1] += currentFish;
      } else {
        if (newFishCount[6] === undefined) newFishCount[6] = 0;
        if (newFishCount[8] === undefined) newFishCount[8] = 0;
        newFishCount[6] += currentFish;
        newFishCount[8] += currentFish;
      }
    };
    fishCount = newFishCount;
  };
  return Object.values(fishCount).reduce((a, b) => a + b, 0);;
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
