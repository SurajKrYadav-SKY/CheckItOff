const mongoose = require("mongoose");
const { SECRET_KEY, SALT } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      unique: true,
    },
    name: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  // this is the logic to hash the password only when the password is updated or during signup.
  if (!user.isModified("password")) {
    return next();
  }

  const saltRounds = Number(SALT);
  const salt = bcrypt.genSaltSync(saltRounds);
  const encryptedPassword = bcrypt.hashSync(user.password, salt);
  user.password = encryptedPassword;
  next();
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, email: this.email }, SECRET_KEY, {
    expiresIn: "2h",
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
