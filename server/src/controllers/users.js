const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const registerNewUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({
        msg: "User already exists",
      });
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashPassword;
      await User.create(req.body);
      return res.json({
        msg: "registered successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  console.log(req);
  try {
    const userDetails = await User.findOne({ username: req.body.username });
    if (userDetails) {
      const matched = await bcrypt.compare(
        req.body.password,
        userDetails.password,
      );
      if (matched) {
        console.log(process?.env.SECRET_KEY);
        const token = jwt.sign(
          { username: userDetails.username },
          process?.env.SECRET_KEY,
        );
        console.log("Hello");
        return res
          .status(201)
          .json({ msg: "Login Successfully", token, userDetails });
      } else {
        return res.status(403).json({ msg: "Password didn't match" });
      }
    } else {
      return res.status(401).json({ msg: "Username not found" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Login failed" });
  }
};

module.exports = { registerNewUser, loginUser };
