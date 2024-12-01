import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const initialInput = parseInput(rawInput);

  let distance:number = 0;
  let columnOne:number[] = [];
  let columnTwo:number[] = [];
  let input = initialInput.split('\n');
  input.forEach(pair => {
    let tempPair = pair.split("   ");
    columnOne.push(Number(tempPair[0]));
    columnTwo.push(Number(tempPair[1]));
  });
  columnOne.sort();
  columnTwo.sort();

  for(let i = 0; i < columnOne.length; i++){
    let tempOne = columnOne[i];
    let tempTwo = columnTwo[i];

    distance += Math.abs(tempOne - tempTwo)
  }
  return distance;
};

const part2 = (rawInput: string) => {
  const initialInput = parseInput(rawInput);

  let similarityScore:number = 0;
  let columnOne:number[] = [];
  let columnTwo:number[] = [];
  let input = initialInput.split('\n');
  input.forEach(pair => {
    let tempPair = pair.split("   ");
    columnOne.push(Number(tempPair[0]));
    columnTwo.push(Number(tempPair[1]));
  });
  columnOne.sort();
  columnTwo.sort();
  
  for(let x = 0; x < columnOne.length; x++){
    let currentColumnOneNumber = columnOne[x];
    let matchOccurrences = 0;
    for(let y = 0; y < columnTwo.length; y++){
      let currentColumnTwoNumber = columnTwo[y];
      if (currentColumnTwoNumber > currentColumnOneNumber){
        break;
      } else if(currentColumnTwoNumber < currentColumnOneNumber){
        continue;
      } else{
        matchOccurrences += 1;
      }
    }
    similarityScore+=(currentColumnOneNumber*matchOccurrences)
  }
  return similarityScore;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
