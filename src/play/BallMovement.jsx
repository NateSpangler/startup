import React, { useEffect, useState } from 'react';

export default function BallMovement({ ballSpeed, onGameOver, invincible }) {
  const [ballPosition1, setBallPosition1] = useState({ top: 50, left: 50 });
  const [ballPosition2, setBallPosition2] = useState({ top: 100, left: 100 });
  const [ballDirection1, setBallDirection1] = useState({ top: 2, left: 2 });
  const [ballDirection2, setBallDirection2] = useState({ top: 2, left: -2 });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update ball positions based on speed and direction
      setBallPosition1((prevPosition) => ({
        top: prevPosition.top + ballDirection1.top * ballSpeed,
        left: prevPosition.left + ballDirection1.left * ballSpeed
      }));
      setBallPosition2((prevPosition) => ({
        top: prevPosition.top + ballDirection2.top * ballSpeed,
        left: prevPosition.left + ballDirection2.left * ballSpeed
      }));

      // Bounce balls off top/bottom walls
      if (ballPosition1.top < 0 || ballPosition1.top > 500) {
        setBallDirection1((prev) => ({ ...prev, top: -prev.top }));
      }
      if (ballPosition1.left < 0 || ballPosition1.left > 500) {
        setBallDirection1((prev) => ({ ...prev, left: -prev.left }));
      }

      if (ballPosition2.top < 0 || ballPosition2.top > 500) {
        setBallDirection2((prev) => ({ ...prev, top: -prev.top }));
      }
      if (ballPosition2.left < 0 || ballPosition2.left > 500) {
        setBallDirection2((prev) => ({ ...prev, left: -prev.left }));
      }

      // Handle ball collision with the player (e.g., player at position {top: 400, left: 200})
      // Simple collision detection (assuming player is 50px wide and at y=400)
      if (
        ballPosition1.top >= 400 && ballPosition1.top <= 420 &&
        ballPosition1.left >= 200 && ballPosition1.left <= 250
      ) {
        if (!invincible) {
          onGameOver(); // End game if player is not invincible
        }
      }

      if (
        ballPosition2.top >= 400 && ballPosition2.top <= 420 &&
        ballPosition2.left >= 200 && ballPosition2.left <= 250
      ) {
        if (!invincible) {
          onGameOver(); // End game if player is not invincible
        }
      }
    }, 20); // Update every 20ms (50 FPS)

    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, [ballPosition1, ballPosition2, ballDirection1, ballDirection2, ballSpeed, invincible, onGameOver]);

  return (
    <div>
      <div
        className="ball"
        style={{
          top: ballPosition1.top,
          left: ballPosition1.left,
          position: 'absolute',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: 'red',
        }}
      ></div>
      <div
        className="ball"
        style={{
          top: ballPosition2.top,
          left: ballPosition2.left,
          position: 'absolute',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: 'blue',
        }}
      ></div>
    </div>
  );
}
