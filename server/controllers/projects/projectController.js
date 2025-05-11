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

    // console.log("data",req.body);
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

const getProjects = async (req,res) => {

  const { id: userId } = req.params;

  try {

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "userId required for getting Project List!",
      });
    }

    const projects = await Project.find({ userId: userId });
    console.log(projects);
    if (!projects) {
      return res.status(201).json({
        success: false,
        message: "No Projects found",
      });
    }

    return res.json({
      success: true,
      projects,
      message: "Projects Found for the User !",
    });

  }catch(error) {
    console.error("Error submitting Contributor details:", error);
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = { createProject , getProjects};
