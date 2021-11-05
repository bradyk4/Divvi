const db = require("../models");
const Group = db.group;
const Op = require("sequelize");
// Create and Save a new group
exports.create = async(req, res) => {
  try{
    const group = await Group.create(req.body);
    return res.status(201).json({
      group,
    });
  }
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the group.",
    });
  }
};

// Retrieve all group from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Group.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groups.",
      });
    });
};

// Find a single group with an id
exports.findByPk = (req, res) => {
  const ID = req.params.id;

  Group.findByPk(ID)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({
          message: "Error retrieving group with id=" + ID,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving group with id=" + ID,
      });
    });
};

// Update a group by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Group.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "group was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update group with id=${id}. Maybe group was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating group with id=" + id,
      });
    });
};

// Delete a group with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Group.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Group was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Group with id=${id}. Maybe Group was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Group with id=" + id,
      });
    });
};

// Delete all group from the database.
exports.deleteAll = (req, res) => {
  Group.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} groups were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all groups.",
      });
    });
};