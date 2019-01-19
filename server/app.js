const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const https = require('https');
const cors = require('cors');
const app = express();
const socket = require('socket.io');
const Bank = require('./models/Bank');


mongoose.connect(`mongodb://${process.env.NAME}:${process.env.PASSWORD}@ds161144.mlab.com:61144/ifsc`,  { useNewUrlParser: true })

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// Modules
const bankController = require('./controllers/bank.controller');


// mongoose.connect(`mongodb://localhost/IFSC`, { useNewUrlParser: true }, (err) => {
  
//   console.log('connected to mongodb');
// });


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
  let allBanks = []
  Bank.find({}, (err, banks) => {
    allBanks = banks;
  });
  
  socket.on('bankQuery', (bank) => {
    const query = new RegExp(bank, 'i');
    let filteredBanks;
    if(bank === '') {
     filteredBanks = []
    } else {
      filteredBanks = allBanks.filter(bank => query.test(bank.BANK))
    }
    socket.emit('queryResult', filteredBanks);
  })
})