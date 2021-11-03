const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    // Model attributes are defined here
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    GroupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return User;
}