export class Tail {
    id:number; 
    y:number;
    x:number;
    value:number;
    isNew: boolean = true;
    isDelete: boolean = false;

    constructor(id:number, y:number, x:number, value:number) {
        this.id = id;
        this.y = y;
        this.x = x;
        this.value = value;
        this.id = id;
    }
}