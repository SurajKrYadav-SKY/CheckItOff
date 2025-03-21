const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

const User = mongoose.model("User", UserSchema);
