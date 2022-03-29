module.exports = app => {
  const controller = require("../controllers/groupsUsersRelation.controller");
  const Router = require("express").Router();

  const router = Router;

  // Create a new group/user relation
  router.post("/postRelation", controller.create);

  // Default route for relation data
  app.use('/api/groupsUsers', router);
}