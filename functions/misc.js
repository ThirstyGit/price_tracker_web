const {Monitor} = require('../database/database');

const min = (array) => {
    return Math.max.apply(Math, array);
}

const calculateNextTime = (nextFormat) => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const nextArray = nextFormat.split(":");

    return nextArray[1] == "H" ?  Date.now() + nextArray[0] * 60 * 60 * 1000 : Date.now() + nextArray[0] * 60 * 1000;
    
}

const getNextTimeInterval = async () => {
    // await Monitor.deleteMany({emailTo: "jimmashuke@gmail.com"});
    const currDatabase = await Monitor.find({}).sort({'nextTime': 1});
    // console.log(currDatabase[0].nextTime, parseInt(currDatabase[0].nextTime) - Date.now() );
    // const filterDB = currDatabase.filter((a) => a.nextTime.includes(':'));
    // const sortedDB = currDatabase.sort((a, b) => a.nextTime - b.nextTime)
    // console.log(sortedDB);
    const interval = parseInt(currDatabase[0].nextTime) - Date.now();
    return {interval: interval < 0 ? 0 : interval, email: currDatabase[0].emailTo};
}

module.exports.Min = min;
module.exports.CalculateNextTime = calculateNextTime;
module.exports.getNextTimeInterval = getNextTimeInterval;