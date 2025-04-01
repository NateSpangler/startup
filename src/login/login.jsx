// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export function Login() {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const submitPlayerName = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/login", { name: playerName });
      navigate("/play");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main>
      <label htmlFor="name" className="entername">Enter your name: </label>
      <form onSubmit={submitPlayerName}>
        <input type="text" id="name" className="entername" name="name" placeholder="Your name" onChange={(e) => setPlayerName(e.target.value)} />
        <button type="submit" className="shiny-cta">Let's do this</button>
      </form>
      <h6>Use W, A, S, D keys to move</h6>
    </main>
  );
}