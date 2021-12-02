const fs = require('fs');

let input = fs.readFileSync(`${__dirname}\\input.txt`).toString().split('\r\n');

let subX = 0;
let subY = 0;
for (let i = 0; i < input.length; i++) {
   let direction = input[i];
   direction = direction.split(' ');
   switch (direction[0]) {
      case 'forward':
         subX += parseInt(direction[1]);
         break;
      case 'down':
         subY += parseInt(direction[1]);
         break;
      case 'up':
         subY -= parseInt(direction[1]);
         break;
   }
}

console.log(subX * subY);

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);

subX = 0;
subY = 0;
let subAim = 0;
for (let i = 0; i < input.length; i++) {
   let direction = input[i];
   direction = direction.split(' ');
   switch (direction[0]) {
      case 'down':
         subAim += parseInt(direction[1]);
         break;
      case 'up':
         subAim -= parseInt(direction[1]);
         break;
      case 'forward':
         subX += parseInt(direction[1]);
         subY += parseInt(subAim * direction[1])
         break;
   }
}

console.log(subX * subY);