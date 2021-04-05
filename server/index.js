const express = require('express');
const app = express();
const router = require('./routes/index.js');

app.use(express.json());

app.use(express.static('client/dist'));

app.use('/api', router);

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});