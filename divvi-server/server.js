const { ConnectionPool } = require('mssql');
const { Sequelize } = require('sequelize');
const config = require('./config/dbConfig');

var connection = new ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log(pool);
  })
  .catch(err => {
    console.log(err);
  })