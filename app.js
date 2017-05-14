// app.js
var express = require('express');

var app = express();
var db = require('./db');

//Users or Voters
var UserController = require('./user/UserController');
app.use('/v1/users', UserController);


//Candidates
var CandidateController = require('./candidate/CandidateController');
app.use('/v1/candidates', CandidateController);

//Poll
var PollController = require('./poll/PollController');
app.use('/v1/poll', PollController);

module.exports = app;