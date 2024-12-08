import { data } from './data.d7.js';

const start = performance.now();

let sum = 0;

const recursiveOpsCreator = (lenghtMinus1) => {
    if (lenghtMinus1 === 1) {
        return ["+", "x", "|"];
    }

    const tovabbiOps = recursiveOpsCreator(lenghtMinus1 - 1);

    return [...tovabbiOps.map(op => op + "+"), ...tovabbiOps.map(op => op + "x"), ...tovabbiOps.map(op => op + "|")];
};

const calculusFn = (arr, ops) => {
    return arr.reduce((prev, curr, idx) => {
        if (ops.charAt(idx - 1) === '+') {
            return prev + curr;
        } else if(ops.charAt(idx - 1) === 'x') {
            return prev * curr;
        } else {
            return Number.parseInt("" + prev + curr);
        }
    });
};

data.forEach((dat => {
    // 3^(length - 1) permutációja lehet
    const allOpsOptions = recursiveOpsCreator(dat.arr.length - 1);

    if (allOpsOptions.findIndex(ops => {
        return dat.sum === calculusFn(dat.arr, ops);
    }) !== (-1)) {
        sum += dat.sum;
    }
}));

const end = performance.now();

console.log(sum);

console.log('---------------------');
console.log(end - start + ' ms');
console.log('---------------------');