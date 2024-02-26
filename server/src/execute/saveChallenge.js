const Challenge = require('../models/challenge');
const { checkChallengeNameExists } = require('./checkChallengeNameExists.js');

const saveChallenge = async (req, res) => {
    const { user_id, difficulty, description, challenge_name, boilerplate, solution, test_values } = req.body;
    console.log("Adding: ", user_id, difficulty, description, challenge_name, boilerplate, solution, test_values);
    try {
        const { exists } = await checkChallengeNameExists({ user_id, challenge_name });
        let existingChallenge;

        if (!exists) {
            existingChallenge = new Challenge({ user_id, description, challenge_name, boilerplate, solution, test_values, difficulty});
        } else {
            existingChallenge = await Challenge.findOne({ user_id, challenge_name });
            existingChallenge.difficulty = difficulty;
            existingChallenge.description = JSON.parse(description) + " ";
            existingChallenge.boilerplate = boilerplate;
            existingChallenge.solution = solution;
            existingChallenge.test_values = test_values;
            existingChallenge.challenge_name = challenge_name;
        }
        
        await existingChallenge.save();

        res.status(200).json({ message: 'Challenge saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error' });
    }
};

module.exports = { saveChallenge };
