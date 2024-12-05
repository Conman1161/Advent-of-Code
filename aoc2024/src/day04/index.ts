import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  let xmasCount = 0;
  for(let y = 0; y < input.length; y++){
    //row in input
    for(let x = 0; x < input[y].length; x++){
      //character position in row
      if(input[y][x] == 'X'){
        xmasCount+=xmasAll(input, x, y);
      }
    }
  }
  return xmasCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  let masCount = 0;
  for(let y = 0; y < input.length; y++){
    //row in input
    for(let x = 0; x < input[y].length; x++){
      //character position in row
      if(input[y][x] == 'A'){
        masCount+=masAll(input, x, y);
      }
    }
  }
  return masCount;
}; 

/**
 * Checks if 'XMAS' can be found originating from the current 'X' character's position. Direction indicates direction of text
 * @param inputArray The array that stores the word search
 * @param currentX the x-coordinate for the current 'X' character
 * @param currentY the y-coordinate for the current 'X' character
 * @returns 0 or 1, depending on if 'XMAS' string was found originating from current 'X' character
 */
function xmasN(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(inputArray[currentY-1][currentX] == 'M' &&
      inputArray[currentY-2][currentX] == 'A' &&
      inputArray[currentY-3][currentX] == 'S'){
        return 1;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
function xmasNE(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(inputArray[currentY-1][currentX+1] == 'M' &&
      inputArray[currentY-2][currentX+2] == 'A' &&
      inputArray[currentY-3][currentX+3] == 'S'){
        return 1;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
function xmasE(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(inputArray[currentY][currentX+1] == 'M' &&
      inputArray[currentY][currentX+2] == 'A' &&
      inputArray[currentY][currentX+3] == 'S'){
        return 1;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
function xmasSE(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(inputArray[currentY+1][currentX+1] == 'M' &&
      inputArray[currentY+2][currentX+2] == 'A' &&
      inputArray[currentY+3][currentX+3] == 'S'){
        return 1;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
function xmasS(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(inputArray[currentY+1][currentX] == 'M' &&
      inputArray[currentY+2][currentX] == 'A' &&
      inputArray[currentY+3][currentX] == 'S'){
        return 1;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
function xmasSW(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(inputArray[currentY+1][currentX-1] == 'M' &&
      inputArray[currentY+2][currentX-2] == 'A' &&
      inputArray[currentY+3][currentX-3] == 'S'){
        return 1;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
function xmasW(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(inputArray[currentY][currentX-1] == 'M' &&
      inputArray[currentY][currentX-2] == 'A' &&
      inputArray[currentY][currentX-3] == 'S'){
        return 1;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
function xmasNW(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(inputArray[currentY-1][currentX-1] == 'M' &&
      inputArray[currentY-2][currentX-2] == 'A' &&
      inputArray[currentY-3][currentX-3] == 'S'){
        return 1;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
function xmasAll(inputArray: string[], currentX: number, currentY: number): number{
  let xmasCheckSum = 0;

  xmasCheckSum += xmasN(inputArray, currentX, currentY);
  xmasCheckSum += xmasE(inputArray, currentX, currentY);
  xmasCheckSum += xmasS(inputArray, currentX, currentY);
  xmasCheckSum += xmasW(inputArray, currentX, currentY);
  xmasCheckSum += xmasNE(inputArray, currentX, currentY);
  xmasCheckSum += xmasSE(inputArray, currentX, currentY);
  xmasCheckSum += xmasSW(inputArray, currentX, currentY);
  xmasCheckSum += xmasNW(inputArray, currentX, currentY);

  return xmasCheckSum;
}
/**
 * Determine if an X-MAS cross has been found. Directions indicate location of the 'M' characters
 * @param inputArray The array that stores the word search
 * @param currentX the x-coordinate for the 'A' character
 * @param currentY the y-coordinate for the 'A' character
 * @returns 0-1. depending on if 'MAS' was found in the cross
 */
function masNWNE(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(
      inputArray[currentY-1][currentX-1] == 'M' && //1
      inputArray[currentY+1][currentX+1] == 'S' && //1
      inputArray[currentY-1][currentX+1] == 'M' && //2
      inputArray[currentY+1][currentX-1] == 'S'    //2
    ){
        return 1;
      }
  } catch (error) {
    return 0;
  }
  return 0;
}
function masNWSW(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(
      inputArray[currentY-1][currentX-1] == 'M' && //1
      inputArray[currentY+1][currentX+1] == 'S' && //1
      inputArray[currentY+1][currentX-1] == 'M' && //2
      inputArray[currentY-1][currentX+1] == 'S'    //2
    ){
        return 1;
      }
  } catch (error) {
    return 0;
  }
  return 0;
}
function masNESE(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(
      inputArray[currentY-1][currentX+1] == 'M' && //1
      inputArray[currentY+1][currentX-1] == 'S' && //1
      inputArray[currentY+1][currentX+1] == 'M' && //2
      inputArray[currentY-1][currentX-1] == 'S'    //2
    ){
        return 1;
      }
  } catch (error) {
    return 0;
  }
  return 0;
}
function masSWSE(inputArray: string[], currentX: number, currentY: number): number{
  try {
    if(
      inputArray[currentY+1][currentX-1] == 'M' && //1
      inputArray[currentY-1][currentX+1] == 'S' && //1
      inputArray[currentY+1][currentX+1] == 'M' && //2
      inputArray[currentY-1][currentX-1] == 'S'    //2
    ){
        return 1;
      }
  } catch (error) {
    return 0;
  }
  return 0;
}
function masAll(inputArray: string[], currentX: number, currentY: number): number{
  let masCheckSum = 0;

  masCheckSum += masNWNE(inputArray, currentX, currentY);
  masCheckSum += masNWSW(inputArray, currentX, currentY);
  masCheckSum += masNESE(inputArray, currentX, currentY);
  masCheckSum += masSWSE(inputArray, currentX, currentY);

  return masCheckSum;
}

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
