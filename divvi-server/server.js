const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8090"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

  // call sync method to sync with database
  const db = require("./models");
  try{
    db.sequelize.sync();
  }
  catch(err){
    console.log(err || 'unknown error occured when attempting to sync with the database')
    // in case we need to drop existing tables and re-sync database
    db.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync db.");
    });
  }

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Divvi application." });
});

// include routes
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});