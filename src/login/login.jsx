import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export function Login() {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const submitPlayerName = async (e) => {
    e.preventDefault();

    if (!playerName.trim()) {
      alert("Please enter a valid username.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/login", { name: playerName });
      if (response.status === 200) {
        sessionStorage.setItem("playerName", playerName);
        navigate("/play");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <main>
      <label htmlFor="name" className="entername">Enter your name:</label>
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
    </main>
  );
}

export function Scores() {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/scores");
        setHighscores(response.data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };
    fetchScores();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>High Scores</h1>
      {highscores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th style={{ border: "1px solid white", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid white", padding: "8px" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {highscores.map((scoreEntry, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid blue", padding: "8px" }}>{scoreEntry.name}</td>
                <td style={{ border: "1px solid blue", padding: "8px" }}>{scoreEntry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No scores available.</p>
      )}
    </div>
  );
}

export default { Login, Scores };
