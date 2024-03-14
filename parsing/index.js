const { isBohCommand, isConvertCommand, getCommandArray, askedNicely} = require("./utils");
const { convert } = require("./commands/convert");
const {reactToMessage} = require("../message");
const {star, heart} = require("../emojis");

const parse = async (msg) => {
    const text = msg?.content;
    if(!isBohCommand(text)) return;

    await reactToMessage(msg, star);

    const commandArray = getCommandArray(text);

    if(askedNicely(commandArray)) {
        await reactToMessage(msg, heart);
    }

    if(isConvertCommand(commandArray)) {
        await convert(msg, commandArray);
    }
}

module.exports = {
    parse
}