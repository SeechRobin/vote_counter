// Candidate.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  votes: Number,
});
mongoose.model('Candidate', UserSchema);
module.exports = mongoose.model('Candidate');