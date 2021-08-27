const {Monitor} = require('../database/database');

const min = (array) => {
    return Math.max.apply(Math, array);
}

const calculateNextTime = (nextFormat) => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const nextArray = nextFormat.split(":");

    return nextArray[1] == "H" ?  Date.now() + parseInt(nextArray[0]) * 60 * 60 * 1000 : Date.now() + parseInt(nextArray[0]) * 60 * 1000;
    
}

const getNextTimeInterval = async () => {
    
    const currDatabase = await Monitor.find({}).sort({'nextTime': 1});
    
    const interval = parseInt(currDatabase[0].nextTime) - Date.now();
    console.log(`function genNextTimeInterval: ${interval}`);
    console.log(currDatabase[0].productID);
    return {interval: interval < 0 ? 0 : interval, Id: currDatabase[0].productID};
}

const testDB = async () => {
    const currDatabase = await Monitor.find({}).sort({'nextTime': 1});
    console.log(parseInt(currDatabase[0].nextTime) < Date.now());
}

module.exports.Min = min;
module.exports.CalculateNextTime = calculateNextTime;
module.exports.getNextTimeInterval = getNextTimeInterval;
module.exports.testDB = testDB;