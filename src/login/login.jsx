import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

// export function Login() {
//   const [username, setusername] = useState("");  // Declare state for username
//   const navigate = useNavigate();
  
//   const submitusername = async (e) => {
//     e.preventDefault();

//     // Check if the username is valid
//     if (!username.trim()) {  // Check if username is empty or just spaces
//       alert("Please enter a valid username.");
//       return;
//     }

//     // Store the username in sessionStorage
//     sessionStorage.setItem("username", username);

//     // After login, navigate to the play page
//     navigate("/play");
//   };

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
          onChange={(e) => setUsername(e.target.value)}  // Correct the onChange function
          value={username}  // Use username here
        />
        <button type="submit" className="shiny-cta">Let's do this</button>
      </form>
      <h6>Use the W, A, S, D keys to move the blue ball away from the white ball</h6>
    </main>
  );
}

export default Login;
