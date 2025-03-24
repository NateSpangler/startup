import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  // Submit the player's name locally (no backend call)
  const submitPlayerName = (e) => {
    e.preventDefault();

    // Ensure the player has entered a name
    if (playerName.trim()) {
      // Save the player name to sessionStorage or localStorage
      sessionStorage.setItem('playerName', playerName);

      // Navigate to the play page after "logging in"
      navigate("/play");
    } else {
      alert('Please enter a valid name.');
    }
  };

  return (
    <main>
      <br />
      <br />
      <br />
      <br />
      <br />
      <label htmlFor="name" className="entername">Enter your name: </label>
      <form onSubmit={submitPlayerName}>
        <input
          type="text"
          id="name"
          className="entername"
          name="name"
          placeholder="Your name"
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button className="shiny-cta">Let's do this</button>
      </form>
      <h6>Use the W, A, S, D keys to move the blue ball away from the white ball</h6>
      <br />
    </main>
  );
}
