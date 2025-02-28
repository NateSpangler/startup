import React, { useState, useEffect } from 'react';


const BallMovement = ({ playerPosition, onGameOver }) => {
  const [ballPositions, setBallPositions] = useState([
    { x: 10, y: 10, dx: 2, dy: 2 },
    { x: 90, y: 90, dx: -2, dy: -2 },
  ]);

  useEffect(() => {
    const moveBalls = () => {
      setBallPositions((prevPositions) =>
        prevPositions.map((ball) => {
          let newX = ball.x + ball.dx;
          let newY = ball.y + ball.dy;

          if (newX <= 0 || newX >= 100) ball.dx = -ball.dx;
          if (newY <= 0 || newY >= 100) ball.dy = -ball.dy;

          return { ...ball, x: newX, y: newY };
        })
      );
    };

    const interval = setInterval(moveBalls, 20);

    return () => clearInterval(interval);
  }, []);

  const checkCollision = () => {
    ballPositions.forEach((ball) => {
      const ballRadius = 2;
      const playerRadius = 2;

      const distance = Math.sqrt(
        Math.pow(ball.x - playerPosition.x, 2) + Math.pow(ball.y - playerPosition.y, 2)
      );

      if (distance < ballRadius + playerRadius) {
        onGameOver();
      }
    });
  };

  useEffect(() => {
    const collisionCheckInterval = setInterval(checkCollision, 20);

    return () => clearInterval(collisionCheckInterval);
  }, [ballPositions, playerPosition]);

  return (
    <>
      {ballPositions.map((ball, index) => (
        <div
          key={index}
          className="ball"
          style={{
            top: `${ball.y}%`,
            left: `${ball.x}%`,
          }}
        ></div>
      ))}
    </>
  );
};

export default ballMovement;
