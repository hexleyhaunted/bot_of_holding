const {reactToMessage, replyOnChannel, getRandomExpletive} = require("../../message");
const {present, gem, scream} = require("../../emojis");
const {getCoinsObjAsString, getStash} = require("../utils");

const showStash = async (msg, commandArray) => {
    await reactToMessage(msg, present);
    const stash = getStash(msg);
    let itemList = "";
    stash?.forEach((item, index) => {
        itemList += `> [${index}] ${item.name} (${getCoinsObjAsString(item.value)})\n`;
    });
    let reply = `${getRandomExpletive()}, It looks like you haven't collected anything yet! ${scream}`;
    if(itemList.length > 0) reply = `Of course! Here's everything you've stashed so far! ${gem}\n${itemList}`;

    await replyOnChannel(msg, reply);
}

module.exports = {
    showStash
}