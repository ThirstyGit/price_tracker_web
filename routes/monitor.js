var express = require('express');
var router = express.Router();
const { Monitor } = require('../database/database');
const {CalculateNextTime, getNextTimeInterval} = require('../functions/misc');
let running = false;

router.post("/createSchedule", async (req, res) => {
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
    // console.log(await Monitor.find());
    const currState = await Monitor.find({productID, emailTo: emailOfRequester});
    if (currState.length !== 0) {
        res.send({msg: "You have already set this product."});
    } else {
        Monitor(DBObj).save();
        res.redirect(`/monitor/checkEmailScheduler`);
    }
});

router.get('/checkEmailScheduler', async (req, res) => {
    let {interval, email} = await getNextTimeInterval();
    console.log(interval);
    if (!running) {
        setInterval(() => {
            // console.log(getNextTimeInterval());
            console.log(`email to ${email}`);

        }, interval);
    }
    res.redirect('/tracking');
});

module.exports = router;