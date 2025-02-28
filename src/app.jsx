import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';

export default function App() {
  return (
    <BrowserRouter>
    <div className="body bg-dark text-light">
        <header>
          <br></br>
            <button className="shiny-cta"> Pong Chaos</button>
            <nav>
                <menu>
                    <li>
                      <NavLink className="nav-link" to="">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to='scores'>
                        High Scores
                      </NavLink>
                    </li>
                </menu>
           </nav>
        </header>

        <main>
            <Routes>
              <Route path='/' element={<Login />} exact />
              <Route path='/play' element={<Play />} />
              <Route path='/scores' element={<Scores />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
        </main>

        <footer>
            <br></br>
            <p>Random Fact: </p>
            <br></br>
            <br></br>
            <span className="text-reset">Nate Spangler</span>
            <br></br>
            <a href="https://github.com/NateSpangler/startup">Github</a>
      </footer>
    </div>
    </BrowserRouter>
  );
}


function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}