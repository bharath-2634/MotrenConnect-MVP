const express = require("express");
const router = express.Router();
const createDeveloper = require("../../controllers/developer/developer-controller");


router.post("/submit", createDeveloper);

module.exports = router;
