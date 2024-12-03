import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let oneLineInput = input.toString();
  let multSums = 0;

  let regex = /mul\([0-9]+,[0-9]+\)/g
  let matches = oneLineInput.match(regex);

  for (let i = 0; i < matches!.length; i++) {
    let currentMatch = matches![i];
    currentMatch = currentMatch.replace('mul(','').replace(')','');
    let nums = currentMatch.split(',');

    multSums += (Number(nums[0]) * Number(nums[1]));
  }

  return multSums;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let oneLineInput = input.toString();
  let multSums = 0;

  let regex = /mul\([0-9]+,[0-9]+\)|don't\(\)|do\(\)/g
  let matches = oneLineInput.match(regex);
  let recording = true;

  for (let i = 0; i < matches!.length; i++) {
    let currentMatch = matches![i];
    if (currentMatch == "don't()"){
      recording = false;
      continue;
    }else if (currentMatch == "do()"){
      recording = true;
      continue;
    }
    if(recording){
      currentMatch = currentMatch.replace('mul(','').replace(')','');
      let nums = currentMatch.split(',');
      multSums += (Number(nums[0]) * Number(nums[1]));
    }
  }

  return multSums;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
