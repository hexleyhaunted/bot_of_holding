const getRandomItemFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const hasANegativeValue = (value) => {
    return hasAnIntegerValue(value) && value.includes("-");
}

const hasAnIntegerValue = (value) => {
    return !isNaN(value) && !value.includes(".");
}

module.exports = {
    getRandomItemFromArray,
    hasAnIntegerValue,
    hasANegativeValue
}