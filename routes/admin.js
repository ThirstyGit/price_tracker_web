var express = require('express');
var router = express.Router();
const { Scrape } = require('../database/database');

router.post('/newproduct', (req, res) => {
    const {url, name, price, image} = req.body;
    Scrape({url, params: {name, price, image}}).save();
    res.redirect('/admin');
});

module.exports = router;