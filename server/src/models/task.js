const mongoose = require("mongoose");
const User = require("./user");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", TaskSchema);
