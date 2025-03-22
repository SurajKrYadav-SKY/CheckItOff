const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  get,
  update,
} = require("../../controllers/user-controller");
const authenticate = require("../../middleware/auth");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../../controllers/task-controller");

// user
router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:id", authenticate, get);
router.post("/user/:id", authenticate, update);

// task
router.post("/task", authenticate, createTask);
router.get("/task", authenticate, getTasks);
router.put("/task/:id", authenticate, updateTask);
router.delete("/task/:id", authenticate, deleteTask);

module.exports = router;
