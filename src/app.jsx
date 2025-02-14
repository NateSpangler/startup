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
                        <a href="index.html">Home</a>
                        <br></br>
                        <a href="scores.html">Top Scores</a>
                    </menu>
            </nav>
        </header>

        <main className="body">App components go here</main>

        <footer>\
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
            <span>Nate Spangler</span>
            <br />
            <a  href="https://github.com/NateSpangler/startup">GitHub</a>
        </footer>
    </div>
  );
}