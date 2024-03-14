const fs = require("fs");
const {errorReplyOnChannel, defaultErrorResponse} = require("./message");

const getJson = (filename, serverId) => {
    const filePath = `./jsonData/${filename}${serverId}`;
    let jsonObj = {};
    try {
        jsonObj = require(filePath);
    } catch (e) {console.log(e)}
    return jsonObj;
}

const saveJson = async (filename, serverId, jsonObj) => {
    const filePath = `./jsonData/${filename}${serverId}.json`;
    const data = JSON.stringify(jsonObj);
    await fs.writeFile(filePath, data, (err) => {});
}

module.exports = {
    getJson,
    saveJson
}