import React, { useState, useEffect, useRef } from "react";

const Ball = ({ gameWidth, gameHeight, speed, setBallPosition }) => {
  const [position, setPosition] = useState({
    id: Math.random(),
    x: Math.random() * gameWidth,
    y: Math.random() * gameHeight,
    dx: Math.random() > 0.5 ? speed : -speed,
    dy: Math.random() > 0.5 ? speed : -speed,
  });

  const ballRef = useRef(null); // Ref to track the rendered ball element



  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let { x, y, dx, dy} = prev;
        // Bounce off walls
        if (x + 40 > gameWidth || x < 0) dx = -dx;
        if (y + 40 > gameHeight || y < 0) dy = -dy;
        return { x: x + dx, y: y + dy, dx, dy };
      });
    }, 50);

    
  }, []);
  useEffect(() => {
      setBallPosition(position); // Update the parent component with the player's position
      console.log("Ball state position:", position); // Log the state position for debugging

  
    // Track rendered ball position
    if (ballRef.current) {
      const { left, top } = ballRef.current.getBoundingClientRect();
      console.log(`Rendered Ball Position: left=${left}, top=${top}`);
    }
  }, [position, setBallPosition]);

  return (
    <div
      ref={ballRef} // Attach the ref here
      style={{
        position: "relative",
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
