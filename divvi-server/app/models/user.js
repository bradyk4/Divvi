var bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    // Model attributes are defined here
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.DECIMAL(10, 2)
    },
    groupId: {
      type: Sequelize.INTEGER
    },
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      isInt: {
        msg: "Must be an integer between (1 & 1000)"
      }
    },
  },{
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
      },
    validPassword(password) {
        return bcrypt.compare(password, this.password);
      }
    }
    }
  );

  return User;
}