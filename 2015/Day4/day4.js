const md5 = require('md5')

let input = 'ckczppom';

//example1: abcdef
// input = 'abcdef';
// for (let i = 0; i < 1000000; i++) {
//    let current = input.concat(i);
//    let currentHash = md5(current);
//    if (i == 609043) { // shortcut to answer
//       console.log(current);
//       console.log(md5(current));
//    }
// }

for (let i = 0; i < 1000000; i++) {
   let current = input.concat(i);
   let currentHash = md5(current);
   let currentSlice = currentHash.slice(0, 5);
   if (currentSlice === '00000') {
      console.log(`5 Zeroes Answer: ${i}\nHash: ${currentHash}`);
      break;
   }
}

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);

for (let i = 0; i < 10000000; i++) {
   let current = input.concat(i);
   let currentHash = md5(current);
   let currentSlice = currentHash.slice(0, 6);
   if (currentSlice === '000000') {
      console.log(`6 Zeroes Answer: ${i}\nHash: ${currentHash}`);
      break;
   }
}