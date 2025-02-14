import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
        <br></br>
        <header>
            <button class="shiny-cta"> Pong Chaos</button>
            <nav>
                <menu>
                    <a href="index.html">Home</a>
                    <br></br>
                    <a href="scores.html">High Scores</a>
                </menu>
           </nav>
        </header>
        <main>
            <br></br>
            <br></br>
            <br></br>
            Here is where main will go
        </main>
        <footer>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Random Fact: </p>
            <br></br>
            <br></br>
            <span class="text-reset">Nate Spangler</span>
            <br></br>
            <a href="https://github.com/NateSpangler/startup">Github</a>
      </footer>
    </div>
  );
}