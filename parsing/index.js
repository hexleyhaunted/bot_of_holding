const { isBohCommand, isConvertCommand, getCommandArray, askedNicely, isStashCommand, isHelpCommand} = require("./utils");
const { convert } = require("./commands/convert");
const {reactToMessage} = require("../message");
const {star, heart} = require("../emojis");
const {stash} = require("./commands/stash");
const {help} = require("./commands/help");

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
    else if(isStashCommand(commandArray)) {
        await stash(msg, commandArray);
    }
    else if(isHelpCommand(commandArray)) {
        await help(msg, commandArray);
    }
}

module.exports = {
    parse
}