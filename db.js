// db.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://bbc_test:1234@ds139761.mlab.com:39761/bbc_voting_counter');
// mongoose.connect('mongodb://bbc_test:1234@cluster0-shard-00-00-vcfsa.mongodb.net:27017,cluster0-shard-00-01-vcfsa.mongodb.net:27017,cluster0-shard-00-02-vcfsa.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');


