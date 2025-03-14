import React, { useEffect, useState } from 'react';

export function Scores() {
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  return (
    <div>
      <br></br>
      <br></br>
      
      <h1 style={{ textAlign: "center" }}>High Scores</h1>
      
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
    </div>
  );
};


export default Scores;