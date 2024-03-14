

const getJson = (filename) => {
    try {
        const jsonString = require(`./jsonData/${filename}`);
        if(jsonString === undefined) return {};
        else return JSON.parse(jsonString);
    } catch (e) {
        return {};
    }
}

module.exports = {
    getJson
}