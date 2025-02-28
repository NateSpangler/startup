import React, { useState } from 'react';
import PlayerMovement from './PlayerMovement';
import BallMovement from './BallMovement';



export function Play() {
  const [score, setScore] = useState(0);  // State to keep track of score
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <main>
      <br></br>
      {/* Score display */}
      <div id="highScoreDisplay" className="score">Score: {score}</div> 

      {/* Game Over screen */}
      {isGameOver ? (
        <div className="game-over-screen">
          <h1>Game Over!</h1>
          <p>Your Score: {score}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        <div className="game-area">
          {/* Avatar (player) */}
          <PlayerMovement />

          {/* Ball components */}
          <BallMovement onGameOver={handleGameOver} />
          
          {/* Additional ball (you can add as many as you need) */}
          <div className="ball">
            <div className="ball_effect"></div>
          </div>
        </div>
      )}

      <br></br>
      <br></br>
    </main>
  );
}