import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
        <header>
                <br> </br>
                <button className="shiny-cta"> Pong Chaos</button>
            <nav>
                    <menu>
                        <a style="color:white" href="index.html">Home</a>
                        <br></br>
                        <a style="color:white" href="scores.html">Top Scores</a>
                    </menu>
            </nav>
            <link rel="stylesheet" href="style.css"/>
        </header>
        <main>App components go here</main>
        <footer>
            <br> </br>
            <br> </br>
            <br> </br>
            <br> </br>
            <br> </br>
            <br> </br>
            <br> </br>
            <br> </br>
            <p>Random Fact: </p>
            <br> </br>
            <br> </br>
            <span className="text-reset">Nate Spangler</span>
            <br />
            <a style="color:white"  href="https://github.com/NateSpangler/startup">GitHub</a>
        </footer>
    </div>
  );
}