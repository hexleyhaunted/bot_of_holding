const getRandomItemFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
    getRandomItemFromArray
}