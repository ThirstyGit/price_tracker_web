var express = require('express');
var router = express.Router();
const { Products } = require('../database/database');
/* GET home page. */
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    console.log(id);
    Products.find((err, book) => {
        console.log(book);
    });
    res.render('tracking');
});

module.exports = router;
