const fs = require('fs');

let input = fs.readFileSync(`${__dirname}\\input.txt`).toString().split('\r\n');

//make 2D array from (0,0) to (999,999) with false  (1000x1000)    
let grid = new Array(1000).fill(new Array(1000).fill(false));
let litCount = 0;

//loop through instruction
let startTime = performance.now();
for (let i = 0; i < input.length; i++) {
   let instruction = input[i];
   instruction = instruction.split(' ');

   if (instruction.length == 5) {
      instruction[0] = `${instruction[0]}${instruction[1]}`;
      instruction.splice(1, 1);
   }

   let startX = parseInt(instruction[1].split(',')[0]);
   let startY = parseInt(instruction[1].split(',')[1]);
   let endX = parseInt(instruction[3].split(',')[0]);
   let endY = parseInt(instruction[3].split(',')[1]);

   switch (instruction[0]) {
      case 'toggle':
         for (let x = startX; x < endX + 1; x++) {
            let row = grid[x].toString().split(',');
            for (let y = startY; y < endY + 1; y++) {
               row[y] = !JSON.parse(row[y]);
               grid[x] = row;
            }
         }
         break;
      case 'turnon':
         for (let x = startX; x < endX + 1; x++) {
            let row = grid[x].toString().split(',');
            for (let y = startY; y < endY + 1; y++) {
               row[y] = true;
               grid[x] = row;
            }
         }
         break;
      case 'turnoff':
         for (let x = startX; x < endX + 1; x++) {
            let row = grid[x].toString().split(',');
            for (let y = startY; y < endY + 1; y++) {
               row[y] = false;
               grid[x] = row;
            }
         }
         break;
   }
}

//find total lights on
grid.forEach(line => {
   line.forEach(light => {
      litCount += JSON.parse(light);
   })
});

console.log(litCount);

let endTime = performance.now();
console.log(`Took ${(endTime - startTime) / 1000} seconds`);

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);

litCount = 0;
grid = new Array(1000).fill(new Array(1000).fill(0));

//loop through instruction
startTime = performance.now();
for (let i = 0; i < input.length; i++) {
   let instruction = input[i];
   instruction = instruction.split(' ');

   if (instruction.length == 5) {
      instruction[0] = `${instruction[0]}${instruction[1]}`;
      instruction.splice(1, 1);
   }

   let startX = parseInt(instruction[1].split(',')[0]);
   let startY = parseInt(instruction[1].split(',')[1]);
   let endX = parseInt(instruction[3].split(',')[0]);
   let endY = parseInt(instruction[3].split(',')[1]);

   switch (instruction[0]) {
      case 'toggle':
         for (let x = startX; x < endX + 1; x++) {
            let row = grid[x].toString().split(',');
            for (let y = startY; y < endY + 1; y++) {
               row[y] = parseInt(row[y]) + 2;
               grid[x] = row;
            }
         }
         break;
      case 'turnon':
         for (let x = startX; x < endX + 1; x++) {
            let row = grid[x].toString().split(',');
            for (let y = startY; y < endY + 1; y++) {
               row[y] = parseInt(row[y]) + 1;
               grid[x] = row;
            }
         }
         break;
      case 'turnoff':
         for (let x = startX; x < endX + 1; x++) {
            let row = grid[x].toString().split(',');
            for (let y = startY; y < endY + 1; y++) {
               row[y] = parseInt(row[y]) - 1 < 0 ? 0 : parseInt(row[y]) - 1;
               grid[x] = row;
            }
         }
         break;
   }
}

//find total lights on
grid.forEach((line, index) => {
   line.forEach((light, index) => {
      litCount += parseInt(light);
   })
});

console.log(litCount);

endTime = performance.now();
console.log(`Took ${(endTime - startTime) / 1000} seconds`);