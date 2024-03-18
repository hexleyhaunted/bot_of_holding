const fs = require("fs");
const {errorReplyOnChannel, defaultErrorResponse} = require("./message");

const getJson = (filename, serverId) => {
    const filePath = `./jsonData/${filename}${serverId}`;
    let jsonObj;
    try {
        jsonObj = require(filePath);
    } catch (e) {}
    return jsonObj;
}

const saveJson = async (filename, serverId, jsonObj) => {
    const filePath = `./jsonData/${filename}${serverId}.json`;
    const data = JSON.stringify(jsonObj);
    await fs.writeFile(filePath, data, (err) => {});
}

const getTextFileData = (filePath) => {
    return new Promise((resolve, reject) => {fs.readFile(filePath, (err, data) => {
        if(err) reject(err);
        else resolve(data.toString())
    })});
}

module.exports = {
    getJson,
    saveJson,
    getTextFileData
}