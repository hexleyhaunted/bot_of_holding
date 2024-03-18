const {replyOnDM} = require("../../message");
const {laugh} = require("../../emojis");
const {getTextFileData} = require("../../file");

const help = async (msg, commandArray) => {
    getTextFileData("./help.txt").then((helpText) => {
        replyOnDM(msg, `Hey! Here's a handy cheat sheet ${laugh}\n${helpText}`);
    });
}

module.exports = {
    help
}