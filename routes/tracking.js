var express = require('express');
var router = express.Router();
const { Products } = require('../database/database');
/* GET home page. */
router.get('/', async (req, res, next) => {

    // console.log(id);
    let currProducts = await Products.find();
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
            refinedArray.push({ el, label, lastTwo });

        } else {
            lastTwo = [el.price_history[lenPrice - 1].price, el.price_history[lenPrice - 1].price];
            refinedArray.push({ el, label, lastTwo });
        }
    });
    // console.log(refinedArray[0]);
    res.render('tracking', { products: refinedArray });
});

router.get('/prod/:id', async (req, res) => {
    console.log(1234);
    const ID = req.params.id;
    const desiredProduct = await Products.find({_id: ID});
    console.log(desiredProduct[0]);
    const prices = desiredProduct[0].price_history.map(({price}) => parseFloat(price.replace(/[^\d.-]/g, '')));
    const times = desiredProduct[0].price_history.map(({timestamp}) => new Date(`${timestamp}`).toLocaleTimeString()); // Bloody hell timestamp!!
    console.log(prices, times);
    res.render('product', {title: desiredProduct[0].name, link: desiredProduct[0].link, prices, times});
});

module.exports = router;
