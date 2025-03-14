import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';


export function Login() {
  const[playerName, setPlayerName] = useState("");
  const navigate = useNavigate();
  const submitplayerName = (e) => {
    e.preventDefault();
    localStorage.setItem("playerName", playerName);
    navigate("/play");
  }
  return (
    <main>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <label htmlFor="name" className="entername">Enter your name: </label>
      <form onSubmit={submitplayerName}>
      <input type="text" id="name" className="entername" name="name" placeholder="Your name" onChange={(e) => setPlayerName(e.target.value)}/>
      <button className="shiny-cta">Let's do this</button>
      </form>
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