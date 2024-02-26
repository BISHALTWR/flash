const Code = require("../models/code");

const rename = async (req, res) => {
  const { user_id, file_name, new_name } = req.body;
  try {
    // Check if the file to be renamed exists
    const existingFile = await Code.findOne({ user_id, file_name });
    if (!existingFile) {
      return res.status(404).json({ error: "File not found" });
    }
    // checking if new file name is available
    const existingNewFile = await Code.findOne({
      user_id,
      file_name: new_name,
    });
    if (existingNewFile) {
      return res
        .status(400)
        .json({ error: "A file with the new name already exists" });
    }

    // Rename the file
    existingFile.file_name = new_name;
    await existingFile.save();

    res.status(200).json({ message: "File renamed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
};

module.exports = { rename };
