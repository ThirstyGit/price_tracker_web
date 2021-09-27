// Importing external modules
var express = require('express');

// Importing Internal modules
const { Scrape } = require('../database/database');
const loginRequired = require('../middleware/loginRequired');
const { Request } = require('../database/database')

var router = express.Router();

router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.render("admin", {requests});
});

router.post('/newproduct', loginRequired, (req, res) => {
    const {url, name, price, image} = req.body;
    Scrape({url, params: {name, price, image}}).save();
    res.redirect('/admin');
});


router.delete("/deleteproduct",loginRequired, (req, res) => {
  Scrape.deleteOne({_id: req.body.id})
  .then(() => {
    res.json({message: "Deleted"});
  })
  .catch(err => {
    res.json(err);
  });
  
});


module.exports = router;