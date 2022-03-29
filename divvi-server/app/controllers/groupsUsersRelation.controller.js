const db = require("../models");
const GroupsUsers = db.groupsUsersRelation;
const Op = require("sequelize");

// Create and Save a new relationship between a group and a user
exports.create = async(req, res) => {
  try{
    const groupsUsers = await GroupsUsers.create(req.body);
    return res.status(201).json({
      groupsUsers,
    });
  }
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the group/user relationship.",
    });
  }
};