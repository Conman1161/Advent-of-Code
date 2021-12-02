const fs = require('fs');


let floor = 0;
let input = fs.readFileSync(`${__dirname}\\input.txt`).toString();
console.log(input);

//part 1
for (let i = 0; i < input.length; i++) {
   if (input[i] == '(') {
      floor += 1;
   } else {
      floor -= 1;
   }
}

console.log(floor);

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);

//part 2
floor = 0;

for (let i = 0; i < input.length; i++) {
   if (input[i] == '(') {
      floor += 1;
   } else {
      floor -= 1;
   }
   if (floor == -1) {
      console.log(i + 1);
      break;
   }
}

console.log(floor);