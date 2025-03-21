const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controller");

router.post("/user", UserController.create);
router.get("/user/:id", UserController.get);
router.post("/user/:id", UserController.update);

module.exports = router;
