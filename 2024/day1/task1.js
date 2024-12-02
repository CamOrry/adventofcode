import {
    dataLocIdsCol1,
    dataLocIdsCol2
} from '../data.js';


//dataLocIdsCol1
//dataLocIdsCol2
const col1 = dataLocIdsCol1.sort();
const col2 = dataLocIdsCol2.sort();

let sum = 0;

for (let i = 0; i < col1.length; i++) {
    sum += (Math.abs(col1[i] - col2[i]));
}

console.log(sum);