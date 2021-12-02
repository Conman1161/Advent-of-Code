const fs = require('fs');

let input = fs.readFileSync(`${__dirname}\\input.txt`).toString();
input = input.split("\r\n");
console.log(input);

let facesSum = 0;

//part 1
// loop for each box
for (let i = 0; i < input.length; i++) {
   let current = input[i].split('x');
   let l = current[0];
   let w = current[1];
   let h = current[2];

   let faceOne = l * w;
   let faceTwo = w * h;
   let faceThree = h * l;
   let smallestFace = [faceOne, faceTwo, faceThree].sort((a, b) => a - b)[0];
   facesSum += (2 * faceOne) + (2 * faceTwo) + (2 * faceThree);
   facesSum += smallestFace;
}

console.log(facesSum);

console.log(`\n--- PART 1 END   ---`);
console.log(`--- PART 2 START --- \n`);

//part 2
let ribbonLength = 0;
for (let i = 0; i < input.length; i++) {
   let current = input[i].split('x');
   let l = parseInt(current[0]);
   let w = parseInt(current[1]);
   let h = parseInt(current[2]);

   // let faceOneArea = l * w;
   // let faceTwoArea = w * h;
   // let faceThreeArea = h * l;

   let faceOnePerimeter = l + l + w + w;
   let faceTwoPerimeter = h + h + w + w;
   let faceThreePerimeter = l + l + h + h;
   // let smallestFace = [faceOneArea, faceTwoArea, faceThreeArea].sort((a, b) => a - b)[0];
   let smallestPerimeter = [faceOnePerimeter, faceTwoPerimeter, faceThreePerimeter].sort((a, b) => a - b)[0];
   let volume = l * w * h;
   ribbonLength += smallestPerimeter + volume;
}

console.log(ribbonLength);