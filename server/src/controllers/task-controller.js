const TaskService = require("../services/task-service");

class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req, res) {
    try {
      const response = await this.taskService.createTask(req.body);
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
  }

  async getTasks(req, res) {
    try {
      const tasks = await this.taskService.getTasks(req.userId);
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
  }

  async updateTask(req, res) {
    try {
      const task = await this.taskService.updateTask(
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
  }

  async deleteTask(req, res) {
    try {
      await this.taskService.deleteTask(req.params.id, req.userId);
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete task", error });
    }
  }
}

module.exports = new TaskController();
