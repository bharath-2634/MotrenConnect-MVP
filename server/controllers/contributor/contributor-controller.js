const axios = require("axios");
const Contributor = require("../../models/Contributor");

const createContributor = async (req, res) => {
  try {
    const {
      userId,
    } = req.body;

    // Prevent duplicate entry
    const existingContributor = await Contributor.findOne({ userId });
    if (existingContributor) {
      return res.status(400).json({ message: "Contributor already submitted!" });
    }

    // Save new developer
    const newContributor = new Contributor({
      userId,
    });

    await newContributor.save();

    
    res.status(201).json({
      message: "Contributor submitted successfully!",
      data: newContributor,
    });

  } catch (error) {
    console.error("Error submitting Contributor details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = createContributor;
