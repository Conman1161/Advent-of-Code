const fs = require('fs');

let input = fs.readFileSync(`${__dirname}\\input.txt`).toString();
let santaVisited = [];

//start at 0,0 on grid
let santaX = 0;
let santaY = 0;

for (let i = 0; i < input.length; i++) {
   let currentMovement = input[i];
   let hasCurrentHouse = santaVisited.find(current => current == `${santaX},${santaY}`);

   if (!hasCurrentHouse) {
      santaVisited.push(`${santaX},${santaY}`);
   }

   switch (currentMovement) {
      case '^': //north
         santaY += 1;
         break;
      case 'v': //south
         santaY -= 1;
         break;
      case '>': //east
         santaX += 1;
         break;
      case '<': //west
         santaX -= 1;
         break;
   }
}

console.log(santaVisited.length);

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);

santaVisited = [];
let roboVisited = [];

//start at 0,0 on grid
santaX = 0;
santaY = 0;
let roboX = 0;
let roboY = 0;


for (let i = 0; i < input.length; i++) {
   let currentMovement = input[i];
   let hasCurrentHouse;
   if (i % 2 == 0) {
      //santa's move
      hasCurrentHouse = santaVisited.find(current => current == `${santaX},${santaY}`);
      if (!hasCurrentHouse) {
         santaVisited.push(`${santaX},${santaY}`);
      }
      switch (currentMovement) {
         case '^': //north
            santaY += 1;
            break;
         case 'v': //south
            santaY -= 1;
            break;
         case '>': //east
            santaX += 1;
            break;
         case '<': //west
            santaX -= 1;
            break;
      }
   } else {
      //robo's move
      hasCurrentHouse = roboVisited.find(current => current == `${roboX},${roboY}`);
      if (!hasCurrentHouse) {
         roboVisited.push(`${roboX},${roboY}`);
      }

      switch (currentMovement) {
         case '^': //north
            roboY += 1;
            break;
         case 'v': //south
            roboY -= 1;
            break;
         case '>': //east
            roboX += 1;
            break;
         case '<': //west
            roboX -= 1;
            break;
      }
   }
}

console.log(`Santa Visits: ${santaVisited.length}`);
console.log(`Robo Visits: ${roboVisited.length}`);
console.log(`Houses that got >=1 present: ${[... new Set(santaVisited.concat(roboVisited))].length}`);