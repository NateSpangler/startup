import React, { useState, useEffect } from 'react';
import './app.css'; // Import your CSS file

const PlayerMovement = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });

  const handleKeyDown = (event) => {
    const { key } = event;
    setPlayerPosition((prevPosition) => {
      let newX = prevPosition.x;
      let newY = prevPosition.y;

      const speed = 10;

      if (key === 'ArrowUp') newY = Math.max(0, prevPosition.y - speed);
      if (key === 'ArrowDown') newY = Math.min(100, prevPosition.y + speed);
      if (key === 'ArrowLeft') newX = Math.max(0, prevPosition.x - speed);
      if (key === 'ArrowRight') newX = Math.min(100, prevPosition.x + speed);

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="game-area"> 
      <div
        className="player"
        style={{
          top: `${playerPosition.y}%`,
          left: `${playerPosition.x}%`,
        }}
      ></div>
    </div>
  );
};

export default PlayerMovement;
