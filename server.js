// server.js
var app = require('./app');


var port = process.env.PORT || 8082;


var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});