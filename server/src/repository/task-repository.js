const Task = require("../models/task");

class TaskRepository {
  async createTask(data) {
    try {
      const task = await Task.create(data);
      const populatedTask = await Task.findById(task._id).populate(
        "userId",
        "name"
      );
      return {
        id: populatedTask._id,
        text: populatedTask.text,
        completed: populatedTask.completed,
        name: populatedTask.userId.name,
        createdAt: populatedTask.createdAt,
      };
    } catch (error) {
      console.log(
        "Something went wrong in the repository layer." || error.message
      );
      throw error;
    }
  }

  async getTasks(userId) {
    try {
      const tasks = await Task.find({ userId }).populate("userId", "name");
      return tasks.map((task) => ({
        id: task._id,
        text: task.text,
        completed: task.completed,
        name: task.userId.name,
        createdAt: task.createdAt,
      }));
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
      ).populate("userId", "name");
      if (!task) throw new Error("Task not found or unauthorized");
      return {
        id: task._id,
        text: task.text,
        completed: task.completed,
        name: task.userId.name,
        createdAt: task.createdAt,
      };
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
