const TaskRepository = require("../repository/task-repository");

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(data) {
    try {
      const task = await this.taskRepository.createTask(data);
      return task;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async getTasks(userId) {
    try {
      const task = await this.taskRepository.getTasks(userId);
      return task;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async updateTask(id, userId, data) {
    try {
      const task = await this.taskRepository.updateTask(id, userId, data);
      return task;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async deleteTask(id, userId) {
    try {
      await this.taskRepository.deleteTask(id, userId);
      return true;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
}

module.exports = TaskService;
