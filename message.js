const replyOnChannel = async (msg, reply) => {
    await msg.channel.createMessage(reply);
}

const reactToMessage = async (msg, emoji) => {
    await msg.addReaction(emoji);
}

const replyOnDM = async (msg, reply) => {
    await (await msg.author.getDMChannel()).createMessage(reply);
}

module.exports = {
    replyOnDM,
    reactToMessage,
    replyOnChannel
}