// app.js
var express = require('express');

var app = express();
var db = require('./db');

//Users or Voters
var UserController = require('./user/UserController');
app.use('/users', UserController);


//Candidates
var CandidateController = require('./candidate/CandidateController');
app.use('/candidates', CandidateController);

//Poll
var PollController = require('./poll/PollController');
app.use('/poll', PollController);

module.exports = app;