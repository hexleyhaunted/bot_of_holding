const getRandomItemFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const hasAnIntegerValue = (value) => {
    return !isNaN(value) && !value.includes(".") && !value.includes("-");
}

module.exports = {
    getRandomItemFromArray,
    hasAnIntegerValue
}