import {
    dataLocIdsCol1,
    dataLocIdsCol2
} from './data-d1.js';

let score = 0;

dataLocIdsCol1.forEach((id1) => {
    let multiplier = dataLocIdsCol2.filter((id2) => id2 === id1).length;
    score += (id1 * multiplier);
});

console.log(score);