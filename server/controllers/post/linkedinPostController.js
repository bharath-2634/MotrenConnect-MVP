// const scrapeLinkedInPosts = require('../../config/linkedinscrap');
// require('dotenv').config();

// const EMAIL = process.env.LINKEDIN_EMAIL;
// const PASSWORD = process.env.LINKEDIN_PASSWORD;

// const getLinkedInPosts = async (req, res) => {
//   try {
//     console.log("Entered");
//     const posts = await scrapeLinkedInPosts(EMAIL, PASSWORD);
//     console.log("posts",posts);
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error('Scraping failed:', error);  // 🔍 Print the exact error
//     res.status(500).json({ message: 'Scraping failed', error: error.message });
//   }
// };


// module.exports = { getLinkedInPosts };
