import { getEmptyMatrix } from "../helper/helpers";
import { TCell } from "../helper/types";
import { Tail } from "./Tail";

class Board {

    private newId = 0;

    board:TCell[][];
    tails:Tail[];
    isWin:boolean = false;
    isLose:boolean = false;
    score:number = 0;

    constructor(){
        this.board = [];
        this.tails = [];
    }

    init(){
        this.isWin = false;
        this.isLose = false;
        this.newId = 0;
        this.score = 0;
        this.board = getEmptyMatrix();
        this.tails = [];
        const tail1 = this.addTile(); 
        const tail2 = this.addTile(); 

        if (tail1 && tail2) {
            this.tails.push(tail1);
            this.tails.push(tail2);
        }
    }

    addTile():Tail | null {
        const emptyCells = [];
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (!this.board[y][x].idTails.length) {
                    emptyCells.push({y,x})
                }
            }
        }
        if (!emptyCells.length) {
            if (!this.canMove()){
                this.isLose = true;
                console.log('you lose')
            }
            return null;
        }
        const idx = Math.floor(Math.random() * emptyCells.length);
        const y = emptyCells[idx].y;
        const x = emptyCells[idx].x;
        const value = Math.random() < 0.9 ? 2 : 4;
        const locTail = new Tail(this.newId++, y, x, value)
        this.board[y][x].value = value;
        this.board[y][x].idTails.push(locTail);
        return locTail
    }

    mergeTailLeft(){
        for (let y = 0; y < 4; y++){
            for (let x = 0; x < 3; x++){
                if (this.board[y][x].value !== 0 && this.board[y][x].value === this.board[y][x + 1].value){
                    this.score += this.board[y][x].value;
                    this.board[y][x].value = this.board[y][x].value * 2
                    this.board[y][x+1].value = 0;
                    this.board[y][x+1].idTails.forEach((tail)=>{
                        tail.x = this.board[y][x].x;
                        tail.y = this.board[y][x].y;
                        this.board[y][x].idTails.push(tail);
                    })
                    this.board[y][x].idTails.sort((a,b)=> a.id - b.id);
                    this.board[y][x].idTails[0].isDelete=true;
                    this.board[y][x].idTails[1].value = this.board[y][x].value;
                    this.board[y][x+1].idTails = [];
                }
            }
        }
        this.checkWin();
    }

    compressedTail(row:TCell[]){
        let isRepeat = true;
        while (isRepeat) {
            isRepeat = false;
            for (let i = 0; i < 3; i++){
                if (row[i].value === 0 && row[i + 1].value !== 0){
                    row[i].value = row[i+1].value
                    row[i+1].value = 0;
                    row[i+1].idTails.forEach((tail)=>{
                        tail.x = row[i].x;
                        tail.y = row[i].y;
                        row[i].idTails.push(tail);
                    })
                    row[i].idTails[0].value = row[i].value;
                    row[i].idTails = row[i].idTails.reverse()
                    row[i+1].idTails = [];
                    isRepeat = true;
                }
            }
        }
    }

    rotateMatrix(){
        const matrix =  this.board.map((item) => {
            return [...item]
        })
        for (let y = 0; y < 4; y++){
            for (let x = 0; x < 4; x++){
                this.board[y][x] = {} as TCell;
            }
        }
        for (let y = 0; y < 4; y++){
            const row = matrix[y];
            for (let x = 0; x < 4; x++) {
                if (row[x]) {
                    this.board[4-x-1][y] = row[x];
                }
            }
        }
    }

    toLeft(){
        this.tails.forEach(tail=>tail.isNew=false);
        this.compressed();
        this.mergeTailLeft();
        this.compressed();
    }

    compressed() {
        for (let i = 0; i < 4; i++) {
            this.compressedTail(this.board[i]);            
        }
    }

    moveLeft():Promise<void>{
        return new Promise((resolve)=>{
            this.deleteTails();
            this.toLeft()
            resolve()
        })
        
        
    }

    moveUp():Promise<void>{
        return new Promise((resolve)=>{
            this.deleteTails()
            this.rotateMatrix();
            this.toLeft();
            this.rotateMatrix();
            this.rotateMatrix();
            this.rotateMatrix();
            resolve()
        })
    }

    moveRight():Promise<void>{
        return new Promise((resolve)=>{
            this.deleteTails()
            this.rotateMatrix();
            this.rotateMatrix();
            this.toLeft();
            this.rotateMatrix();
            this.rotateMatrix();
            resolve()
        })
        
    }

    moveBottom():Promise<void>{
        return new Promise((resolve)=>{
            this.deleteTails()
           
            this.rotateMatrix();
            this.rotateMatrix();
            this.rotateMatrix();
            this.toLeft();
            this.rotateMatrix();
            
            resolve()
        })
    }

    getTails() {
        const locTails:Tail[] = [];
        this.board.forEach((row)=>{
            row.forEach((cell)=>{
                if (cell.idTails.length) {
                    locTails.push(...cell.idTails)
                }
            })
        })
        return locTails
    }
    
    deleteTails() {
        this.board.forEach((row)=>{
            row.forEach((cell)=>{
                cell.idTails = cell.cellTails.filter((tail) => !tail.isDelete)
            })
        })
    }

    checkTail():Promise<void>{
        return new Promise((resolve)=>{
            this.tails = this.getTails();
            const tail = this.addTile();
            if (tail){
                this.tails.push(tail);
            }
            resolve();
        })
    }

    checkWin() {
        for (let y = 0; y < 4; y++){
            for (let x = 0; x < 4; x++){
                if (this.board[y][x].value == 2048){
                    this.isWin = true;

                }
            }
        }
    }

    canMove(){
        const move1 = this.isMove();
        this.rotateMatrix();
        const move2 = this.isMove();
        this.rotateMatrix();
        const move3 = this.isMove();
        this.rotateMatrix();
        const move4 = this.isMove();
        this.rotateMatrix();
        return move1 || move2 || move3 || move4;
    }

    private isMove() {
        for (let y = 0; y < 4; y++){
            for (let x = 0; x < 3; x++){
                if (this.board[y][x].value === this.board[y][x + 1].value){
                    return true
                }
            }
        }
    }

}

export default Board;