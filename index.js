require('dotenv').config();
const config = require('./src/config/components/common');
const { db } = require('./src/models')
const express = require('express');
const cors = require('cors')
var cookieParser = require('cookie-parser')
const writelog = require('./src/helpers/writelog');

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./src/routes');
app.use('/api', cors(), routes);



app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.status === 404) {
    res.status(404).json({ error: 'Not found' });
  } else {
    console.log(err);
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.listen(config.api_port, () => writelog(`Server is running on port ${config.api_port}`));