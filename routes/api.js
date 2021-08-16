// Importing necessary modules.
const router = require('express').Router();
// Importing user defined modules.
const scrap = require('../functions/scrap.js');
const { Scrape } = require("../database/database.js");
let cron = require('node-cron');
let startTime = 0;

router.post('/scrap', async (req, res) => {
  const results = await Scrape.find();
  startTime = Date.now(); 
  cron.schedule('*/2 * * * *', () => {
    console.log(`scraping going on: ${new Date().toString()}`);
    results.forEach(result => {
      const { url, params } = result;
      scrap(url, params);
    });
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

router.post('/stopscraping', async (req, res) => {
  // console.log(cron.getTasks())
  console.log(`This schedule is running for ${(Date.now() - startTime)/1000/60} minutes`);
  let jobs = cron.getTasks();
  if (jobs.length != 0) {
    jobs.forEach((el) => {
      el.stop();
      // el.destroy(); Why it didn't work?
    });
  } 
  res.json({msg: "duh!"});

  
})

module.exports = router;
