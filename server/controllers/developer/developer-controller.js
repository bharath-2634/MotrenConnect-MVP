const Developer = require("../../models/Developer");

// Controller to handle creation of a Developer
const createDeveloper = async (req, res) => {
  try {
    const {
      userId,
      domain,
      techStack,
      repoLink,
    } = req.body;

    const existingDeveloper = await Developer.findOne({ userId });
    if (existingDeveloper) {
      return res.status(400).json({ message: "Developer already submitted!" });
    }

    const newDeveloper = new Developer({
      userId,
      domain,
      techStack,
      repoLink,
    });

    await newDeveloper.save();

    res.status(201).json({
      message: "Developer details submitted successfully!",
      data: newDeveloper,
    });
  } catch (error) {
    console.error("Error submitting developer details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = createDeveloper;
