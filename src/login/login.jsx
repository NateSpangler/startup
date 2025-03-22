import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  // Submit the player's name to the backend for user creation
  const submitplayerName = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // Navigate to the play page after successful login
      navigate("/play");
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error logging in. Please try again.');
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
      <form onSubmit={submitplayerName}>
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
