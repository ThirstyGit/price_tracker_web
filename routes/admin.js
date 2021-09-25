var express = require('express');
var router = express.Router();
const { Scrape } = require('../database/database');

const loginRequired = require('../middleware/loginRequired');

router.get("/", loginRequired, (req, res) => {
  res.render("admin");
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
  })
  
});


module.exports = router;