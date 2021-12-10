import run from "aocrunner";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = `${__dirname}\\input.txt`;
const parseInput = (rawInput) => rawInput.split('\n');

let basinLowestPoints = [];

/**
 * @param {*} heightMap - The entire height map, aka the input
 * @param {*} basinRow - The row index of the lowest point in the basin
 * @param {*} basinColumn - The column index of the lowest point in the basin
 */
function getBasinSize(heightMap, basinRow, basinColumn) {
  if (heightMap[basinRow][basinColumn] == 9) return 0;

  //north
  if (basinRow > 0 && Number(heightMap[basinRow - 1][basinColumn]) == Number(heightMap[basinRow][basinColumn]) + 1 && heightMap[basinRow - 1][basinColumn] !== undefined) {
    return 1 + getBasinSize(heightMap, basinRow - 1, basinColumn)
  }
  //east
  if (basinColumn < (heightMap.length - 1) && Number(heightMap[basinRow][basinColumn + 1]) == Number(heightMap[basinRow][basinColumn]) + 1 && heightMap[basinRow][basinColumn + 1] !== undefined) {
    return 1 + getBasinSize(heightMap, basinRow, basinColumn + 1)
  }
  //south
  if (basinRow < heightMap.length - 1 && Number(heightMap[basinRow + 1][basinColumn]) == Number(heightMap[basinRow][basinColumn]) + 1 && heightMap[basinRow + 1][basinColumn] !== undefined) {
    return 1 + getBasinSize(heightMap, basinRow + 1, basinColumn)
  }
  //west
  if (basinColumn > 0 && Number(heightMap[basinRow][basinColumn - 1]) == Number(heightMap[basinRow][basinColumn]) + 1 && heightMap[basinRow][basinColumn - 1] !== undefined) {
    return 1 + getBasinSize(heightMap, basinRow, basinColumn - 1)
  }

  return 1;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let heightMap = [...input];
  let lowestPoints = [];
  for (let rowIndex = 0; rowIndex < heightMap.length; rowIndex++) { // rows in height map
    for (let columnIndex = 0; columnIndex < heightMap[rowIndex].length; columnIndex++) { // char in row in height map
      let currentCell = Number(heightMap[rowIndex][columnIndex]);
      //corners (2 adjacent cells)
      if (rowIndex == 0 && columnIndex == 0) { //0,0
        if (currentCell < Number(heightMap[rowIndex + 1][columnIndex]) && currentCell < Number(heightMap[rowIndex][columnIndex + 1])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      } else if (rowIndex == 0 && columnIndex == heightMap[rowIndex].length - 1) { //0,max
        if (currentCell < Number(heightMap[rowIndex + 1][columnIndex]) && currentCell < Number(heightMap[rowIndex][columnIndex - 1])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      } else if (rowIndex == heightMap.length - 1 && columnIndex == 0) { // max,0
        if (currentCell < Number(heightMap[rowIndex - 1][columnIndex]) && currentCell < Number(heightMap[rowIndex][columnIndex + 1])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      } else if (rowIndex == heightMap.length - 1 && columnIndex == heightMap[rowIndex].length - 1) { // max,max
        if (currentCell < Number(heightMap[rowIndex - 1][columnIndex]) && currentCell < Number(heightMap[rowIndex][columnIndex - 1])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      }
      //edges (3 adjacent cells, excluding corners)
      else if (rowIndex == 0) { // first row, corners covered above
        if (currentCell < Number(heightMap[rowIndex][columnIndex - 1]) && currentCell < Number(heightMap[rowIndex][columnIndex + 1]) && currentCell < Number(heightMap[rowIndex + 1][columnIndex])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      } else if (rowIndex == heightMap.length - 1) { // last row
        if (currentCell < Number(heightMap[rowIndex][columnIndex - 1]) && currentCell < Number(heightMap[rowIndex][columnIndex + 1]) && currentCell < Number(heightMap[rowIndex - 1][columnIndex])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      } else if (columnIndex == 0) { // first column
        if (currentCell < Number(heightMap[rowIndex - 1][columnIndex]) && currentCell < Number(heightMap[rowIndex + 1][columnIndex]) && currentCell < Number(heightMap[rowIndex][columnIndex + 1])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      } else if (columnIndex == heightMap[rowIndex].length - 1) { // last column
        if (currentCell < Number(heightMap[rowIndex - 1][columnIndex]) && currentCell < Number(heightMap[rowIndex + 1][columnIndex]) && currentCell < Number(heightMap[rowIndex][columnIndex - 1])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      }
      //everything else (4 adjacent cells)
      else {
        if (currentCell < Number(heightMap[rowIndex + 1][columnIndex]) && currentCell < Number(heightMap[rowIndex][columnIndex + 1]) && currentCell < Number(heightMap[rowIndex - 1][columnIndex]) && currentCell < Number(heightMap[rowIndex][columnIndex - 1])) {
          lowestPoints.push(currentCell);
          basinLowestPoints.push([rowIndex, columnIndex]);
        }
      }
    }
  }

  return lowestPoints.reduce((a, b) => a + b, 0) + lowestPoints.length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let basinSizes = []; //3, 9, 14, 9

  basinLowestPoints.forEach(basinLocation => {
    basinSizes.push(getBasinSize(input, basinLocation[0], basinLocation[1]));
  });

  return;
};

run({
  part1: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 15
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 1134
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, inputFilePath);
