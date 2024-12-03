import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  let safeCount = 0;

  for(let i = 0; i < input.length; i++){
    let initialInput = input[i];
    let inputAsArray = initialInput.split(" ");

    let isSafe = true;
    let increases = false, decreases = false;

    for(let x = 0; x < inputAsArray.length-1; x++){
      let currentDigit = Number(inputAsArray[x]);
      let nextDigit = Number(inputAsArray[x+1]);
      let absDifference = Math.abs(currentDigit-nextDigit);

      if(currentDigit < nextDigit){
        increases=true;
      } else if(currentDigit > nextDigit){
        decreases=true;
      } else if(currentDigit == nextDigit){
        isSafe=false;
        break;
      }

      switch(absDifference){
        case 1:
        case 2:
        case 3:
          break;
        default:
          isSafe=false;
          break;
      }
    }
    /*
    SAFE CONDITIONS:
    - [X] ALL in/decreasing
    - [] Each digit only differ by 1-3
    */

    if(increases && decreases){
      isSafe=false;
    }
    if(isSafe) {
      safeCount+=1
    }
  }
  return safeCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  let safeCount = 0;
  for(let i = 0; i < input.length; i++){
    let originalReport = input[i].split(' ');
    for(let testDigit = 0; testDigit < originalReport.length; testDigit++){
      let modifiedReport = removeElementFromArray(originalReport, testDigit);
      if(checkIfSafe(modifiedReport)){
        safeCount+=1;
        break;
      }
    }
  }
  return safeCount;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

function checkIfSafe(inputArray:string[]){
  let ascending, descending;
  ascending = descending = false;

  for(let i = 0; i < inputArray.length-1; i++){
    let currentDigit = Number(inputArray[i]);
    let nextDigit = Number(inputArray[i+1]);
    let digitDiff = Math.abs(currentDigit-nextDigit);

    if (digitDiff == 0 || digitDiff > 3){
      return false;
    }
    if (currentDigit < nextDigit){
      ascending = true;
    } else{
      descending = true;
    }
  }

  if (ascending && descending){
    return false;
  }

  return true;
}

function removeElementFromArray(array: any[], index: number){
  let newArray = [];
  let popLimiter = false;
  for(let i = 0; i < array.length; i++){
    if(i == index){
      if(popLimiter){
        newArray.push(array[i]);
      }
      popLimiter=true;
      continue;
    }
    newArray.push(array[i]);
  }
  return newArray;
}