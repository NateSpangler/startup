import React, { useEffect, useState } from 'react';

export function Scores() {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    // Retrieve the scores from localStorage
    const loadedScores = JSON.parse(localStorage.getItem("highscores")) || [];
    setHighscores(loadedScores);
    console.log("High scores loaded:", loadedScores);
  }, []);

  return (
    <div>
      <br />
      <br />
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

export default Scores;
