// Importing necessary modules.
const router = require('express').Router();
// Importing user defined modules.
const scrap = require('../functions/scrap.js');
const { Scrape } = require("../database/database.js");

router.post('/scrap', async (req, res) => {
  const results = await Scrape.find();
  results.forEach(result => {
    const { url, params } = result;
    scrap(url, params);
  });
  res.json({ message: 'Success' });
});

module.exports = router;
