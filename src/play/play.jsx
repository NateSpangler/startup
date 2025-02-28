import React, { useState, useEffect } from 'react';
import PlayerMovement from './PlayerMovement';
import BallMovement from './BallMovement';
import { PowerUp } from './PowerUp';


export function Play() {
  const [score, setScore] = useState(0);  // State to keep track of score
  const [isGameOver, setIsGameOver] = useState(false);
  const [powerUps, setPowerUps] = useState([]); // Track spawned power-ups
  const [invincible, setInvincible] = useState(false);
  const [ballSpeed, setBallSpeed] = useState(5); // Default ball speed

  useEffect(() => {
    // Spawn power-ups every 30 seconds
    const interval = setInterval(() => {
      const newPowerUp = {
        type: Math.random() > 0.5 ? 'invincibility' : 'slowBall', // Randomize power-up
        position: {
          top: Math.random() * 400 + 50,  // Random position
          left: Math.random() * 400 + 50
        }
      };
      setPowerUps((prev) => [...prev, newPowerUp]);
    }, 30000);
  
    // Increase score every second
    const scoreInterval = setInterval(() => {
      setScore(prevScore => prevScore + 1); // Increment score by 1 every second
    }, 1000); // Update every 1000ms (1 second)
    return () => clearInterval(interval); // Cleanup when component unmounts
  }, []);
  
 

  const handlePowerUpPickUp = (type) => {
    if (type === 'invincibility') {
      setInvincible(true);
      setTimeout(() => setInvincible(false), 10000); // Invincibility lasts 10 seconds
    } else if (type === 'slowBall') {
      setBallSpeed(2); // Slow balls down
      setTimeout(() => setBallSpeed(5), 10000); // Reset ball speed after 10 seconds
    }
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setScore(0); // Reset score when game over
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    setPowerUps([]);
    setBallSpeed(5);
  };

  return (
    <main>
      <div id="highScoreDisplay" className="score">Score: {score}</div> {/* Display current score */}

      {isGameOver ? (
        <div className="game-over-screen">
          <h1>Game Over!</h1>
          <p>Your Score: {score}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        <div className="game-area">
          <PlayerMovement invincible={invincible} /> {/* Pass invincible state to the player */}
          <BallMovement ballSpeed={ballSpeed} onGameOver={handleGameOver} />

          {/* Render power-ups */}
          {powerUps.map((powerUp, index) => (
            <PowerUp
              key={index}
              type={powerUp.type}
              position={powerUp.position}
              onPickUp={handlePowerUpPickUp}
            />
          ))}
        </div>
      )}
    </main>
  );
}