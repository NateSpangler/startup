import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Add useNavigate
import Player from "./Player";
import Ball from "./Ball";
import Powerup from "./Powerup"; // Assuming Powerup component is needed

const Play = () => {
  const gameWidth = 600;
  const gameHeight = 400;
  const [playerPosition, setPlayerPosition] = useState({ x: gameWidth / 2, y: gameHeight / 2 });
  const [ballPosition, setBallPosition] = useState([]);
  const [ballSpeed, setBallSpeed] = useState(10);
  const [isInvincible, setIsInvincible] = useState(false);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  
  const navigate = useNavigate();  // For redirection
  
  useEffect(() => {
    // Check if the user is authenticated by verifying if there's a token
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    } else {
      // Fetch the player's high scores
      fetch('/api/scores', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.split('=')[1]}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setHighScores(data); // Set the high scores if needed
        })
        .catch(error => {
          console.error('Error fetching scores:', error);
          alert('Error loading game data. Please try again.');
        });
    }
  }, [navigate]);  // Depend on navigate for correct redirection logic
  
  const handleScoreSubmit = (score) => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

    if (token) {
      fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.split('=')[1]}`,
        },
        body: JSON.stringify({ score: score }),
      })
        .then(response => response.json())
        .then(updatedScores => {
          setHighScores(updatedScores); // Update high scores after submission
        })
        .catch(error => {
          console.error('Error submitting score:', error);
          alert('Error submitting your score. Please try again.');
        });
    }
  };

  // Collision Detection (Fixed)
  useEffect(() => {
    if (gameOver) return;
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

  // End the game and save high scores
  const endGame = () => {
    if (!gameOver) {
      setGameOver(true);
      alert(`Game Over! Your Score: ${score}`);
      handleScoreSubmit(score);  // Submit the score to the backend

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
        border: "2px solid white",
        overflow: "hidden",
      }}
    >
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
