import { map } from './data-d6.js';

const start = performance.now();

let db = 0;

const up = {
    possibleLoopChar: 'r',
    next: null,
    movement: {
        x: -1,
        y: 0
    }
};

const right = {
    possibleLoopChar: 'd',
    next: null,
    movement: {
        x: 0,
        y: 1
    }
};

const down = {
    possibleLoopChar: 'l',
    next: null,
    movement: {
        x: 1,
        y: 0
    }
};

const left = {
    possibleLoopChar: 'u',
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
const floor = '.';

const possibleSpots = [];

let oX;
let oY;
let oI;
let oD;

let shouldResetArray = [];

const checkLooped = (bx, by, direction) => {
    let x = bx;
    let y = by;
    let dir = direction;

    while (true) {
        if (map[x][y].includes(dir.possibleLoopChar)) {
            db++;
            return;
        }

        const nx = x + dir.movement.x;
        const ny = y + dir.movement.y;
        if (nx < 0 || ny < 0 || nx >= (map.length) || ny >= (map[0].length)) {
            return;
        }

        if (map[nx][ny] === obstacle) {
            map[x][y] += dir.possibleLoopChar;
            shouldResetArray.push({ x: x, y: y });
            while (map[x + dir.movement.x][y + dir.movement.y] === obstacle) {
                dir = dir.next;
            }
            x += dir.movement.x;
            y += dir.movement.y;
        } else {
            x = nx;
            y = ny;
        }
    }
};

const recursiveGuardStep = (x, y, direction) => {
    if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) {
        return true;
    }

    map[x][y] = 'X';

    let nextDirection = direction;

    while (map[x + nextDirection.movement.x][y + nextDirection.movement.y] === obstacle) {
        nextDirection = nextDirection.next;
    }

    return recursiveGuardStep(x + nextDirection.movement.x, y + nextDirection.movement.y, nextDirection);
};

map.some((row, idx) => {
    return row.some((val, i) => {
        switch (val) {
            case '^': oI = '^'; oD = up; oX = idx; oY = i; return recursiveGuardStep(idx, i, up);
            case '>': oI = '>'; oD = right; oX = idx; oY = i; return recursiveGuardStep(idx, i, right);
            case '<': oI = '<'; oD = left; oX = idx; oY = i; return recursiveGuardStep(idx, i, left);
            case 'v': oI = 'v'; oD = down; oX = idx; oY = i; return recursiveGuardStep(idx, i, down);
            default: return false;
        }
    });
});

map.forEach((row, x) => {
    row.forEach((val, y) => {
        if (val === 'X' && (x !== oX || y !== oY)) {
            possibleSpots.push({ x: x, y: y });
            map[x][y] = '.';
        }
    });
});

map[oX][oY] = oI;

possibleSpots.forEach(coord => {
    map[coord.x][coord.y] = obstacle;

    shouldResetArray = [];

    checkLooped(oX, oY, oD);

    shouldResetArray.forEach(coord => map[coord.x][coord.y] = floor);

    map[oX][oY] = oI;

    map[coord.x][coord.y] = floor;
});

const end = performance.now();

console.log(db);

console.log('---------------------');
console.log(end - start + ' ms');
console.log('---------------------');