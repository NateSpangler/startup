import React, { useState, useEffect } from "react";
import Player from "./Player";
import Ball from "./Ball";
import Powerup from "./Powerup";

const Play = () => {
  const gameWidth = 600;
  const gameHeight = 400;
  const [playerPosition, setPlayerPosition] = useState({ x: gameWidth / 2, y: gameHeight / 2 });
  const [ballPosition, setBallPosition] = useState([]);
  const [ballSpeed, setBallSpeed] = useState(10);
  const [isInvincible, setIsInvincible] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  
    

  // Collision Detection (Fixed)
  useEffect(() => {
    if (gameOver) return;
    console.log("Checking collision with ball position: ", ballPosition);
    const checkCollision = () => {
      if (!isInvincible) {
          if (ballPosition.x >= 0 && ballPosition.x <= gameWidth - 20 && ballPosition.y >= 0 && ballPosition.y <= gameHeight - 20) {
            let difx = Math.abs(playerPosition.x - ballPosition.x);
            let dify = Math.abs(playerPosition.y - ballPosition.y);
          
            if (difx < 40 && dify < 40) {
              console.log("Collision detected! Ending game.");
              endGame();
              return;
            }
          }
          }
        };
      
    

    const collisionInterval = setInterval(checkCollision, 10);
    return () => clearInterval(collisionInterval);
  }, [playerPosition, ballPosition, isInvincible, gameOver]);


  // Score timer
  useEffect(() => {
    if (gameOver) return;

    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + 10);
    }, 100);

    return () => clearInterval(scoreInterval);
  }, [gameOver]);

  
  // Save High Score
  const endGame = () => {
    if (!gameOver) {
      setGameOver(true);
      alert(`Game Over! Your Score: ${score}`);

      let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      let playerName = localStorage.getItem("playerName") || "Unknown";

      highscores.push({ name: playerName, score });
      highscores = highscores.sort((a, b) => b.score - a.score).slice(0, 10);
      localStorage.setItem("highscores", JSON.stringify(highscores));
    }
  };

  // Restart Game
  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setBallSpeed(6);
    setIsInvincible(false);
    setPlayerPosition({ x: gameWidth / 2, y: gameHeight / 2 });
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
          {/* Pass setPlayerPosition instead of setPosition */}
          <Player gameWidth={gameWidth} gameHeight={gameHeight} setPlayerPosition={setPlayerPosition} />

          {/* Pass updateBallPosition instead of setPosition */}
          <Ball gameWidth={gameWidth} gameHeight={gameHeight} speed={ballSpeed} setBallPosition={setBallPosition} />
          
          
          <div style={{ position: "absolute", top: "10px", left: "10px", fontSize: "18px" }}>Score: {score}</div>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "150px" }}>
          <h2>Game Over</h2>
          <p>Your Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export { Play };
