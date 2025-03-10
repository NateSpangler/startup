import React from 'react';

import {NavLink} from 'react-router-dom';



export function Login() {
  return (
    <main>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <label for="Enter your name:" className="entername">Enter your name: </label>
      <input type="text" id="name" className="entername" name="name" placeholder="Your name" required pattern="[Aa].*" onChange={(e) => setPlayerName(e.target.value)}/>
      <button className="shiny-cta"><NavLink to="/play">Let's do this</NavLink>
      </button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </main>
  
  );
}