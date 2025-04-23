"use client";
import React, { useEffect, useState } from 'react';
import Styles from './mainGame.module.css';

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export default function GameBoard({ players }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [current, setCurrent] = useState(players[0]);
  const [winner, setWinner] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = current.symbol;
    setBoard(newBoard);

    const foundWin = winPatterns.find(([a, b, c]) => {
      return newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c];
    });

    if (foundWin) {
      setWinner(current);
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner({ name: "No one" }); // Draw
    } else {
      setCurrent(current.symbol === players[0].symbol ? players[1] : players[0]);
    }
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrent(players[0]);
    setWinner(null);
    setIsThinking(false);
  };
  
  useEffect(() => {
    if (current.isComputer && !winner) {
      setIsThinking(true);

      const emptyIndices = board
        .map((val, idx) => val === null ? idx : null)
        .filter(val => val !== null);

      const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

      if (randomMove !== undefined) {
        setTimeout(() => {
          handleClick(randomMove);
          setIsThinking(false);
        }, 1000);
      }
    }
  }, [current]);

  return (
    <div className={Styles.mainGame}>
      <div className={Styles.playerData}>
        <p className={Styles.playerTitle}>
          Player 1: {players[0].name} <span style={{ color: '#34c8f6' }}>({players[0].symbol})</span>
        </p>
        <p className={Styles.playerTitle}>
          Player 2: {players[1].name} <span style={{ color: '#34c8f6' }}>({players[1].symbol})</span>
        </p>
      </div>

      <div className={Styles.board}>
        {board.map((val, i) => (
          <button key={i} className={Styles.cell} onClick={() => handleClick(i)}>
            {val}
          </button>
        ))}
      </div>

      {isThinking && (
        <div style={{ marginTop: '15px', color: '#aaa', fontSize: '18px' }}>
          Computer is thinking...
        </div>
      )}

      {winner && (
        <div style={{ marginTop: '20px', fontSize: '24px', color: '#34c8f6' }}>
          🎉 {winner.name} wins!
          <button
    onClick={resetGame}
    style={{
      marginTop: '10px',
      padding: '10px 20px',
      backgroundColor: '#34c8f6',
      border: 'none',
      borderRadius: '5px',
      color: 'Black',
      textTransform:'uppercase',
      marginLeft:'20px', 
      fontWeight:'800', 
      fontSize: '18px',
      cursor: 'pointer'
    }}
  >
    Retry
  </button>
        </div>
      )}
    </div>
  );
}
