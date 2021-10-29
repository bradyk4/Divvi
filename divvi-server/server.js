const dbOperations = require('./config/dbOperations');
var DB = require('./config/dbOperations');
var User = require('./models/user')

dbOperations.getUsers().then(result => {
  console.log(result);
})