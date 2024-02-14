const Code = require('../models/code');
const { checkFileNameExists } = require('./checkFile');

const saveCode = async (req, res) => {
    const { user_id, file_name, code } = req.body;
    try {
        
        const { exists } = await checkFileNameExists({user_id, file_name});
        let existingCode;
        // If code doesn't exist, return an error
        if (!exists) {
            // return res.status(404).json({ error: 'Code not found' });
            existingCode = new Code({user_id, file_name, code});
        } else {
            // Update code
            existingCode = await Code.findOne({ user_id, file_name });
            existingCode.code = code;
        }
        
        await existingCode.save();

        res.status(200).json({ message: 'Code saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error' });
    }
};
module.exports = { saveCode };