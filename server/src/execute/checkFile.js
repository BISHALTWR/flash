const Code = require('../models/code');

const checkFileNameExists = async (params) => {
    const { user_id, file_name } = params;
    try {
        const existingCode = await Code.findOne({ user_id: user_id, file_name: file_name });
        return { exists: !!existingCode };
    } catch (error) {
        console.error(error);
        return { error: 'Error' };
    }
};

module.exports = { checkFileNameExists };
