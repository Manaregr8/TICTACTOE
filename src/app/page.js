"use client";
import { useState } from 'react';
import PlayerSetup from './components/playerData';
import GameBoard from './components/mainGame';
import Header from './components/header';
export default function Home() {
  const [players, setPlayers] = useState(null);

  return (
    <div>
      <Header/>
      {!players
        ? <PlayerSetup onStart={(p1, p2) => setPlayers([p1, p2])} />
        : <GameBoard players={players} />
      }
    </div>
  );
}
