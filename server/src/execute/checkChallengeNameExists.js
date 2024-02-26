const Challenge = require('../models/challenge');

const checkChallengeNameExists = async ({ user_id, challenge_name }) => {
    try {
        const challenge = await Challenge.findOne({ user_id, challenge_name });
        return { exists: challenge !== null };
    } catch (error) {
        console.error(error);
        return { exists: false, error: 'Error checking challenge existence' };
    }
};

module.exports = { checkChallengeNameExists };
