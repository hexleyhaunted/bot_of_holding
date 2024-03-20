const {hasAnIntegerValue, hasANegativeValue} = require("../utils");
const {getJson} = require("../file");
const isBohCommand = (text) => {
    return text.toLowerCase().startsWith("boh");
}

const isConvertCommand = (commandArray) => {
    return commandArray.includes("convert");
}

const isStashCommand = (commandArray) => {
    return commandArray.length >= 2 && commandArray[1] === "stash";
}

const isShowStashCommand = (commandArray) => {
    return commandArray.length >= 3 && commandArray[1] === "show" && commandArray[2] === "stash";
}

const isHelpCommand = (commandArray) => {
    return commandArray.includes("help");
}

const normaliseText = (text) => {
    return text.toLowerCase();
}

const getCommandArray = (text) => {
    return normaliseText(text)?.split(" ");
}

const askedNicely = (commandArray) => {
    return commandArray.includes("please") || commandArray.includes("kindly")
}

const getCoins = (commandArray) => {
    const coins = {};
    commandArray.forEach((part) => {
        const endSegment = part.substring(part.length - 2);
        const looksLikeACoin = isACoinName(endSegment);
        const valueSegment = part.substring(0, part.length - 2);
        const hasAValue = hasAnIntegerValue(valueSegment) && !hasANegativeValue(valueSegment);
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

const convertCpToHighestValueCoins = (cp) => {
    const coins = {};
    // coins["pp"] = Math.floor(cp / 1000);
    // cp = cp % 1000;
    coins["gp"] = Math.floor(cp / 100);
    cp = cp % 100;
    // coins["ep"] = Math.floor(cp / 50);
    // cp = cp % 50;
    coins["sp"] = Math.floor(cp / 10);
    cp = cp % 10;
    coins["cp"] = cp;

    removePropertiesFromObject(coins, 0);

    return coins;
}

const removePropertiesFromObject = (obj, value) => {
    Object.keys(obj).forEach(key => obj[key] === value && delete obj[key]);
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

const simplifyCoinsToHighestValue = (coins) => {
    return convertCpToHighestValueCoins(convertCoinsToCp(coins));
}

const getStash = (msg) => {
    return getJson("stash", msg.guildID) || [];
}

module.exports = {
    isBohCommand,
    isConvertCommand,
    isStashCommand,
    normaliseText,
    getCommandArray,
    askedNicely,
    getCoins,
    getCoinsObjAsString,
    convertCpToHighestValueCoins,
    convertCoinsToCp,
    simplifyCoinsToHighestValue,
    isHelpCommand,
    isShowStashCommand,
    getStash
}