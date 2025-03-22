const cookieParser = require('cookie-parser');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';


// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(express.static('public'));

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    
      const user = await createUser(req.body.name);
  
      setAuthCookie(res, user.token);
      res.send({ name: user.name });
    }
  );
  
  
  // DeleteAuth logout a user
  apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
  // Middleware to verify that the user is authorized to call an endpoint
  const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  };
  
  // GetScores
  apiRouter.get('/scores', verifyAuth, (_req, res) => {
    res.send(scores);
  });
  
  // SubmitScore
  apiRouter.post('/score', verifyAuth, (req, res) => {
    scores = updateScores(req.body);
    res.send(scores);
  });
  
  // Default error handler
  app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
  // Return the application's default page if the path is unknown
  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  // updateScores considers a new score for inclusion in the high scores.
  function updateScores(newScore) {
    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore.score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }
  
    if (!found) {
      scores.push(newScore);
    }
  
    if (scores.length > 10) {
      scores.length = 10;
    }
  
    return scores;
  }
  
  async function createUser(name) {
  
    const user = {
      name: name,
      token: uuid.v4(),
    };
    users.push(user);
  
    return user;
  }
  
  
  // setAuthCookie in the HTTP response
  function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });