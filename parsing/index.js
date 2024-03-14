const { isBohCommand, isConvertCommand, getCommandArray } = require("./utils");
const { convert } = require("./commands/convert");

const parse = async (msg) => {
    const text = msg?.content;
    if(!isBohCommand(text)) return;

    const commandArray = getCommandArray(text);
    if(isConvertCommand(commandArray)) {
        await convert(msg, commandArray);
    }
}

module.exports = {
    parse
}