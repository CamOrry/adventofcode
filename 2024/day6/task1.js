import { map } from './data-d6.js';

const start = performance.now();

let db = 0;

const up = {
    next: null,
    movement: {
        x: -1,
        y: 0
    }
};

const right = {
    next: null,
    movement: {
        x: 0,
        y: 1
    }
};

const down = {
    next: null,
    movement: {
        x: 1,
        y: 0
    }
};

const left = {
    next: null,
    movement: {
        x: 0,
        y: -1
    }
};

up.next = right;
right.next = down;
down.next = left;
left.next = up;

const obstacle = '#';

const recursiveGuardStep = (x, y, direction) => {
    if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) {
        return true;
    }

    map[x][y] = 'X';

    let nextDirection = direction;

    while (map[x + nextDirection.movement.x][y + nextDirection.movement.y] === obstacle) {
        nextDirection = direction.next;
    }

    return recursiveGuardStep(x + nextDirection.movement.x, y + nextDirection.movement.y, nextDirection);
};

map.some((row, idx) => {
    return row.some((val, i) => {
        switch (val) {
            case '^': return recursiveGuardStep(idx, i, up);
            case '>': return recursiveGuardStep(idx, i, right);
            case '<': return recursiveGuardStep(idx, i, left);
            case 'v': return recursiveGuardStep(idx, i, down);
            default: return false;
        }
    });
});

map.forEach(row => {
    row.forEach(val => {
        if (val === 'X') {
            db++;
        }
    });
});

const end = performance.now();

console.log(db);

console.log('---------------------');
console.log(end - start + ' ms');
console.log('---------------------');