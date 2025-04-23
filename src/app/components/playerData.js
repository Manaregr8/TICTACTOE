import React, { useState } from 'react';
import Styles from "./playerData.module.css";

export default function PlayerSetup({ onStart }) {
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const [symbol, setSymbol] = useState("O");
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');

  return (
    <div className={Styles.setupbox}>
      <div className={Styles.setupcontainer}>
        <div className={Styles.switchButttons}>
          <button
            className={Styles.singlePlayer}
            style={{ backgroundColor: isSinglePlayer ? "#222" : "black" }}
            onClick={() => setIsSinglePlayer(true)}
          >
            Single Player
          </button>
          <button
            className={Styles.multiPlayer}
            style={{ backgroundColor: !isSinglePlayer ? "#222" : "black" }}
            onClick={() => setIsSinglePlayer(false)}
          >
            Multiplayer
          </button>
        </div>

        <div className={Styles.contentBox}>
          <input
            type='text'
            placeholder='Name of Player One'
            value={playerOne}
            onChange={(e) => setPlayerOne(e.target.value)}
          />
          <div style={{ marginTop: "10px", color: "white", fontSize: "18px" }}>
            <label>
              Choose Your Symbol:&nbsp;
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                style={{ fontSize: "18px", padding: "5px", backgroundColor:'black', color:'white' }}
              >
                <option value="O">O</option>
                <option value="X">X</option>
              </select>
            </label>
          </div>

          {!isSinglePlayer && (
            <input
              type='text'
              placeholder='Name of Player Two'
              value={playerTwo}
              onChange={(e) => setPlayerTwo(e.target.value)}
              style={{ marginTop: "10px" }}
            />
          )}

          <button
            type='submit'
            className={Styles.submitButton}
            onClick={() => {
              const player1 = { name: playerOne || "Player 1", symbol };
              const player2 = isSinglePlayer
                ? { name: "Computer", symbol: symbol === "O" ? "X" : "O", isComputer: true }
                : { name: playerTwo || "Player 2", symbol: symbol === "O" ? "X" : "O" };
                onStart(player1, player2);
            }}
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}
