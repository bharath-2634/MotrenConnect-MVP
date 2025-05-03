const axios = require("axios");
const Developer = require("../../models/Developer");

const createDeveloper = async (req, res) => {
  try {
    const {
      userId,
      domain,
      techStack,
      repoLink,
    } = req.body;

    // Prevent duplicate entry
    const existingDeveloper = await Developer.findOne({ userId });
    if (existingDeveloper) {
      return res.status(400).json({ message: "Developer already submitted!" });
    }

    // Save new developer
    const newDeveloper = new Developer({
      userId,
      domain,
      techStack,
      repoLink,
    });

    await newDeveloper.save();

    console.log(newDeveloper._id);
    // Step 1: Call ML model with ObjectId
    const mlResponse = await axios.get(
      `https://profileverification-motren-ai.onrender.com/classify?developer_id=${newDeveloper._id}`
    );
    
    console.log("MlResponse",mlResponse);
    // Step 2: Return both DB and ML response
    res.status(201).json({
      message: "Developer submitted successfully!",
      data: newDeveloper,
      mlResult: mlResponse.data
    });

  } catch (error) {
    console.error("Error submitting developer details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = createDeveloper;
