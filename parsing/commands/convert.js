const {replyOnChannel} = require("../../message");

const convert = async (msg, commandArray) => {
    await replyOnChannel(msg, "Convert command received");
}

module.exports = {
    convert
}