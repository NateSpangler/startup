import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make API requests
import './login.css';

export function Login() {
  console.log("Login component rendered");
  if (typeof window !== 'undefined') {
    console.log("Running in the browser");
  } else {
    console.log("Running on the server");
  }

  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  // Submit player name and initiate game
  const submitPlayerName = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    console.log("submitPlayerName triggered, playerName:", playerName);

    // Save the player name to sessionStorage (or localStorage) if needed
    sessionStorage.setItem('playerName', playerName);
    console.log("Stored playerName:", sessionStorage.getItem('playerName'));

    // Navigate to the play page after "logging in"
    navigate("/play");

    // Now, you can submit the player name and score to the backend when the game is over
    // This would happen after the game finishes and the score is known
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
        <button type="submit" className="shiny-cta">Let's do this</button>
      </form>
      <h6>Use the W, A, S, D keys to move the blue ball away from the white ball</h6>
      <br />
    </main>
  );
}
