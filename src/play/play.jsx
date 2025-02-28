import React, { useState, useEffect } from "react";
import Player from "./Player";
import Ball from "./Ball";
import Powerup from "./Powerup";

const Play = () => {
  const gameWidth = 600;
  const gameHeight = 400;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [ballPositions, setBallPositions] = useState([]);
  const [ballSpeed, setBallSpeed] = useState(2);
  const [isInvincible, setIsInvincible] = useState(false);
  const [score, setScore] = useState(0);

  // Update ball positions
  const updateBallPosition = (ball) => {
    setBallPositions((prev) => [...prev.filter((b) => b !== ball), ball]);
  };

  // Collision Detection
  useEffect(() => {
    const checkCollision = () => {
      if (!isInvincible) {
        for (let ball of ballPositions) {
          let dx = Math.abs(playerPosition.x - ball.x);
          let dy = Math.abs(playerPosition.y - ball.y);
          if (dx < 20 && dy < 20) {
            endGame();
          }
        }
      }
    };

    const collisionInterval = setInterval(checkCollision, 50);
    return () => clearInterval(collisionInterval);
  }, [playerPosition, ballPositions, isInvincible]);

  // Score timer
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(scoreInterval);
  }, []);

  // Save High Score
  const endGame = () => {
    alert(`Game Over! Your Score: ${score}`);
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(score);
    highscores = highscores.sort((a, b) => b - a).slice(0, 3);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    setScore(0);
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
      <Player gameWidth={gameWidth} gameHeight={gameHeight} setPlayerPosition={setPlayerPosition} />
      <Ball gameWidth={gameWidth} gameHeight={gameHeight} speed={ballSpeed} updateBallPosition={updateBallPosition} />
      <Ball gameWidth={gameWidth} gameHeight={gameHeight} speed={ballSpeed} updateBallPosition={updateBallPosition} />
      <Powerup gameWidth={gameWidth} gameHeight={gameHeight} onCollect={handlePowerup} />
    </div>
  );
};

export { Play };

