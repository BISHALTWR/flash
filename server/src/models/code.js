const mongoose = require('mongoose')
const { Schema } = mongoose;

const codeSchema = new Schema({
    userId: String,
    code: String
});

const Code = mongoose.model('Code', codeSchema)
module.exports = Code