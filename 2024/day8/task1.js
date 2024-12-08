import { map } from './data-d8.js';

let m = map;

const start = performance.now();

const coords = [];

map.forEach((row, x) => {
    row.forEach((val, y) => {
        if (val !== '.') {
            map.forEach((r, rx) => {
                r.forEach((v, cy) => {
                    if (val === v && (x !== rx || y !== cy)) {
                        const coord = { x: (x + (x - rx)), y: (y + (y - cy)) };
                        if (coord.x >= 0 && coord.y >= 0 && coord.x < map.length && coord.y < map[0].length) {
                            if (coords.findIndex(cord => cord.x === coord.x && cord.y === coord.y) === (-1)) {
                                coords.push(coord);
                            }
                        }
                    }
                });
            });
        }
    });
});

const end = performance.now();

console.log(coords.length);

console.log('---------------------');
console.log(end - start + ' ms');
console.log('---------------------');