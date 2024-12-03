import { data } from './data-d2.js';

let safe = 0;

data.forEach(dat => {
    let isSafe = true;
    const novekmeny = dat[0] < dat[1] ? 3 : (-3);

    const firstHibaIdx = dat.findIndex((val, i) => {
        if (i !== 0) {
            const prev = dat[i - 1];
            return !((prev < dat[i] && (prev + novekmeny) >= dat[i]) || (prev > dat[i] && (prev + novekmeny) <= dat[i]));
        }
    });

    if (firstHibaIdx !== -1) {
        let vanHibamentes = false;
        dat.every((val, idx) => {
            const filteredDat = dat.filter((v, i) => i !== idx);
            const newNovekmeny = filteredDat[0] < filteredDat[1] ? 3 : (-3);
            if (filteredDat.findIndex((v, i) => {
                if (i !== 0) {
                    const prevF = filteredDat[i - 1];
                    return !((prevF < filteredDat[i] && (prevF + newNovekmeny) >= filteredDat[i]) || (prevF > filteredDat[i] && (prevF + newNovekmeny) <= filteredDat[i]));
                }
            }) === -1) {
                vanHibamentes = true;
            }
            return !vanHibamentes;
        });
        isSafe = vanHibamentes;
    }

    safe += (isSafe ? 1 : 0);
});

console.log(safe);