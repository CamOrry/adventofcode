import { corruptedMemory } from './data-d3.js';

const mul = "mul(";
const close = ")";
const splitter = ",";

const doStr = "do()";
const dont = "don't()";

let recursiveDeCorrupter = (memory) => {
    if (memory.indexOf(mul) === -1) {
        return 0;
    }

    const start = memory.indexOf(mul);
    const dontStart = memory.indexOf(dont);

    if (dontStart < start) {
        const doStart = memory.indexOf(doStr, dontStart);
        return 0 + recursiveDeCorrupter(memory.slice(doStart));
    }

    const end = memory.indexOf(close, start);

    const subStr = memory.slice(start + mul.length, end);
    const split = subStr.split(splitter);

    if (
        (split.length !== 2) ||
        (split[0].length > 3 || split[1].length > 3) ||
        (split[0].trim().length !== split[0].length || split[1].trim().length !== split[1].length) ||
        (Number.parseInt(split[0]) === Number.NaN || Number.parseInt(split[1]) === Number.NaN)
    ) {
        return 0 + recursiveDeCorrupter(memory.slice((start + mul.length)));
    }

    return (Number.parseInt(split[0]) * Number.parseInt(split[1])) + recursiveDeCorrupter(memory.slice((start + mul.length)));
};

console.log(recursiveDeCorrupter(corruptedMemory));