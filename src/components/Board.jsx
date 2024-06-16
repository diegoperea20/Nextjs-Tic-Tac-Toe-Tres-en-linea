import React from 'react';
import styles from './Board.module.css';

const Board = ({ squares, onClick, boardSize }) => {
  const renderSquare = (i) => (
    <button key={i} className={styles.square} onClick={() => onClick(i)}>
      {squares[i]}
    </button>
  );

  const createBoard = () => {
    let board = [];
    for (let row = 0; row < boardSize; row++) {
      let boardRow = [];
      for (let col = 0; col < boardSize; col++) {
        boardRow.push(renderSquare(row * boardSize + col));
      }
      board.push(<div key={row} className={styles.boardRow}>{boardRow}</div>);
    }
    return board;
  };

  return (
    <div>
      {createBoard()}
    </div>
  );
};

export default Board;
