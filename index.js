const eris = require("eris");
require("dotenv").config();
const {star, questionMark} = require("./emojis");

const bot = new eris.Client(process.env.TOKEN);

bot.on("ready", () => {
    console.log("Connected");
});

bot.on("messageCreate", async(msg) => {
    const content = msg.content;
    if (!content.startsWith("boh")) {
        return;
    } else {
        try {
            await msg.addReaction(star);
            await msg.addReaction(questionMark);
            await msg.channel.createMessage("Present");
            //await (await msg.author.getDMChannel()).createMessage("Hello");
        } catch (err) {
            console.warn("Failed to respond to mention");
            console.warn(err);
        }
    }
});

bot.on("error", err => {
    console.warn(err);
});

bot.connect();