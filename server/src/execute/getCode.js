const Code = require("../models/code");

const getCodeByUserIdAndFileName = async (req, res) => {
  const { user_id, file_name } = req.params;
  console.log(req.params);
  console.log("user_id:", user_id);
  console.log("file_name:", file_name);
  try {
    const code = await Code.findOne({ user_id, file_name });
    if (code) {
      res.status(200).json({ code });
    } else {
      res.status(404).json({ error: "Code not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
};

module.exports = { getCodeByUserIdAndFileName };
