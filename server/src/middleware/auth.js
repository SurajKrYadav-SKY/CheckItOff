const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/serverConfig");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ success: false, message: "Invalid token" });
    req.userId = decoded.id; // Attach user ID to request
    next();
  });
};

module.exports = authenticate;
