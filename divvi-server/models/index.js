const dbConfig = require('../divvi-server/config/dbConfig');

// initialize sequelize instance
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  driver: dbConfig.driver,
  dialectOptions: {
    encrypt: dbConfig.encrypt,
    database: dbConfig.database,
},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user')(sequelize, Sequelize);

module.exports = db;