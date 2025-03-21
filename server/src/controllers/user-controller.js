const UserService = require("../services/user-service");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async create(req, res) {
    try {
      const response = await this.userService.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      });
      return res.status(201).json({
        data: response,
        success: true,
        message: "Successfully created the user",
      });
    } catch (error) {
      console.log("Something went wrong in the controller layer");
      return res.status(500).json({
        success: true,
        message: "Failed to created the user",
        error: error,
      });
    }
  }

  async get(req, res) {
    try {
      const response = await this.userService.get(req.params.id);
      return res.status(200).json({
        data: response,
        success: true,
        message: "Successfully fetched the user",
      });
    } catch (error) {
      console.log("Something went wrong in the controller layer");
      return res.status(500).json({
        success: true,
        message: "Failed to get the user",
        error: error,
      });
    }
  }

  async update(req, res) {
    try {
      const response = await this.userService.update(req.params.id, req.body);
      return res.status(200).json({
        data: response,
        success: true,
        message: "Successfully updated the user",
      });
    } catch (error) {
      console.log("Something went wrong in the controller layer");
      return res.status(500).json({
        success: true,
        message: "Failed to update the user",
        error: error,
      });
    }
  }
}

module.exports = new UserController();
