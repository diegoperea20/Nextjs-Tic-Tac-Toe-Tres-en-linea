"use client";
import React, { useState, useEffect } from 'react';
import Board from './Board';
import styles from './Game.module.css';

const Game = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [history, setHistory] = useState([Array(boardSize * boardSize).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isTwoPlayer, setIsTwoPlayer] = useState(false);

  useEffect(() => {
    setHistory([Array(boardSize * boardSize).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  }, [boardSize]);

  const current = history[stepNumber];
  const winner = calculateWinner(current, boardSize);
  const isTie = !winner && current.every(square => square !== null);

  useEffect(() => {
    if (!isTwoPlayer && !xIsNext && !winner && !isTie) {
      const emptyIndices = current.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      handleClick(randomIndex);
    }
  }, [xIsNext, isTwoPlayer, winner, isTie, current]);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.slice();

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([squares]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  const resetGame = () => {
    setHistory([Array(boardSize * boardSize).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const toggleTwoPlayer = () => {
    setIsTwoPlayer(!isTwoPlayer);
    resetGame();
  };

  const handleBoardSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 3 && size <= 10) {
      setBoardSize(size);
    }
  };

  const status = winner ? `Winner: ${winner}` : isTie ? 'Tie' : `Next player: ${xIsNext ? 'X' : 'O'}`;
 
  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board squares={current} onClick={handleClick} boardSize={boardSize} />
      </div>
      <div className={styles.gameInfo}>
        <div className={styles.divStatus}>{status}</div>
        <button className={styles.button} onClick={resetGame}>Play Again</button>
        <button className={styles.button} onClick={toggleTwoPlayer}>
          {isTwoPlayer ? 'Single Player' : 'Two Players'}
        </button>
        <div className={styles.customize}>
          <label htmlFor="board-size">Board Size:</label>
          <input 
            type="number" 
            id="board-size" 
            name="board-size" 
            min="3" 
            max="10" 
            value={boardSize} 
            onChange={handleBoardSizeChange} 
            className={styles.inputSize}
          />
        </div>
      </div>
      
    </div>
  );
};

const calculateWinner = (squares, boardSize) => {
  const lines = [];
  const size = boardSize;

  // Rows
  for (let i = 0; i < size; i++) {
    lines.push([...Array(size).keys()].map(x => x + i * size));
  }

  // Columns
  for (let i = 0; i < size; i++) {
    lines.push([...Array(size).keys()].map(x => x * size + i));
  }

  // Diagonals
  const diagonal1 = [...Array(size).keys()].map(x => x * (size + 1));
  const diagonal2 = [...Array(size).keys()].map(x => (x + 1) * (size - 1));
  lines.push(diagonal1);
  lines.push(diagonal2);

  for (let i = 0; i < lines.length; i++) {
    const [a, ...rest] = lines[i];
    if (squares[a] && rest.every(idx => squares[idx] === squares[a])) {
      return squares[a];
    }
  }

  return null;
};

export default Game;
