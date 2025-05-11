const fs = require('fs');
const csv = require('csv-parser');
// import csv from "../../config/Profile.csv";

const getLinkedInPostsFromFile = async (req, res) => {
  const results = [];
  const filePath = '../../config/Profile.csv'; // Adjust the path

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Adjust how you structure the data based on your CSV columns
      results.push({
        text: data.text,
        timestamp: new Date(data.timestamp),
        // Add other fields as needed
      });
    })
    .on('end', () => {
      res.json(results);
    })
    .on('error', (error) => {
      console.error('Error reading or parsing CSV:', error);
      res.status(500).json({ message: 'Error reading LinkedIn data' });
    });

    console.log("Results : "+results);
};

module.exports = { getLinkedInPostsFromFile };