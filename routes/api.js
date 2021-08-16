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

router.get('/scrap', async (req, res) => {
  if(req.query.name) {
    const searchValue = req.query.name.replace(" ", "|");
    const data = await Scrape.find({ url: new RegExp(searchValue, "i") });
    res.json(data);
  }
  else {
    res.json({ error: 'Please give the name of the product.' })
  }
});

module.exports = router;
