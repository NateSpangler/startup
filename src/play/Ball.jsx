import React, { useState, useEffect, useRef } from "react";

const Ball = ({ gameWidth, gameHeight, speed, updateBallPosition }) => {
  const [position, setPosition] = useState({
    x: Math.random() * gameWidth,
    y: Math.random() * gameHeight,
    dx: Math.random() > 0.5 ? speed : -speed,
    dy: Math.random() > 0.5 ? speed : -speed,
  });

  const ballRef = useRef(null); // Ref to track the rendered ball element

  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let { x, y, dx, dy } = prev;

        // Bounce off walls
        if (x + 20 > gameWidth || x < 0) dx = -dx;
        if (y + 20 > gameHeight || y < 0) dy = -dy;

        return { x: x + dx, y: y + dy, dx, dy };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameWidth, gameHeight, speed]);

  useEffect(() => {
    // setPosition(position);
    // Track rendered ball position
    if (ballRef.current) {
      const { x, y } = ballRef.current.getBoundingClientRect();
    }
  }, [position]);

  return (
    <div
      ref={ballRef} // Attach the ref here
      style={{
        position: "absolute",
        width: "40px",
        height: "40px",
        backgroundColor: "white",
        borderRadius: "50%",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default Ball;
