const express = require("express");
const router = express.Router();

const { registerNewUser, loginUser, getUserInfo, changeUserInfo, uploadAvatar, deleteAvatar} = require("../controllers/users");

const { executeJS } = require("../execute/executeJS");
const { saveCode } = require("../execute/saveCode");
const { getCodeByUserIdAndFileName } = require("../execute/getCode");
const { getFileNamesByUserId } = require("../execute/getFileNames");
const { rename } = require("../execute/rename");
const { removeFile } = require("../execute/removeFile");

const { saveChallenge } = require("../execute/saveChallenge");
const {editChallenge} = require("../execute/editChallenge");
const {removeChallengeByUserIdAndName} = require("../execute/removeChallenge");
const {
  fetchChallengeById,
  fetchChallengesInRange,
} = require("../execute/getChallenge");
// const {
//   removeChallengeById,
// } = require("../execute/removeChallenge");

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.post("/getUserInfo", getUserInfo);
router.post('/changeUserInfo', changeUserInfo);
router.post('/uploadAvatar', uploadAvatar);
router.delete('/deleteAvatar/:userId', deleteAvatar);

router.post("/executeJS", executeJS);
router.post("/saveCode", saveCode);
router.get("/getCode/:user_id/:file_name", getCodeByUserIdAndFileName);
router.get("/getFileNames/:user_id", getFileNamesByUserId);
router.post("/rename", rename);
router.post("/removeFile", removeFile);

router.post("/saveChallenge", saveChallenge);
router.put('/editChallenge/:id', editChallenge);
router.get("/fetchChallenge/:challenge_id", fetchChallengeById);
router.delete('/removeChallenge/:user_id/:challenge_name', removeChallengeByUserIdAndName);
// router.post("/removeChallenge", removeChallengeById);
router.get(
  "/fetchChallengesInRange/:user_id/:lower/:upper",
  fetchChallengesInRange,
);

module.exports = router;
