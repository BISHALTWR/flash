const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: String,
  firstname: String,
  lastname: String,
  phoneNumber: Number,
  password: String,
  avatar: String,
  profession: String,
  bio: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
