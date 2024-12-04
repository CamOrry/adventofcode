import { data } from './data-d4.js';

let db = 0;

const xmas = "XMAS";

const recursiveSearch = (ridx, cidx, rinc, cinc, currentChar) => {
    if (currentChar === xmas.length) {
        return 1;
    }

    if (data[ridx][cidx] !== xmas.charAt(currentChar)) {
        return 0;
    }

    return recursiveSearch(ridx + rinc, cidx + cinc, rinc, cinc, ++currentChar);
};

data.forEach((row, ridx) => {
    row.forEach((val, cidx) => {
        if (val === 'X') {
            const arr = [];

            if ((ridx + 1) >= xmas.length) { arr.push({ rinc: -1, cinc: 0 }) }
            if ((cidx + 1) >= xmas.length) { arr.push({ rinc: 0, cinc: -1 }) }
            if (data.length >= (ridx + xmas.length)) { arr.push({ rinc: 1, cinc: 0 }) }
            if (row.length >= (cidx + xmas.length)) { arr.push({ rinc: 0, cinc: 1 }) }
            if ((ridx + 1) >= xmas.length && (cidx + 1) >= xmas.length) { arr.push({ rinc: -1, cinc: -1 }) }
            if ((ridx + 1) >= xmas.length && row.length >= (cidx + xmas.length)) { arr.push({ rinc: -1, cinc: 1 }) }
            if (data.length >= (ridx + xmas.length) && (cidx + 1) >= xmas.length) { arr.push({ rinc: 1, cinc: -1 }) }
            if (data.length >= (ridx + xmas.length) && row.length >= (cidx + xmas.length)) { arr.push({ rinc: 1, cinc: 1 }) }

            arr.forEach(obj => {
                db += recursiveSearch(ridx, cidx, obj.rinc, obj.cinc, 0);
            });
        }
    });
});

console.log(db);