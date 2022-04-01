const dbConfig = require("../config/dbConfig");

// initialize sequelize instance
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  driver: dbConfig.driver,
  operatorsAliases: false,
  dialectOptions: {
    encrypt: dbConfig.encrypt,
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.group = require('./group')(sequelize, Sequelize);
db.transactions = require('./transactions')(sequelize, Sequelize);
db.groupsUsersRelation = require('./groupsUsersRelation')(sequelize, Sequelize);

db.group.belongsToMany(db.user, {
  through: "GroupsUsers",
  as: "users",
  foreignKey: "groupID",
});
db.user.belongsToMany(db.group, {
  through: "GroupsUsers",
  as: "groups",
  foreignKey: "userID",
});

module.exports = db;