const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    email : String,
    username : String,
    phoneNumber : Number,
});

const User = mongoose.model('User', userSchema)
module.exports = User