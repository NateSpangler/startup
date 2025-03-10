import React, { useEffect, useState } from 'react';

export function Scores() {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    const savedHighscores = JSON.parse(localStorage.getItem('highscores')) || [];
    setHighscores(savedHighscores);
  }, []);

  return (
    <div>
      <h2>High Scores</h2>
      <ol>
        {highscores.map((entry, index) => (
          <li key={index}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ol>
    </div>
  );
}


export default Scores;