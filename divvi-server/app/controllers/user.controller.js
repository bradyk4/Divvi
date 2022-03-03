const db = require("../models");
const User = db.user;
const Op = require("sequelize");
const { where } = require("sequelize");
const bcrypt = require("bcrypt");

// Create and Save a new user
exports.create = async(req, res) => {
  var name = req.body.name;
  var balance = req.body.balance;
  var groupId = req.body.groupId;
  var password = req.body.password;

  try{
    password = bcrypt.hashSync(req.body.password, 10);
    var body = {
      name,
      balance,
      groupId,
      password
    }

    const user = await User.create(body);
    
    return res.status(201).json({
      user,
    });
  }
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find first user with matching username & password
//  if none return error
exports.authUser = async(req, res) => {
  const Username = req.body.username;
  var Password = req.body.password;

  try{
    const user = await User.findOne({ where : {name : Username}});
    if(user){
        const password_valid = await bcrypt.compare(Password, user.password);
        if(password_valid){
          return res.status(200).json({
          user
          });
        } else {
          res.status(400).json({ error : "Password Incorrect" });
        }
      
    }else{
      res.status(404).json({ error : "User does not exist" });
    }
  }
  catch(err){
    console.log(err);
  }
}

// Find a single user with an id
exports.findByPk = (req, res) => {
  const ID = req.params.id;

  User.findByPk(ID)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({
          message: "Error retrieving user with id=" + ID,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + ID,
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all user from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};