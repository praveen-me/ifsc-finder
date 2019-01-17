const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// const http = require('http').Server(app)
const socket = require('socket.io')

mongoose.connect('mongodb://localhost/IFSC', (err) => {
  console.log('connected to mongodb');
})


// Essential middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('server is running');
})


const server = app.listen(8001, () => {
  console.log(`server is running at 8001`);
})

const io = socket(server);

io.on('connection', (socket) => {
  console.log('socket is connected');
})