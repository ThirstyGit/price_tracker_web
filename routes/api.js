const loginRequired = require('../middleware/loginRequired');
// Importing necessary modules.
const router = require('express').Router();
// Importing user defined modules.
const scrap = require('../functions/scrap.js');
const { Scrape, Products } = require("../database/database.js");
let cron = require('node-cron');
let startTime = 0;
let running = false;

router.post('/scrap',loginRequired , async (req, res) => {
  let jobs = cron.getTasks();
  if (jobs.length != 0) {
    jobs.forEach((el) => {
      el.stop();
      // el.destroy(); Why it didn't work?
    });
    running = false;
  } 
  const _expr = req.body.cronExpr;
  // console.log(_expr);
  const results = await Scrape.find();
  startTime = Date.now();
  running = true; 
  cron.schedule(_expr, () => {
    console.log(`scraping going on: ${new Date().toString()}`);
    results.forEach(result => {
      const { url, params } = result;
      scrap(url, params);
    });
  });
  res.json({ message: 'Success' });
});

router.get('/scrap',loginRequired , async (req, res) => {
  if(req.query.name) {
    const searchValue = req.query.name.replace(" ", "|");
    const data = await Scrape.find({ url: new RegExp(searchValue, "i") });
    res.json(data);
  }
  else {
    res.json({ error: 'Please give the name of the product.' })
  }
});

router.post('/stopscraping',loginRequired , async (req, res) => {
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
  res.json({msg: "duh!"});

  
});

router.post('/log', (req, res) => {
  res.json({running});
})

router.get('/allproducts', loginRequired, async (req, res) => {
  const products = await Products.find();
  res.json(products);
})

router.get('/userinfo', loginRequired, (req, res) => {
  res.json({user: req.user});
})

module.exports = router;
