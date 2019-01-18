const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const socket = require('socket.io');

// Modules
const Bank = require('./models/Bank');

mongoose.connect('mongodb://localhost/IFSC', (err) => {
  console.log('connected to mongodb');
});

// Essential middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('server is running');
});

app.post('/banks', bankController.setBank);

const server = app.listen(8001, () => {
  console.log(`server is running at 8001`);
})

const io = socket(server);

io.on('connection', (socket) => {
  console.log('socket is connected');
  let allBanks = []
  Bank.find({}, (err, banks) => {
    allBanks = banks;
  });
  
  socket.on('bankQuery', (bank) => {
    const query = new RegExp(bank, 'i');
    const filteredBanks = allBanks.filter(bank => query.test(bank.BANK))
    console.log(filteredBanks);
  })
})