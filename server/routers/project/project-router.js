const express = require("express");
const router = express.Router();
const { createProject } = require("../../controllers/projects/projectController");


router.post("/create", createProject);

module.exports = router;
