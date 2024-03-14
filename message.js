const {questionMark} = require("./emojis");

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

module.exports = {
    replyOnDM,
    reactToMessage,
    replyOnChannel,
    confusedReplyOnChannel
}