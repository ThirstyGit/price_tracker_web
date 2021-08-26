var express = require('express');
var router = express.Router();
const { Monitor } = require('../database/database');
const {CalculateNextTime} = require('../functions/misc');


// router.get('/', (req, res) => res.send({test: 12}));

router.post("/createSchedule", (req, res) => {
    const {productID, interval, hourOrMinute, emailOfRequester, minimumDesiredPriceOfRequester} = req.body;

    const increaseNext = `${interval}:${hourOrMinute == "0" ? "M" : "H"}`;
    const nextTime = CalculateNextTime(increaseNext);
    // console.log(id);
    const DBObj = {
        productID,
        nextTime,
        minDesiredPrice: minimumDesiredPriceOfRequester,
        emailTo: emailOfRequester,
        increaseNext
    }

    Monitor(DBObj).save();
    res.redirect(`/tracking/prod/${productID}`);
});

module.exports = router;