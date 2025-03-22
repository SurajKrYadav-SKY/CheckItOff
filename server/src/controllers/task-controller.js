const TaskService = require("../services/task-service");

const taskService = new TaskService();

const createTask = async (req, res) => {
  try {
    const response = await taskService.createTask({ text: req.body.text });
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully created the task",
    });
  } catch (error) {
    console.log("Something went wrong in the controller layer");
    return res.status(500).json({
      success: false,
      message: "Failed to create the task",
      error: error,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.userId);
    return res.status(200).json({
      data: tasks,
      success: true,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch tasks", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.userId,
      req.body
    );
    return res.status(200).json({
      data: task,
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update task", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.userId);
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete task", error });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
