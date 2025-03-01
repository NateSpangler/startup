import React, { useState, useEffect, useRef } from "react";

const Player = ({ gameWidth, gameHeight, setPlayerPosition }) => {
  const [position, setPosition] = useState({ x: gameWidth / 2, y: gameHeight / 2 });
  const playerRef = useRef(null); // Ref for tracking the player DOM element

  useEffect(() => {
    const handleKeyDown = (event) => {
      setPosition((prev) => {
        let { x, y } = prev;
        const speed = 35;

        if (event.key === "ArrowUp" && y > 0) y -= speed;
        if (event.key === "ArrowDown" && y < gameHeight - 20) y += speed;
        if (event.key === "ArrowLeft" && x > 0) x -= speed;
        if (event.key === "ArrowRight" && x < gameWidth - 20) x += speed;

        return { x, y };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameWidth, gameHeight]);

  useEffect(() => {
    console.log("Player state position:", position); // Add log to track state position
    setPlayerPosition(position);
    
    // Track the rendered position using useRef
    if (playerRef.current) {
      const { x, y } = playerRef.current.getBoundingClientRect();
      console.log(`Rendered Player Position: x=${x}, y=${y}`);
    }
  }, [position, setPlayerPosition]);

  
  return (
    <div
  ref={playerRef}
  style={{
    position: "absolute",
    width: "40px",
    height: "40px",
    backgroundColor: "blue",
    borderRadius: "50%",
    left: `${gameWidth / 2}px`,  // Hardcoded position
    top: `${gameHeight / 2}px`,  // Hardcoded position
  }}
/>

  );
};

export default Player;
