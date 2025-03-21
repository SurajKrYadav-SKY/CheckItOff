const UserRepository = require("../repository/user-repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer.");
      throw error;
    }
  }

  async get(id) {
    try {
      const user = await this.userRepository.get(id);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer.");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const user = await this.userRepository.update(id, data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer.");
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.userRepository.getByEmail(email);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer.");
      throw error;
    }
  }
}

module.exports = UserService;
