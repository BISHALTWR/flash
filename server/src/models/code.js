const mongoose = require("mongoose");
const { Schema } = mongoose;

const codeSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const Code = mongoose.model("Code", codeSchema);
module.exports = Code;
