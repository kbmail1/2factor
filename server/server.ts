
// 1 800 300 4296  ext. 5620 Yzonne Welsh

import * as users from './users';
import * as user_list from './users'
import * as utils from './utils'
import * as jwt from 'jsonwebtoken'
import { JWT }  from './config'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 4201

app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, JWT.TOKEN_SECRET, (err: any, user: any) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

app.get('/hello', (req, res) => {
  res.status(200).send({ express: 'Hello From Express' })
});

app.post('/login', (req, res) => {
  // console.log('login: req.body', req.body);
  const req_userId = req.body.userId.toLowerCase()
  const req_password = req.body.password.toLowerCase()

  if (utils.doesUserExist(req_userId)) {
    const _user = utils.getUser(req_userId)
    const userId = _user.userId
    const password = _user.password

    const token = utils.generateAccessToken(userId)
    res.cookie("jwt-token", token, { maxAge: utils.jwtExpirySeconds * 1000 })
    res.status(200).send({
      token,
      message: 'Lo`gin Successful',
      userId,
      password,
      error: null,
    })
    return true
  }
  console.log('login failed')
  res.status(200).send({ error: 'userId/password not found' }).end()
});

app.post('/register', (req, res) => {
  console.log('login: req.body', req.body);
  const req_userId = req.body.userId.toLowerCase()
  const req_password = req.body.password.toLowerCase()

  if (utils.doesUserExist(req_userId)) {
    console.log('user ', req_userId, ' already exists')
    res.status(200).send({
      message: 'user already exists',
      userId: req_userId,
      error: 'user exists',
    })
  }

  console.log('user-id is unique... registering')
  // TODO save newly registered user.
  res.status(201).send(
    {
      message: 'new user registered',
      userId: req_userId,
      error: null
    })
});

app.get('/secure-hello', authenticateJWT, (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({
      error: 'expected Auth in request',
    }).end()
  }

  const token = authHeader.split(' ')[1]
  try {
    jwt.verify(token, JWT.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send(
          {
            message: 'Token validation failed',
            error: 'Token validation failed',
          }).end()
      }
    })

  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).send({
        message: 'Token validation failed',
        error: 'Token validation failed',
      }).end()
    }
    return res.status(400).send({
      message: 'bad request',
      error: 'bad request',
    })
  }
  // otherwise, return a bad request error
  return res.status(200).send({
    secureHello: 'success'
  }).end()
});


app.get('/', (req, res) => {
  res.status(200).send('node-express App Works!')
});

app.listen(port, () => {
  console.log(`:Node-Express Server listening on the port::${port}`);
});

