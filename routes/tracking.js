var express = require('express');
var router = express.Router();
const { Products } = require('../database/database');
/* GET home page. */
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    let currProducts = await Products.find(  );
    // console.log(currProducts);
    let refinedArray = [];
    currProducts.forEach(el => {
        // console.log(el);
        let lastTwo = [0, 0];
        let label = ["➡️", "Stable"]
        const lenPrice = el.price_history.length;
        if (lenPrice > 1) {
            lastTwo = [el.price_history[lenPrice - 1].price, el.price_history[lenPrice - 2].price];
            if (lastTwo[0] > lastTwo[1]) {
                label = ["⬆️", "Going up"]
            } else if (lastTwo[0] < lastTwo[1]) {
                label = ["⬇️", "Going down"]
            }
            refinedArray.push({el, label, lastTwo});
            
        } else {
            lastTwo = [el.price_history[lenPrice - 1].price, el.price_history[lenPrice - 1].price];
            refinedArray.push({el, label, lastTwo});
        }
    });
    console.log(refinedArray[0]);
    res.render('tracking', {products: refinedArray});
});

module.exports = router;
