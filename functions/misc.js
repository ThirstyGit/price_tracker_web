const min = (array) => {
    return Math.max.apply(Math, array);
}

const calculateNextTime = (nextFormat) => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const nextArray = nextFormat.split(":");

    return nextArray[1] == "H" ?  `${(parseInt(hours) + parseInt(nextArray[0])) % 24}:${minutes}` : (parseInt(minutes) + parseInt(nextArray[0])) > 60 ?   `${(parseInt(hours) + 1) % 24}:${(parseInt(minutes) + parseInt(nextArray[0])) % 60}` : `${(parseInt(hours)) % 24}:${(parseInt(minutes) + parseInt(nextArray[0])) % 60}`;
    
}

module.exports.Min = min;
module.exports.CalculateNextTime = calculateNextTime;