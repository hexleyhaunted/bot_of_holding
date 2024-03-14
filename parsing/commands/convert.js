const {replyOnChannel, getRandomExclamation, reactToMessage} = require("../../message");
const {hasAnIntegerValue} = require("../../utils")
const {money, star} = require("../../emojis");

const convert = async (msg, commandArray) => {
    await reactToMessage(msg, money);
    const coins = getCoins(commandArray);
    const split = getSplit(commandArray);
    const coinString = getCoinsObjAsString(coins);
    await replyOnChannel(msg, `${getRandomExclamation()} So you want me to convert ${coinString} and split it ${split} ways?`);
}

const getCoins = (commandArray) => {
    const coins = {};
    commandArray.forEach((part) => {
        const endSegment = part.substring(part.length - 2);
        const looksLikeACoin = isACoinName(endSegment);
        const valueSegment = part.substring(0, part.length - 2);
        const hasAValue = hasAnIntegerValue(valueSegment);
        const isACoin = looksLikeACoin && hasAValue;
        if(isACoin) {
            try {
                const value = Number.parseInt(valueSegment);
                if(coins[endSegment]) {
                    coins[endSegment] += value;
                } else {
                    coins[endSegment] = value;
                }
            } catch (e) {console.log("failed to convert string to int for coins");}
        }
    });
    return coins;
}

const getSplit = (commandArray) => {
    const splitIndex = commandArray.indexOf("split");
    if(splitIndex === -1 || commandArray.length < splitIndex + 2) return 1;
    const splitValue = commandArray[splitIndex + 1];
    const hasNumberAfterSplit = hasAnIntegerValue(splitValue);
    if(hasNumberAfterSplit) return Number.parseInt(splitValue);
    else return 1;
}

const isACoinName = (name) => {
    return name === "pp" || name === "gp" || name === "ep" || name === "sp" || name === "cp";
}

const getCoinsObjAsString = (coins) => {
    const coinsStringArray = [];
    if(coins["pp"]) coinsStringArray.push(`${coins["pp"]}pp`);
    if(coins["gp"]) coinsStringArray.push(`${coins["gp"]}gp`);
    if(coins["sp"]) coinsStringArray.push(`${coins["sp"]}sp`);
    if(coins["ep"]) coinsStringArray.push(`${coins["ep"]}ep`);
    if(coins["cp"]) coinsStringArray.push(`${coins["cp"]}cp`);
    return coinsStringArray.join(" ");
}

module.exports = {
    convert
}