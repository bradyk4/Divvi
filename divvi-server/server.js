const dbOperations = require('./config/dbOperations');
var DB = require('./config/dbOperations');
var User = require('./models/user')

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
  console.log('middleware');
  next();
});

router.route('/users').get((request, response)=>{

  DB.getUsers().then(result => {
    response.json(result);
  });

});

router.route('/users').post((request, response)=>{

  let user = {...request.body}

  DB.addUser(user).then(result => {
    response.status(201).json(result);
  });

});

var port = process.env.PORT || 8090;
app.listen(port);
console.log('API is runnning at ' + port);