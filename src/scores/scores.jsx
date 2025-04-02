import React, { useEffect, useState } from 'react';

export function Scores() {
  const [highscores, setHighscores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/scores', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setHighscores(data);
      } catch (err) {
        setError('Failed to load scores.');
        console.error('Error fetching scores:', err);
      }
    };

    fetchScores();
  }, []);

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
                <td style={{ border: '1px solid blue', padding: '8px' }}>{scoreEntry.name}</td>
                <td style={{ border: '1px solid blue', padding: '8px' }}>{scoreEntry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center' }}>No scores available.</p>
      )}
    </div>
  );
}

export default Scores;

