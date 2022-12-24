
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useEvent } from '../../helpers/hooks';
import { TCell } from '../../helpers/types';
import Board from '../../models/Board'
import { Tail } from '../../models/Tail';
import CellView from '../CellView';
import TailView from '../TailView';
import './boardView.css'

interface IBoardView {
    board:Board;
    setLose:(value:boolean) => void;
    setWin:(value:boolean) => void;
    showScore:(value:number) => void;
}

const BoardView:FC<IBoardView> = ({board, setLose,setWin, showScore}) => {
    
    const [cells, setCells] = useState<TCell[]>([]);
    const [tails, setTails] = useState<Tail[]>([]);
    const [gameBoard, setGameBoard] = useState(board);

    useEffect(()=>{
        setGameBoard(board);
    },[board])

    useEffect(()=>{
        gameBoard.init();
        setCells([...gameBoard.board.flat()])
        setTails(gameBoard.tails);
        showScore(gameBoard.score);
    },[gameBoard])
    
    const checkLose = ()=>{
        if (board.isLose) {
            setLose(true);
        }
    }
    
    const checkWin = ()=>{
        if (board.isWin) {
            setWin(true);
        }
    }

    const checkBoard = async()=>{
        await gameBoard.checkTail();
        checkLose();
        checkWin();
        setTails([...gameBoard.tails]);
        showScore(gameBoard.score);
    }

    const handleKeyDown = useCallback(async(event:Event) => {
        if (gameBoard.isLose || gameBoard.isWin) return;
        switch ((event as KeyboardEvent).key) {
            case 'ArrowUp' :
                await gameBoard.moveUp();
                checkBoard();
                break
            case 'ArrowDown' :
                await gameBoard.moveBottom();
                checkBoard();
                break
            case 'ArrowLeft' :
                await gameBoard.moveLeft();
                checkBoard();
                break
            case 'ArrowRight' :
                await gameBoard.moveRight();
                checkBoard();
                break
        }
    },[gameBoard])

    useEvent('keydown', handleKeyDown)

    return (
        <div className="board" >
            {cells.map((item,idx) => {
                
                return <CellView key={idx}/>
            } )}

            {tails.map((item) => { 
                return <TailView key={item.id} tail={item} />
            })}

        </div>
    )
}

export default BoardView;