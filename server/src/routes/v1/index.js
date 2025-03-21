const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/task-controller");
const {
  signup,
  login,
  get,
  update,
} = require("../../controllers/user-controller");

// user
router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:id", get);
router.post("/user/:id", update);

// task
router.post("/task", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
