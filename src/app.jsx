import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';

export default function App() {
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        // Call the third party fun fact API
        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        setFunFact(response.data.text);
      } catch (error) {
        console.error('Error fetching fun fact:', error);
        setFunFact('Fun fact could not be loaded at this time.');
      }
    };

    fetchFunFact();
  }, []);
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
          <p style={{ textAlign: "center" }}>
            {funFact ? `Did you know? ${funFact}` : 'Loading fun fact...'}
          </p>
          <br />
          <span style={{ textAlign: "center" }}>Nate Spangler</span>
          <a style={{ textAlign: "center" }} href="https://github.com/NateSpangler/startup">
            Github
          </a>
        </footer>
    </div>
    </BrowserRouter>
  );
}


function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown. Router problemsss</main>;
}