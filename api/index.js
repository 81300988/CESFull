'use strict';

// include dependencies
const app = require('./app');
const {
  HTTP_PORT = 4000,
} = process.env;

app.listen(HTTP_PORT);