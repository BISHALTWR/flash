const User = require("../models/user");
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const uploadDir = path.join(__dirname, '../../uploads');
const port = process.env.PORT;

if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir, { recursive: true });
}

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

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const changeUserInfo = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server error" , error: err});
  }
};

// multer setup for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({storage: storage});

const uploadAvatar = (req, res, next) => {
  upload.single('avatar')(req, res, async function(err) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file was uploaded." });
    }
    try {
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      // Delete old avatar file
      if (user.avatar) {
        const oldAvatarPath = path.join(uploadDir, path.basename(user.avatar));
        fs.unlink(oldAvatarPath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to delete old avatar." });
          }
        });
      }
      const avatarUrl = req.file.path.replace('/home/virus/My_files/flash/server', `http://localhost:${port}`);
      const result = await User.updateOne({ _id: req.body.userId }, { avatar: avatarUrl });
      if (result.nModified === 0) {
        return res.status(400).json({ error: "User avatar was not updated." });
      }
      res.status(200).json({
        message: "Avatar updated successfully!",
        avatar: avatarUrl
      });
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  });
};

const deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.avatar) {
      const filename = path.join(uploadDir, path.basename(user.avatar));
      fs.unlink(filename, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to delete file." });
        }
        user.avatar = "";
        await user.save();
        res.status(200).json({ message: "Avatar deleted successfully!" });
      });
    } else {
      res.status(400).json({ error: "No avatar to delete." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerNewUser, loginUser, getUserInfo, changeUserInfo, uploadAvatar, deleteAvatar };