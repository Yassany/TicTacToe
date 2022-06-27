import React from 'react';
import './App.css';
import { Game } from './features/game/Game';
import { GameBBar } from './features/game/GameBBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        <Game />
        <GameBBar />
      </header>
    </div>
  );
}

export default App;
