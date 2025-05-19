const express = require('express');
const router = express.Router();
const linkedInPostController = require('../../controllers/post/linkedinPostController');

// Route to get LinkedIn posts by reading the CSV file
router.get('/linkedin/posts', linkedInPostController.getLinkedInPostsFromFile);

module.exports = router;