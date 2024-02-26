const mongoose = require('mongoose')
const { Schema } = mongoose;

const challengeSchema = new Schema({
    user_id: {
        type: String,
        required: false //If a user adds a challenge, require user_id. Else, not
    },
    description: { //Really short description of challenge
        type: Object, // short and long description
        required: true
    },
    challenge_name: {
        type: String,
        required: true
    },
    boilerplate: { //this should have a function definition, function call
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    test_values: {
        type: Array,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    }

});

const Challenge = mongoose.model('Challenge', challengeSchema)
module.exports = Challenge