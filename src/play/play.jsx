import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const navigate = useNavigate();

  useEffect(() => {
    // Check if playerName is stored in sessionStorage
    const playerName = sessionStorage.getItem("playerName");

    if (!playerName) {
      // Redirect to the login page if no playerName found
      navigate("/");
    }
  }, [navigate]);

  const handleScoreSubmit = async (score) => {
    try {
      await axios.post("http://localhost:4000/api/score", { score }, { withCredentials: true });
      console.log("Score submitted successfully");
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  useEffect(() => {
    if (gameOver) return;
    const checkCollision = () => {
      if (!isInvincible) {
        for (const ball of ballPosition) {
          let difx = Math.abs(playerPosition.x - ball.x);
          let dify = Math.abs(playerPosition.y - ball.y);
          if (difx < 40 && dify < 40) {
            endGame();
            return;
          }
        }
      }
    };
    const collisionInterval = setInterval(checkCollision, 10);
    return () => clearInterval(collisionInterval);
  }, [playerPosition, ballPosition, isInvincible, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + 10);
    }, 100);
    return () => clearInterval(scoreInterval);
  }, [gameOver]);

  const endGame = () => {
    if (!gameOver) {
      setGameOver(true);
      alert(`Game Over! Your Score: ${score}`);
      handleScoreSubmit(score);
    }
  };

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setBallSpeed(6);
    setIsInvincible(false);
    setPlayerPosition({ x: gameWidth / 2, y: gameHeight / 2 });
  };

  return (
    <div style={{ position: "relative", width: `${gameWidth}px`, height: `${gameHeight}px`, border: "2px solid white", overflow: "hidden" }}>
      {!gameOver ? (
        <>
          <Player gameWidth={gameWidth} gameHeight={gameHeight} setPlayerPosition={setPlayerPosition} />
          <Ball gameWidth={gameWidth} gameHeight={gameHeight} speed={ballSpeed} setBallPosition={setBallPosition} />
          <div style={{ position: "absolute", top: "10px", left: "10px", fontSize: "18px" }}>Score: {score}</div>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "150px" }}>
          <h2>Game Over</h2>
          <p>Your Score: {score}</p>
          <button onClick={handleRestart}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export { Play };
