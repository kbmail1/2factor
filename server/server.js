const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 4201

const users = [];

app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.status(200).send({ express: 'Hello From Express' })
});

app.get('/login', (req, res) => {
  res.status(200).send({'express': { login: 'success'}})
});



app.get('/', (req, res) => {
  res.status(200).send('node-express App Works!')
});

app.listen(port, () => {
  console.log(`:Node-Express Server listening on the port::${port}`);
});