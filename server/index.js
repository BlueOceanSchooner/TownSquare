const express = require('express');
const app = express();
const router = require('./routes/index.js');
const path = require('path');

app.use(express.json());
app.set('json spaces', 2);
app.use(express.static('client/dist'));

app.use('/api', router);

const file = path.join(__dirname, '../client/dist/index.html');
app.get('*', (req, res) => {
  res.sendFile(file);
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});