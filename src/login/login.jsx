import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const submitPlayerName = async (e) => {
    e.preventDefault();
    console.log("submitPlayerName triggered, playerName:", playerName);


    // Ensure the player has entered a name
    if (playerName.trim()) {
      try {
        const response = await fetch('/api/auth/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: playerName }),
        });
  
        // Log the response to the console
        const data = await response.json();
        console.log('Backend response:', data);
  
        if (response.ok) {
          console.log("About to store playerName in sessionStorage:", playerName);
          // Save the player name to sessionStorage (or localStorage) if needed
          sessionStorage.setItem('playerName', playerName);
          console.log("Stored playerName:", sessionStorage.getItem('playerName'));

          // Navigate to the play page after "logging in"
          navigate("/play");
        } else {
          throw new Error('Failed to create user');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Error logging in. Please try again.');
      }
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
        <button type="submit" className="shiny-cta">Let's do this</button>
      </form>
      <h6>Use the W, A, S, D keys to move the blue ball away from the white ball</h6>
      <br />
    </main>
  );
}
