module.exports = app => {
  const controller = require("../controllers/group.controller");
  const Router = require("express").Router();

  const router = Router;

  // Create a new group
  router.post("/postGroup", controller.create);

  // Retrieve all groups
  router.get("/", controller.findAll);

  // Retrieve a single group with id
  router.get("/:id", controller.findByPk);

  // Retrieve users from group by id
  router.get("/users/:id", controller.findUsersByGroup);

  // Update a group with id
  router.put("/:id", controller.update);

  // Delete a group with id
  router.delete("/:id", controller.delete);

  // Delete all groups
  router.delete("/", controller.deleteAll);

  // Default route for group data
  app.use('/api/groups', router);
};