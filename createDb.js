var mongoose = require('./libs/mongoose');
var async = require('async');
var User = require('./models/user').User;

//1. drop database
//2. create & save 3 users
//3. close connection

async.series([
  open,
  dropDatabase,
  close
], function(err, results) {
  console.log(arguments);
});

function open(callback) {
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}