const Project = require("../../models/Project"); 

const createProject = async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      workFlow,
      techStack,
      documentUrl, 
      submissionDate,
      maxBudget,
      isMentorshipProject
    } = req.body;

    console.log("data",req.body);
    const newProject = new Project({
        userId,
        title,
        description,
        workFlow,
        techStack,
        documentUrl, 
        submissionDate,
        maxBudget,
        isMentorshipProject
    });

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createProject };
