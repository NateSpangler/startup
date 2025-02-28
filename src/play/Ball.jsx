import React, { useEffect, useState } from "react";

const Ball = ({ gameWidth, gameHeight, speed, updateBallPosition }) => {
  const [position, setPosition] = useState({
    x: Math.random() * gameWidth,
    y: Math.random() * gameHeight,
    dx: Math.random() > 0.5 ? speed : -speed,
    dy: Math.random() > 0.5 ? speed : -speed,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let { x, y, dx, dy } = prev;

        // Bounce off walls
        if (x + 20 > gameWidth || x < 0) dx = -dx;
        if (y + 20 > gameHeight || y < 0) dy = -dy;

        let newPos = { x: x + dx, y: y + dy, dx, dy };
        updateBallPosition(newPos);
        return newPos;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameWidth, gameHeight, speed]);

  return (
    <div
      style={{
        position: "absolute",
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default Ball;
