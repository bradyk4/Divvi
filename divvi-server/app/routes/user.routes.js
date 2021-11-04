module.exports = app => {
  const controller = require("../controllers/user.controller");
  const Router = require("express").Router();

  const router = Router;

  // Create a new user
  router.post("/postUser", controller.create);

  // Retrieve all users
  router.get("/", controller.findAll);

  // Retrieve a single user with id
  router.get("/:id", controller.findOne);

  // Update a user with id
  router.put("/:id", controller.update);

  // Delete a user with id
  router.delete("/:id", controller.delete);

  // Delete all users
  router.delete("/", controller.deleteAll);

  // Default route for user data
  app.use('/api/users', router);
};