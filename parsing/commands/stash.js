const {reactToMessage, confusedReplyOnChannel, replyOnChannel, getRandomExclamation, getRandomExpletive} = require("../../message");
const {present, thinking, star} = require("../../emojis");
const {getCoins, simplifyCoinsToHighestValue, getCoinsObjAsString, getStash} = require("../utils");
const {getJson, saveJson} = require("../../file");

const stash = async (msg, commandArray) => {
    await reactToMessage(msg, present);

    if(!commandArray.includes("worth")) {
        await confusedReplyOnChannel(msg,
            `${getRandomExpletive()}, you missed out how much that was worth ${thinking}\nLike this: \`boh stash gold figurine worth 1000gp\``
        );
    } else {
        const coinSection = commandArray.slice(commandArray.indexOf("worth") + 1);
        const coins = getCoins(coinSection);

        const hasCoins = Object.keys(coins).length > 0;
        if(!hasCoins) {
            await confusedReplyOnChannel(msg,
                `${getRandomExpletive()}, you didn't give any usable coins ${thinking}\nLike this: \`boh stash gold figurine worth 1000gp\``
            );
            return;
        }

        const convertedCoins = simplifyCoinsToHighestValue(coins);
        const itemName = getItemName(commandArray);
        const stash = getStash(msg);
        stash.push({name: itemName, value: convertedCoins});
        await saveStash(msg, stash);

        await replyOnChannel(msg, `${getRandomExclamation()} I've added \`${itemName}\` to your stash, worth ${getCoinsObjAsString(convertedCoins)}! ${star}`)
    }
}

const getItemName = (commandArray) => {
    return commandArray.slice(commandArray.indexOf("stash") + 1, commandArray.indexOf("worth")).join(" ");
}

const saveStash = async (msg, stash) => {
    try {
        await saveJson("stash", msg.guildID, stash);
    } catch (e) {
        console.log("Failed to save stash");
    }
}

module.exports = {
    stash
}