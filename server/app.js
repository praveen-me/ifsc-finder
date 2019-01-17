const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('server is running');
})

app.listen(8001, () => {
  console.log(`server is running at 8001`);
})