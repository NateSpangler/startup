import React, { useEffect, useState } from "react";

const Player = ({ gameWidth, gameHeight, setPlayerPosition }) => {
  const [position, setPosition] = useState({ x: gameWidth / 2, y: gameHeight / 2 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      setPosition((prev) => {
        let { x, y } = prev;
        const speed = 10;

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
    setPlayerPosition(position);
  }, [position, setPlayerPosition]);

  return (
    <div
      style={{
        position: "absolute",
        width: "20px",
        height: "20px",
        backgroundColor: "blue",
        borderRadius: "50%",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default Player;
