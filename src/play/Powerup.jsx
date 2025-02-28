// PowerUp.jsx
import React, { useState, useEffect } from 'react';

export function PowerUp({ type, position, onPickUp }) {
  const [isPickedUp, setIsPickedUp] = useState(false);

  useEffect(() => {
    // Automatically disappear after a set duration (e.g., 10 seconds)
    if (isPickedUp) {
      setTimeout(() => {
        setIsPickedUp(false);  // Power-up disappears after use
      }, 10000);  // Power-up lasts for 10 seconds
    }
  }, [isPickedUp]);

  const handlePickUp = () => {
    setIsPickedUp(true);
    onPickUp(type); // Notify the parent component about the power-up pick-up
  };

  return !isPickedUp ? (
    <div
      className={`power-up ${type}`}
      style={{ top: position.top, left: position.left }}
      onClick={handlePickUp}
    >
      {type === 'invincibility' ? '⚡' : '🐢'} {/* Example icons */}
    </div>
  ) : null;
}
