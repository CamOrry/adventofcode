import { operations, rules } from './data-d5.js';

const start = performance.now();

let sum = 0;

const slowAF_hibaSearchBasedOnRules = (vB, vA) => {
    return (-1) !== rules.findIndex(obj => (obj.rB === vA && obj.rA === vB));
};

operations.forEach(operation => {
    if (operation.findIndex((curr, idx) => {
        if (idx === 0) {
            return false;
        }
    
        const prev = operation[idx - 1];
        return slowAF_hibaSearchBasedOnRules(prev, curr);
    }) === (-1)) {
        sum += operation[Math.floor(operation.length / 2)];
    }
});

const end = performance.now();

console.log(sum);

console.log('---------------------');
console.log(end - start + ' ms');
console.log('---------------------');