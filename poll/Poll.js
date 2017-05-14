// Poll.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  user: String,
  candidate: String,
  votes: Number
});
mongoose.model('Poll', UserSchema);
module.exports = mongoose.model('Poll');