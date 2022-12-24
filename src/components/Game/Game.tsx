import { useMemo, useState } from "react";
import Board from "../../models/Board";
import BoardView from "../BoardView";

import './game.css';

const Game = () => {
    const [board, setBoard] = useState(new Board());
    const [lose, setLose] = useState(false);
    const [win, setWin] = useState(false);
    const [score, setScore] = useState(0);


    const handleClick = () => {
        setBoard(new Board())
    }

    const textMessage = useMemo(()=>{
        if (lose) {
            return 'Проигрыш';
        }
        
        if (win) {
            return 'Победа!!!';
        }
        
        return '';
    },[lose, win])

    return (
        <div className="game">
            <div className="menu">
                <div className="score">{score}</div>
                <button onClick={handleClick} className='btnAgain'> Заново </button>
            </div>
            <BoardView board={board} setLose={setLose} setWin={setWin} showScore={setScore}/>
        </div>
    )
}

export default Game;
