import { data } from './data-d4.js';

const start = performance.now();

let db = 0;

const isX_mas = (ridx, cidx) => {
    if ([{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: -1 }].findIndex(obj => !['S', 'M'].includes(data[ridx + obj.x][cidx + obj.y])) !== -1) {
        return 0;
    }

    if (data[ridx + 1][cidx + 1] === data[ridx - 1][cidx - 1] || data[ridx + 1][cidx - 1] === data[ridx - 1][cidx + 1]) {
        return 0;
    } else {
        return 1;
    }
};

data.forEach((row, ridx) => {
    row.forEach((val, cidx) => {
        if (val === 'A' && ridx !== 0 && ridx !== (data.length - 1) && cidx !== 0 && cidx !== (row.length - 1)) {
            db += isX_mas(ridx, cidx);
        }
    });
});

const end = performance.now();

console.log(db);

console.log('---------------------');
console.log(end - start + ' ms');
console.log('---------------------');