const express = require("express");
const router = express.Router();
const { createProject,getProjects } = require("../../controllers/projects/projectController");


router.post("/create", createProject);
router.get("/getProjects/:id",getProjects);

module.exports = router;
