const {replyOnChannel, getRandomExclamation, reactToMessage} = require("../../message");
const {hasAnIntegerValue} = require("../../utils")
const {money, star, thinking} = require("../../emojis");

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

const convertCoinsToCp = (coins) => {
    let cp = coins["cp"] || 0;
    if(coins["pp"]) cp += (coins["pp"] * 1000);
    if(coins["gp"]) cp += (coins["gp"] * 100);
    if(coins["ep"]) cp += (coins["ep"] * 50);
    if(coins["sp"]) cp += (coins["sp"] * 10);
    return cp;
}

const getCoinsObjAsString = (coins) => {
    const coinsStringArray = [];
    if(coins["pp"]) coinsStringArray.push(`${coins["pp"]}pp`);
    if(coins["gp"]) coinsStringArray.push(`${coins["gp"]}gp`);
    if(coins["ep"]) coinsStringArray.push(`${coins["ep"]}ep`);
    if(coins["sp"]) coinsStringArray.push(`${coins["sp"]}sp`);
    if(coins["cp"]) coinsStringArray.push(`${coins["cp"]}cp`);
    return coinsStringArray.join(" ");
}

const convertCpToHighestValueCoins = (cp) => {
    const coins = {};
    // coins["pp"] = Math.floor(cp / 1000);
    // cp = cp % 1000;
    coins["gp"] = Math.floor(cp / 100);
    cp = cp % 100;
    coins["ep"] = Math.floor(cp / 50);
    cp = cp % 50;
    coins["sp"] = Math.floor(cp / 10);
    cp = cp % 10;
    coins["cp"] = cp;
    return coins;
}

module.exports = {
    convert
}