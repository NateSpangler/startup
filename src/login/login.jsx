import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

// login user
export function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    // Save to session storage so the game can access the name
    sessionStorage.setItem('username', username);

    try {
      // Register user in MongoDB
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      // 🔌 Establish WebSocket connection after successful login
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      const socket = new WebSocket(`${protocol}://${window.location.host}`);

      socket.onopen = () => {
        console.log('WebSocket connected');
        socket.send(`User ${username} has logged in`);
      };

      socket.onmessage = (event) => {
        console.log('Message from server:', event.data);
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      navigate('/play'); // Redirect to game
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Could not register user');
    }
  };

  return (
    <main>
      <label htmlFor="name" className="entername">Enter your name:</label>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="name"
          className="entername"
          name="name"
          placeholder="Your name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button type="submit" className="shiny-cta">Let's do this</button>
      </form>
      <h6>Use the W, A, S, D keys to move the blue ball away from the white ball</h6>
    </main>
  );
}

export default Login;
