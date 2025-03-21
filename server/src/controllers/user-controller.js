const UserService = require("../services/user-service");
const userService = new UserService();

// class UserController {
//   constructor() {
//     this.userService = new UserService();
//   }

//   async signup(req, res) {
//     try {
//       console.log("inside controller");
//       const response = await this.userService.create({
//         email: req.body.email,
//         password: req.body.password,
//         name: req.body.name,
//       });

//       const jwt = response.generateJWT();
//       return res.status(201).json({
//         data: {
//           id: response._id,
//           email: response.email,
//           name: response.name,
//           token: jwt,
//         },
//         success: true,
//         message: "Successfully created the user",
//       });
//     } catch (error) {
//       console.log("Something went wrong in the controller layer");
//       return res.status(500).json({
//         success: false, // Fixed: should be false on error
//         message: error.message || "Failed to create the user",
//         error: error,
//       });
//     }
//   }

//   async login(req, res) {
//     try {
//       const { email, password } = req.body;
//       const user = await this.userService.getByEmail(email);
//       if (!user || !user.comparePassword(password)) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Invalid credentials" });
//       }
//       const jwt = user.generateJWT();
//       return res.status(200).json({
//         success: true,
//         data: { id: user._id, email: user.email, name: user.name, token: jwt },
//         message: "Successfully logged in",
//       });
//     } catch (error) {
//       console.log("Error in login controller", error);
//       return res
//         .status(500)
//         .json({ success: false, message: "Login failed", error });
//     }
//   }

//   async get(req, res) {
//     try {
//       const response = await this.userService.get(req.params.id);
//       return res.status(200).json({
//         data: response,
//         success: true,
//         message: "Successfully fetched the user",
//       });
//     } catch (error) {
//       console.log("Something went wrong in the controller layer");
//       return res.status(500).json({
//         success: true,
//         message: "Failed to get the user",
//         error: error,
//       });
//     }
//   }

//   async update(req, res) {
//     try {
//       const response = await this.userService.update(req.params.id, req.body);
//       return res.status(200).json({
//         data: response,
//         success: true,
//         message: "Successfully updated the user",
//       });
//     } catch (error) {
//       console.log("Something went wrong in the controller layer");
//       return res.status(500).json({
//         success: false,
//         message: "Failed to update the user",
//         error: error,
//       });
//     }
//   }
// }

// module.exports = UserController;

const signup = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });

    const jwt = response.generateJWT();
    return res.status(201).json({
      data: {
        id: response._id,
        email: response.email,
        name: response.name,
        token: jwt,
      },
      success: true,
      message: "Successfully created the user",
    });
  } catch (error) {
    console.log("Something went wrong in the controller layer");
    return res.status(500).json({
      success: false, // Fixed: should be false on error
      message: error.message || "Failed to create the user",
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getByEmail(email);
    if (!user || !user.comparePassword(password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const jwt = user.generateJWT();
    return res.status(200).json({
      success: true,
      data: { id: user._id, email: user.email, name: user.name, token: jwt },
      message: "Successfully logged in",
    });
  } catch (error) {
    console.log("Error in login controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Login failed", error });
  }
};

const get = async (req, res) => {
  try {
    const response = await userService.get(req.params.id);
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
};

const update = async (req, res) => {
  try {
    const response = await userService.update(req.params.id, req.body);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully updated the user",
    });
  } catch (error) {
    console.log("Something went wrong in the controller layer");
    return res.status(500).json({
      success: false,
      message: "Failed to update the user",
      error: error,
    });
  }
};

module.exports = {
  signup,
  login,
  get,
  update,
};
