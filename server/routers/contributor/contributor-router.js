const express = require("express");
const router = express.Router();
const createContributor = require("../../controllers/contributor/contributor-controller");


router.post("/submit", createContributor);

module.exports = router;
