// Importing necessary modules.
const router = require('express').Router();
const axios = require('axios');
// Importing user defined modules.
const scrap = require('../functions/scrap.js');
const { Scrape, Monitor } = require("../database/database.js");
let cron = require('node-cron');
let startTime = 0;
let running = false;
let _expr = null;
router.post('/scrap', async (req, res) => {
  let jobs = cron.getTasks();
  if (jobs.length != 0) {
    jobs.forEach((el) => {
      el.stop();
      // el.destroy(); Why it didn't work?
    });
    running = false;
  } 
  
  _expr = req.body.cronExpr;
  // console.log(_expr);
  const results = await Scrape.find();
  startTime = Date.now();
  running = true; 
  cron.schedule(_expr, () => {
    console.log(`scraping going on: ${new Date().toString()}`);
    results.forEach(result => {
      
      const { url, params } = result;
      scrap(url, params, async (productData) => {
        console.log(`god does it work? ${productData}`);
        productData.forEach(async (el) => {
          console.log(el.price);
          // const monitorDB = await Monitor.find({link: url}).where('minDesiredPrice').lt(el.price + 1);

        })
      });
      // console.log(price);
    });
  });





  // Monitoring price and sending email if needed.








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
  running = false;
  // console.log(cron.getTasks())
  console.log(`This schedule is running for ${(Date.now() - startTime)/1000/60} minutes`);
  let jobs = cron.getTasks();
  if (jobs.length != 0) {
    jobs.forEach((el) => {
      el.stop();
      // el.destroy(); Why it didn't work?
    });
  } 
  res.json({msg: "duh!", _expr});

  
});

router.post('/log', (req, res) => {
  res.json({running});
})

module.exports = router;
