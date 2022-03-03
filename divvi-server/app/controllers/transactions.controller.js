const db = require("../models");
const Transaction = db.transactions;
const Op = require("sequelize");
const User = db.user;
// Create and Save a new transaction
exports.create = async(req, res) => {
  try{
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      transaction,
    });
  }
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the transaction.",
    });
  }
};

// Retrieve all transactions from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Transaction.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

// Find a single transaction by id
exports.findByPk = (req, res) => {
  const ID = req.params.id;

  Transaction.findByPk(ID)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({
          message: "Error retrieving transaction with id=" + ID,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving transaction with id=" + ID,
      });
    });
};