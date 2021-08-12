var express = require('express');
var router = express.Router();
const { Products } = require('../database/database');
/* GET home page. */
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let currProducts = await Products.find(  );
    console.log(currProducts);
    res.render('tracking', {products: currProducts});
});

module.exports = router;
