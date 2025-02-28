import React, { useState, useEffect } from "react";
import Player from "./Player";
import Ball from "./Ball";
import Powerup from "./Powerup";

const Play = () => {
  const gameWidth = 600;
  const gameHeight = 400;
  const [playerPosition, setPlayerPosition] = useState({ x: gameWidth / 2, y: gameHeight / 2 });
  const [ballPositions, setBallPositions] = useState([]);
  const [ballSpeed, setBallSpeed] = useState(5);
  const [isInvincible, setIsInvincible] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Update ball positions
  const updateBallPosition = (ball) => {
    setBallPositions((prev) => {
      return prev.filter((b) => b !== ball).concat({
        ...ball,
        x: Math.max(0, Math.min(gameWidth - 20, ball.x)),
        y: Math.max(0, Math.min(gameHeight - 20, ball.y)),
      });
    });
  };

  // Collision Detection (Fixed)
  useEffect(() => {
    if (gameOver) return;

    const checkCollision = () => {
      if (!isInvincible) {
        for (let ball of ballPositions) {
          // Ensure the ball is within the game area before checking collision
          if (ball.x >= 0 && ball.x <= gameWidth - 20 && ball.y >= 0 && ball.y <= gameHeight - 20) {
            let dx = Math.abs(playerPosition.x - ball.x);
            let dy = Math.abs(playerPosition.y - ball.y);
            if (dx < 1 && dy < 1) {
              endGame();
              return;
            }
          }
        }
      }
    };

    const collisionInterval = setInterval(checkCollision, 50);
    return () => clearInterval(collisionInterval);
  }, [playerPosition, ballPositions, isInvincible, gameOver]);

  // Score timer
  useEffect(() => {
    if (gameOver) return;

    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(scoreInterval);
  }, [gameOver]);

  // Save High Score
  const endGame = () => {
    if (!gameOver) {
      setGameOver(true);
      alert(`Game Over! Your Score: ${score}`);

      let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      highscores.push(score);
      highscores = highscores.sort((a, b) => b - a).slice(0, 3);
      localStorage.setItem("highscores", JSON.stringify(highscores));
    }
  };

  // Restart Game
  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setBallSpeed(5);
    setIsInvincible(false);
    setPlayerPosition({ x: gameWidth / 2, y: gameHeight / 2 });
  };

  // Handle Power-ups
  const handlePowerup = (type) => {
    if (type === "invincible") {
      setIsInvincible(true);
      setTimeout(() => setIsInvincible(false), 10000);
    } else if (type === "slow") {
      setBallSpeed(1);
      setTimeout(() => setBallSpeed(2), 10000);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: `${gameWidth}px`,
        height: `${gameHeight}px`,
        border: "2px solid black",
        overflow: "hidden",
      }}
    >
      {!gameOver ? (
        <>
          <Player gameWidth={gameWidth} gameHeight={gameHeight} setPlayerPosition={setPlayerPosition} />
          <Ball gameWidth={gameWidth} gameHeight={gameHeight} speed={ballSpeed} updateBallPosition={updateBallPosition} />
          <Ball gameWidth={gameWidth} gameHeight={gameHeight} speed={ballSpeed} updateBallPosition={updateBallPosition} />
          <Powerup gameWidth={gameWidth} gameHeight={gameHeight} onCollect={handlePowerup} />
          <div style={{ position: "absolute", top: "10px", left: "10px", fontSize: "18px" }}>Score: {score}</div>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "150px" }}>
          <h2>Game Over</h2>
          <p>Your Score: {score}</p>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export { Play };