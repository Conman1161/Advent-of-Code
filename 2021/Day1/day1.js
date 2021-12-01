//import fs
const fs = require('fs');

let increaseCount = 0;
let prev = 0;

// given input
let input = fs.readFileSync(`${__dirname}\\input.txt`, 'utf8');

// test input: expected 7
// let input = '199\r\n200\r\n208\r\n210\r\n200\r\n207\r\n240\r\n269\r\n260\r\n263'
input = input.split('\r\n');

// prompt 1
for (let i = 0; i < input.length; i++) {
   if (input[i] > prev) {
      increaseCount++;
   }
   console.log(`${input[i]} (${input[i] > input[i - 1] ? 'increased' : `${i == 0 ? 'N/A - no previous measurement' : 'decreased'}`}) : Count = ${increaseCount}`);
   prev = input[i];
}
console.log(increaseCount);

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);

// prompt 2
increaseCount = 0;
prev = 0;

for (let i = 0; i < input.length; i++) {
   let triplet = parseInt(input[i]) + parseInt(input[i + 1] || 0) + parseInt(input[i + 2] || 0)
   console.log(`${parseInt(input[i]) + parseInt(input[i + 1] || 0) + parseInt(input[i + 2] || 0)} (${i == 0 ? 'N/A - no previous sum' : `${triplet > prev ? 'increased' : 'decreased'}`})`);
   increaseCount += triplet > prev
   prev = triplet
}
console.log(increaseCount - 1);