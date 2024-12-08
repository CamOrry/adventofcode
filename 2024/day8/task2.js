import { map } from './data-d8.js';

const start = performance.now();

const coords = [];

map.forEach((row, x) => {
    row.forEach((val, y) => {
        if (val !== '.') {
            map.forEach((r, rx) => {
                r.forEach((v, cy) => {
                    if (val === v && (x !== rx || y !== cy)) {
                        const v = { vx: (x - rx), vy: (y - cy) };

                        let i = 0;
                        while (true) {
                            const coord = { x: (x + i * v.vx), y: (y + i * v.vy) };
                            if (coord.x >= 0 && coord.y >= 0 && coord.x < map.length && coord.y < map[0].length) {
                                if (coords.findIndex(cord => cord.x === coord.x && cord.y === coord.y) === (-1)) {
                                    coords.push(coord);
                                }

                                i++;
                            } else {
                                break;
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