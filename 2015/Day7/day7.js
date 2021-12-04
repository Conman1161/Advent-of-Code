const fs = require('fs');

let input = fs.readFileSync(`${__dirname}\\input.txt`).toString().split('\r\n');
// lower sample for testing
input = input.splice(0, 5)

let wires = {};

input.forEach((signal) => {
   signal = signal.split(' ');
   console.log(signal);

   switch (signal.length) {
      //assign
      case 3:
         break;

      //Lshift
      //Rshift
      //bw complement - ~
      case 4:
         break;

      //bw AND - &
      //bw OR - |
      case 5:
         break;
   }

});

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);