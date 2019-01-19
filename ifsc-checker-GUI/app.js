const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const socket = require('socket.io');
const Bank = require('./server/models/Bank');
const bankController = require('./server/controllers/bank.controller');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

mongoose.connect(`mongodb://${process.env.NAME}:${process.env.PASSWORD}@ds161144.mlab.com:61144/ifsc`,  { useNewUrlParser: true })

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// Setting view for apps
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './server/views'));

// Set image path
app.use('/images',express.static(path.join(__dirname, './client/src/images')))


// Essential middleware
app.use(bodyParser.json());
app.use(cors());

// Webpack config
if (process.env.NODE_ENV === 'development') {
  console.log('in webpack hot middleware');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
}

app.get('/', (req, res) => {
  res.render('index');
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