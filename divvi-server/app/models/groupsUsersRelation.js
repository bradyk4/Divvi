module.exports = (sequelize, Sequelize) => {
  const GroupsUsers = sequelize.define("GroupsUsers", {
    // Model attributes are defined here
    userID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    groupID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  },{
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    }
  );

  return GroupsUsers;
}