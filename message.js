const {questionMark, cross} = require("./emojis");
const {getRandomItemFromArray} = require("./utils");

const replyOnChannel = async (msg, reply) => {
    await msg.channel.createMessage(reply);
}

const reactToMessage = async (msg, emoji) => {
    await msg.addReaction(emoji);
}

const replyOnDM = async (msg, reply) => {
    await (await msg.author.getDMChannel()).createMessage(reply);
}

const confusedReplyOnChannel = async (msg, reply) => {
    await reactToMessage(msg, questionMark);
    await replyOnChannel(msg, reply);
}

const errorReplyOnChannel = async (msg, reply) => {
    await reactToMessage(msg, cross);
    await replyOnChannel(msg, reply);
}

const defaultErrorResponse = async (msg) => {
    await reactToMessage(msg, cross);
    await replyOnChannel(msg, `${getRandomExpletive()} Sorry, I messed that one up. Maybe try again?`);
}

const getRandomExpletive = () => {
    const expletives = ["Erk!", "Crumbs!", "Biscuits!", "Jinkies!", "Zoinks!", "Oh Stars!", "Whoops!"];
    return getRandomItemFromArray(expletives);
}

const getRandomExclamation = () => {
    const exclamations = ["Cool!", "Grand!", "Groovy!", "Magic!"];
    return getRandomItemFromArray(exclamations);
}

module.exports = {
    replyOnDM,
    reactToMessage,
    replyOnChannel,
    confusedReplyOnChannel,
    errorReplyOnChannel,
    defaultErrorResponse,
    getRandomExclamation
}