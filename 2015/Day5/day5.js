const fs = require('fs');

let input = fs.readFileSync(`${__dirname}\\input.txt`).toString().split('\r\n');

let niceStrings = [];

let aCount = eCount = iCount = oCount = uCount = 0;

//nice checks
for (let i = 0; i < input.length; i++) {
   let doubleCount = 0;
   let string = input[i];
   //3 vowels
   aCount = eCount = iCount = oCount = uCount = 0;
   for (let x = 0; x < string.length; x++) {
      switch (string[x]) {
         case 'a':
            aCount++;
            break;
         case 'e':
            eCount++;
            break;
         case 'i':
            iCount++;
            break;
         case 'o':
            oCount++;
            break;
         case 'u':
            uCount++;
            break;
      }
   }
   if (aCount + eCount + iCount + oCount + uCount < 3) {
      continue;
   }

   //1+ double letter

   for (let x = 0; x < string.length - 1; x++) {
      // get chars from string
      let charOne = string[x];
      let charTwo = string[x + 1];
      // compare 0 & 1 pos chars
      if (charOne === charTwo) {
         doubleCount++;
      }
   }
   // if no dupes, continue;
   if (doubleCount < 1) {
      continue;
   }

   //NO {ab,cd,pq,xy}
   if (string.includes('ab') || string.includes('cd') || string.includes('pq') || string.includes('xy')) {
      continue;
   }

   niceStrings.push(string)
}

console.log(niceStrings.length);

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);

niceStrings = [];

//nice checks
for (let i = 0; i < input.length; i++) {
   let dupeCount = 0;
   let pairCount = 0;
   let string = input[i];

   //pair of any two letters that appear >=twice w/o overlapping
   for (let y = 0; y < string.length - 1; y++) {
      for (let z = y + 2; z < string.length - 1; z++) {
         if (string[y] + string[y + 1] === string[z] + string[z + 1]) {
            pairCount++;
         }
      }
   }
   if (!pairCount) {
      continue;
   }

   //letter that repeats with 1 letter in-between 
   for (let x = 0; x < string.length - 2; x++) {
      if (string[x] === string[x + 2]) {
         dupeCount++;
      }
   }
   if (dupeCount < 1) {
      continue
   }

   niceStrings.push(string);
}

console.log(niceStrings.length);