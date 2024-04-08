const Challenge = require("../models/challenge");

const fetchChallengeById = async (req, res) => {
  const { challenge_id } = req.params;
  try {
    const challenge = await Challenge.findById(challenge_id);
    if (challenge) {
      res.status(200).json({ challenge });
    } else {
      res.status(404).json({ error: "Challenge not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
};

const fetchChallengesInRange = async (req, res) => {
  const { user_id, lower, upper } = req.params;
  // console.log(req.params);
  try {
    const challengesPerPage = upper - lower + 1;
    const pageNumber = Math.ceil(lower / challengesPerPage);

    const challenges = await Challenge.find({ user_id })
      .skip(pageNumber * challengesPerPage)
      .limit(challengesPerPage);

    // console.log(challenges);
    res.status(200).json({ challenges }); // Send the fetched challenges as a JSON response
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Error fetching challenges" }); // Send an error response in case of an error
  }
};

module.exports = { fetchChallengeById, fetchChallengesInRange };
