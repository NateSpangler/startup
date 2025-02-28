import React, { useEffect, useState } from "react";

const Powerup = ({ gameWidth, gameHeight, onCollect }) => {
  const [powerup, setPowerup] = useState(null);

  useEffect(() => {
    const spawnPowerup = () => {
      const types = ["invincible", "slow"];
      const type = types[Math.floor(Math.random() * types.length)];
      setPowerup({
        type,
        x: Math.random() * (gameWidth - 20),
        y: Math.random() * (gameHeight - 20),
      });

      setTimeout(() => setPowerup(null), 10000);
    };

    const powerupInterval = setInterval(spawnPowerup, 30000);
    return () => clearInterval(powerupInterval);
  }, [gameWidth, gameHeight]);

  if (!powerup) return null;

  return (
    <div
      onClick={() => onCollect(powerup.type)}
      style={{
        position: "absolute",
        width: "20px",
        height: "20px",
        backgroundColor: powerup.type === "invincible" ? "yellow" : "green",
        borderRadius: "50%",
        left: `${powerup.x}px`,
        top: `${powerup.y}px`,
        cursor: "pointer",
      }}
    />
  );
};

export default Powerup;

