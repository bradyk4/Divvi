const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new user
  exports.create = async(req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });

      User.create(User)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user.",
          })
        });
    };
  }

// Retrieve all users from the database.
  exports.findAll = async(req, res) => {
    await User.findAll()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users.",
        });
      });
  };

// Find a single user with an id
  exports.findOne = async(req, res) => {
    const id = req.params.ID;

    User.findByPk(id)
      .then(data => {
        if (data){
          res.send(data);
        }
        else{
          res.status(404).send({
            message: "Error retrieving user with id=" + id,
          });
        }
      });
    
  };

// Update a user by the id in the request
  exports.update = async(req, res) => {
    const id = req.params.ID;

    User.update(req.body, {
      where: { id: id }
    })
    .then(num => {
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
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
  };

  // Delete a user with the specified id in the request
  exports.delete = async(req, res) => {
    const id = req.params.ID;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
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
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id,
        });
      });
  };

// Delete all user from the database.
  exports.deleteAll = async(req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users.",
        });
      });
  }