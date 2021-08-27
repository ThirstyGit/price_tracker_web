var express = require('express');
var router = express.Router();
const { Monitor, Products, Scrape } = require('../database/database');
const {CalculateNextTime, getNextTimeInterval} = require('../functions/misc');
const scrap = require('../functions/scrap');
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
    let {interval, email, id} = await getNextTimeInterval();
    console.log(interval);
    if (!running) {
        setInterval(async () => {
            // console.log(getNextTimeInterval());
            interval = Infinity;
            const results = await Products.find({_id: id});
            const monitorThis = await Monitor.find({productID: id});
            monitorThis[0].nextTime = CalculateNextTime(monitorThis[0].increaseNext);
            monitorThis[0].save();
            const rrr = await getNextTimeInterval();
            interval = rrr.interval;
            email = rrr.email;
            id = rrr.id;

            // console.log(results);
            const scrapingResults = await Scrape.find({url: results[0].link});
            // console.log(scrapingResults);

            scrap(scrapingResults[0].url, scrapingResults[0].params);

            const lastPriceObj = await Products.find({_id: id});
            console.log(lastPriceObj[0].price_hostory[lastPriceObj[0].price_hostory.length - 1].price)

            console.log(`email to ${email}`);

        }, interval);
    }
    res.redirect('/tracking');
});

module.exports = router;