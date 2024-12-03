import { data } from './data-d2.js';

let safe = 0;

data.forEach(dat => {
    const novekmeny = dat[0] < dat[1] ? 3 : (-3);
    let isSafe = true;

    if (dat[0] === dat[1]) {
        isSafe = false;
    }

    isSafe = dat.findIndex((val, i) => {
        if (i !== 0) {
            const prev = dat[i - 1];
            return !((prev < dat[i] && (prev + novekmeny) >= dat[i]) || (prev > dat[i] && (prev + novekmeny) <= dat[i]));
        }
    }) === -1;

    safe += (isSafe ? 1 : 0);
});

console.log(safe);