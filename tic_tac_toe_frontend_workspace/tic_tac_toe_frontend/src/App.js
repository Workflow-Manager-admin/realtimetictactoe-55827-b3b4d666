import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Represents the tic tac toe board as a 9-element array
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' (Player 1) starts first
  const [currentPlayer, setCurrentPlayer] = useState('X');
  // Game status
  const [status, setStatus] = useState('playing');
  // Winning line positions for highlight
  const [winLine, setWinLine] = useState([]);

  const playerColors = { X: 'var(--primary-color)', O: 'var(--secondary-color)' };

  // Returns winning info if win found, else null
  function checkWinner(brd) {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diags
    ];
    for (let line of lines) {
      const [a,b,c] = line;
      if (brd[a] && brd[a] === brd[b] && brd[a] === brd[c]) {
        return { winner: brd[a], line };
      }
    }
    return null;
  }

  // Performs a move
  function handleSquareClick(index) {
    if (board[index] || status !== 'playing') return;
    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    const winInfo = checkWinner(newBoard);
    if (winInfo) {
      setBoard(newBoard);
      setStatus('win');
      setWinLine(winInfo.line);
      return;
    }
    if (newBoard.every(Boolean)) {
      setBoard(newBoard);
      setStatus('draw');
      return;
    }
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  // Resets everything
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatus('playing');
    setWinLine([]);
  }

  // Status label logic
  function renderStatus() {
    if (status === 'win') {
      return (
        <>
          <span style={{color: playerColors[board[winLine[0]]]}}>
            Player {board[winLine[0]]} wins!
          </span>
        </>
      );
    }
    if (status === 'draw') return <span style={{color: '#999'}}>Draw!</span>;
    return (
      <>
        <span style={{color: playerColors[currentPlayer]}}>
          Player {currentPlayer}
        </span>
        &apos;s turn
      </>
    );
  }

  // Square component
  function Square({ value, onClick, highlight }) {
    return (
      <button
        className={`ttt-square${highlight ? ' ttt-square-win' : ''}`}
        onClick={onClick}
        aria-label={value ? `Cell: ${value}` : 'Empty cell'}
        tabIndex={0}
        style={
          value
            ? { color: playerColors[value] }
            : undefined
        }
      >
        {value}
      </button>
    );
  }

  // Renders 3x3 board
  function Board() {
    return (
      <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
        {board.map((value, i) =>
          <Square
            key={i}
            value={value}
            highlight={winLine.includes(i)}
            onClick={() => handleSquareClick(i)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app ttt-app">
      <nav className="navbar ttt-navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" style={{color: 'var(--accent-color)'}}>⌗</span>
              Tic Tac Toe
            </div>
          </div>
        </div>
      </nav>
      <main className="ttt-main">
        <div className="ttt-flex-center">
          <div className="ttt-panel">
            <div className="ttt-status">{renderStatus()}</div>
            <Board />
            <div className="ttt-controls">
              <button className="btn ttt-restart-btn" onClick={handleRestart}>
                {status === 'playing' ? 'Restart Game' : 'Play Again'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="ttt-footer">
        <span>Minimalistic React Tic Tac Toe – Two Player</span>
      </footer>
    </div>
  );
}

export default App;
