const express = require("express");
const router = express.Router();

const { registerNewUser, loginUser } = require("../controllers/users");

const { executeJS } = require("../execute/executeJS");
const { saveCode } = require("../execute/saveCode");
const { getCodeByUserIdAndFileName } = require("../execute/getCode");
const { getFileNamesByUserId } = require("../execute/getFileNames");
const { rename } = require("../execute/rename");
const { removeFile } = require("../execute/removeFile");

const { saveChallenge } = require("../execute/saveChallenge");
const {
  fetchChallengeById,
  fetchChallengesInRange,
} = require("../execute/getChallenge");
// const {
//   removeChallengeById,
// } = require("../execute/removeChallenge");

router.post("/register", registerNewUser);
router.post("/login", loginUser);

router.post("/executeJS", executeJS);
router.post("/saveCode", saveCode);
router.get("/getCode/:user_id/:file_name", getCodeByUserIdAndFileName);
router.get("/getFileNames/:user_id", getFileNamesByUserId);
router.post("/rename", rename);
router.post("/removeFile", removeFile);

router.post("/saveChallenge", saveChallenge);
router.get("/fetchChallenge/:challenge_id", fetchChallengeById);
// router.post("/removeChallenge", removeChallengeById);
router.get(
  "/fetchChallengesInRange/:user_id/:lower/:upper",
  fetchChallengesInRange,
);

module.exports = router;
