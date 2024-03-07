const Challenge = require("../models/challenge");
const editChallenge = async (req, res) => {
    const {
        challengeId,
        difficulty,
        description,
        challenge_name,
        boilerplate,
        solution,
        test_values,
    } = req.body;

    try {
        console.log(challengeId,"Challenge id");
        await Challenge.findByIdAndUpdate(
            challengeId,
            {
                difficulty,
                description,
                challenge_name,
                boilerplate,
                solution,
                test_values,
            },
            { new: true, useFindAndModify: false }
        );

        res.status(200).json({ message: "Challenge updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating challenge" });
    }
};

module.exports = { editChallenge };