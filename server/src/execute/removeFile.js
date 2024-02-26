const Code = require("../models/code");

const removeFile = async (req, res) => {
  const { user_id, file_name } = req.body;
  try {
    // Find the code
    const existingCode = await Code.findOne({ user_id, file_name });

    // If code doesn't exist, return an error
    if (!existingCode) {
      return res.status(404).json({ error: "Code not found" });
    }

    // Delete the code
    await Code.deleteOne({ user_id, file_name });

    res.status(200).json({ message: "Code deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
};

module.exports = { removeFile };
