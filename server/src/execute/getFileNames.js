const Code = require('../models/code');

const getFileNamesByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const fileNames = await Code.find({ user_id: user_id }).distinct('file_name');
        res.status(200).json({ fileNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error' });
    }
};

module.exports = { getFileNamesByUserId };