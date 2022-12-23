import { TCell } from "./types";

export function getEmptyMatrix() {
    const matrix:TCell[][] = []
    for (let y = 0; y < 4; y++) {
        const row:TCell[] = [];
        for (let x = 0; x < 4; x++){
            row.push({x,y,value:0, cellTails:[]})
        }
        matrix.push(row);
    }

    return matrix;
}