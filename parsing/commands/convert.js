const {replyOnChannel, getRandomExclamation, reactToMessage} = require("../../message");
const {hasAnIntegerValue} = require("../../utils")
const {money, star, thinking} = require("../../emojis");
const {getCoins, getCoinsObjAsString, convertCoinsToCp, convertCpToHighestValueCoins} = require("../utils");

const convert = async (msg, commandArray) => {
    await reactToMessage(msg, money);
    const coins = getCoins(commandArray);
    const split = getSplit(commandArray);
    const coinString = getCoinsObjAsString(coins);
    await replyOnChannel(msg, `${getRandomExclamation()} So you want me to convert ${coinString} and split it ${split} ways?`);
    const totalCp = convertCoinsToCp(coins);
    const totalCpEach = Math.floor(totalCp / split);
    const remainderCp = totalCp % split;
    const convertedCoinsEach = convertCpToHighestValueCoins(totalCpEach);
    const convertedCoinsString = getCoinsObjAsString(convertedCoinsEach);

    let conversionReplyString = `Which will get you... ${thinking}\n${convertedCoinsString} `;
    if(split > 1) conversionReplyString += `each`;
    if(remainderCp > 0) conversionReplyString += ` and ${remainderCp}cp left over between you!`;
    conversionReplyString += star;
    await replyOnChannel(msg, conversionReplyString);
}

const getSplit = (commandArray) => {
    const splitIndex = commandArray.indexOf("split");
    if(splitIndex === -1 || commandArray.length < splitIndex + 2) return 1;
    const splitValue = commandArray[splitIndex + 1];
    const hasNumberAfterSplit = hasAnIntegerValue(splitValue);
    if(hasNumberAfterSplit) return Number.parseInt(splitValue);
    else return 1;
}

module.exports = {
    convert
}