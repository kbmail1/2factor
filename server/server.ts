
// 1 800 300 4296  ext. 5620 Yzonne Welsh

const users = require('./users')
import * as utils from './utils'
import * as jwt from 'jsonwebtoken'
import { JWT } from './config'
import * as db from './db'

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

app.post('/login', async (req, res) => {
  // console.log('login: req.body', req.body);
  const req_userId = req.body.userId.toLowerCase()
  const req_password = req.body.password.toLowerCase()

  if (db.getUser(req_userId) !== null) {
    // user found.
    const _user = db.getUser(req_userId)
    const db_userId = _user.userId
    const db_password = _user.password

    console.log(`login: validating password(${req_userId} ${req_password})`)
    let valid: boolean = await db.validatePassword(db_userId, req_password)
    if (!valid) {
      res.status(200).send({ error: 'auth failed' }).end()
      return
    }
    let token = null
    try {
      token = utils.generateAccessToken(db_userId)
    } catch (error) {
      res.status(401).send({ error: `${error} generateAccessToken(${db_userId} failed` }).end()
      return
    }
    res.status(200).send({
      token,
      message: 'Login Successful',
      db_userId,
      password: req_password,
      hash: db_password,
      error: null,
    })
    return
  }
  console.log('login failed')
  res.status(200).send({ error: 'userId/password not found' }).end()
  return
});

app.post('/register', async (req, res) => {
  console.log('register: req.body', req.body);
  const req_userId = req.body.userId.toLowerCase()
  const req_password = req.body.password.toLowerCase()

  let tmp_user = await db.getUser(req_userId)
  if (tmp_user !== null) {
    console.log('user ', req_userId, ' already exists')
    res.status(200).send({
      message: 'user already exists',
      userId: req_userId,
      error: 'user exists',
    }).end()
    return
  }

  console.log('user-id is unique... registering')
  await db.saveUser(req_userId, req_password)
  res.status(201).send(
    {
      message: `user ${req_userId} registered`,
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

