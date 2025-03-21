const Task = require("../models/task");

class TaskRepository {
  async createTask(data) {
    try {
      const task = await Task.create(data);
      return task;
    } catch (error) {
      console.log("Something went wrong in the repository layer.");
      throw error;
    }
  }

  async getTasks(userId) {
    try {
      const tasks = await Task.find({ userId });
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id, userId, data) {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: id, userId },
        { text: data.text, completed: data.completed },
        { new: true }
      );
      if (!task) throw new Error("Task not found or unauthorized");
      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id, userId) {
    try {
      const result = await Task.findOneAndDelete({ _id: id, userId });
      if (!result) throw new Error("Task not found or unauthorized");
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskRepository;
