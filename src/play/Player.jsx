import React, { useState, useEffect, useRef } from "react";

const Player = ({ gameWidth, gameHeight, setPlayerPosition }) => {
  const [position, setPosition] = useState({ x: gameWidth / 2, y: gameHeight / 2 });
  const playerRef = useRef(null); // Ref for tracking the player DOM element

  // Handle keyboard input for player movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      setPosition((prev) => {
        let { x, y } = prev;
        const speed = 25;

        if (event.key === "w" && y > 0) y -= speed;
        if (event.key === "s" && y < gameHeight - 40) y += speed; // Account for player height
        if (event.key === "a" && x > 0) x -= speed;
        if (event.key === "d" && x < gameWidth - 40) x += speed; // Account for player width

        return { x, y };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameWidth, gameHeight]);

  // Update the parent component with the player's state position
  useEffect(() => {
    setPlayerPosition(position); // Update the parent component with the player's position
    console.log("Player state position:", position); // Log the state position for debugging

    // Track the rendered position using useRef
    if (playerRef.current) {
      const { left, top } = playerRef.current.getBoundingClientRect();
      console.log(`Rendered Player Position: left=${left}, top=${top}`);
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
        left: `${position.x}px`,  // Use dynamic position from state
        top: `${position.y}px`,   // Use dynamic position from state
      }}
    />
  );
};

export default Player;

