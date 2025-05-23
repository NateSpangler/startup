import React, { useEffect, useState } from 'react';


export function Scores() {
  const [highscores, setHighscores] = useState([]);
  const [error, setError] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  
  // Fetch scores from the server
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('/api/scores', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await response.json();
        setHighscores(data);
      } catch (err) {
        setError('Failed to load scores.');
        console.error('Error fetching scores:', err);
      }
    };

    fetchScores();

  // Set up WebSocket connection
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onmessage = (event) => {
    console.log('WebSocket message from server:', event.data);
    setServerMessage(event.data);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return () => {
    socket.close();
  };


  }, []);
  // Display the scores
  return (
    <div>
      <br />
      <h1 style={{ textAlign: 'center' }}>High Scores</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {highscores.length > 0 ? (
        <table style={{ width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid white', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {highscores.map((scoreEntry, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid blue', padding: '8px' }}>{scoreEntry.username}</td>
                <td style={{ border: '1px solid blue', padding: '8px' }}>{scoreEntry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center' }}>No scores available.</p>
      )}
      {/* Display live message from server */}
      {serverMessage && (
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          <em>Live update: {serverMessage}</em>
        </p>
      )}
    </div>
  );
}

export default Scores;
