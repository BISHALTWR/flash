const Code = require('../models/code')

const saveCode = async (req, res) => {
    console.log(req.body);
    newCode =  new Code(req.body);
    await newCode.save();
};

module.exports = { saveCode };