const express = require("express");
const cors = require("cors");
const db = require('./app/models')

const app = express();

var corsOptions = {
  origin: "http://localhost:8090"
};

app.use(cors(corsOptions));
// parse json content
app.use(express.json());
//app.use(bodyParser.json);
// parse requests of content-type
app.use(express.urlencoded({ extended: true }));

// sync models with database
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Divvi application." });
});

// include routes
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});