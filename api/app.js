'use strict';

// include dependencies
const express = require('express');
const bodyParser = require('body-parser');
const acceptable = require('@scuba-squad/acceptable');
const virtual = require('@scuba-squad/virtual-ext');
const {
  Authentication,
  Location,
  Route,
  Search,
} = require('./controller');
const {
  error,
  sanitize,
} = require('./middleware');

// init app
const app = express();

// attach express middleware
app.use(virtual);
app.use(acceptable('json'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(sanitize);

// define routes
app.post('/v1/login', Authentication.login);
app.post('/v1/logout', Authentication.logout);
app.get('/v1/locations', Location.retrieve);
app.put('/v1/locations', Location.upsert);
app.delete('/v1/locations', Location.delete);
app.get('/v1/search', Search.retrieve);
app.get('/v1/routes', Route.retrieve);

// attach express error handler
app.use(error);

// export as commonjs module
module.exports = app;