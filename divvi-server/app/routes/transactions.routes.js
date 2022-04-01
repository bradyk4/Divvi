module.exports = app => {
    const controller = require("../controllers/transactions.controller");
    const Router = require("express").Router();
  
    const router = Router;
  
    // Create a new transaction
    router.post("/post", controller.create);
  
    // Retrieve all transactions
    router.get("/", controller.findAll);
  
    // Retrieve a single transaction with id
<<<<<<< HEAD
    router.get("/:id", controller.findByPk);

    // Delete transaction with id
    router.delete("/:id", controller.delete);
=======
    router.get("/:transactionID", controller.findByPk);
>>>>>>> origin
  
    // Default route for transaction data
    app.use('/api/transactions', router);
  };