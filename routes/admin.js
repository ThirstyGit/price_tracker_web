var express = require('express');
var router = express.Router();
const { Scrape } = require('../database/database');

router.post('/newproduct', (req, res) => {
    const {url, name, price} = req.body;
    Scrape({url, params: {name, price}}).save();
});