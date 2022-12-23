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

export function getColor(value:number){
    switch (value) {
        case 4: return '#C0C0C0';
        case 8: return '#00FFFF';
        case 16: return '#B22222';
        case 32: return '#7B68EE';
        case 64: return '#00FA9A';
        case 128: return '#FF7F50';
        case 256: return '#8FBC8F';
        case 512: return '#8A2BE2';
        case 1024: return '#2F4F4F';
        case 2048: return '#6A5ACD';
        default:
            return '#fff'
    }
}