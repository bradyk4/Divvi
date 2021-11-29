const express = require("express");
const cors = require("cors");
const db = require('./app/models');
const dbConfig = require("./app/config/dbConfig");

const app = express();
var allowlist = ['http://localhost:8090', 'http://localhost:4200']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// parse json content
app.use(express.json());
//app.use(bodyParser.json);
// parse requests of content-type
app.use(express.urlencoded({ extended: true }));

// sync models with database
db.sequelize.sync();

// Add Access Control Allow Origin headers
app.use(cors(corsOptionsDelegate), function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// simple route
app.get("/", cors(corsOptionsDelegate), function (req, res, next) {
  res.json({ message: "Welcome to the Divvi application." });
});

// include routes
require("./app/routes/user.routes")(app);
require("./app/routes/group.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}.`);
});