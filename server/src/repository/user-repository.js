const User = require("../models/user");

class UserRepository {
  constructor() {}

  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the controller");
      throw error;
    }
  }

  async get(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log("Something went wrong in the controller");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const { name } = data;
      const user = await User.findByIdAndUpdate(
        id,
        { name },
        {
          new: true,
          runValidators: true,
        }
      );
      return user;
    } catch (error) {
      console.log("Something went wrong in the controller");
      throw error;
    }
  }
}

module.exports = UserRepository;
