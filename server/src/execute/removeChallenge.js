const Challenge = require('../models/challenge');

const removeChallengeByUserIdAndName = async (req, res) => {
    const { user_id, challenge_name } = req.body;
    try {
        // Find the challenge
        const existingChallenge = await Challenge.findOne({ user_id, challenge_name });

        // If challenge doesn't exist, return an error
        if (!existingChallenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        // Delete the challenge
        await Challenge.deleteOne({ user_id, challenge_name });

        res.status(200).json({ message: 'Challenge deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error' });
    }
};

module.exports = { removeChallengeByUserIdAndName };
