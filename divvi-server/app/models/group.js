module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("Group", {
    // Model attributes are defined here
    name: {
      type: Sequelize.STRING
    },
    number: {
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
    }
  );

  return Group;
}