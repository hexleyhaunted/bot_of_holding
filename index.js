const eris = require("eris");

const token = "MTIxNzc4NzIyNzA5NTA0MDE1NA.GfJj4l.JhEyk6k1iF7XslvhG60U0Z7AkfyetZ28D5AwRU";
const bot = new eris.Client(token);

bot.on("ready", () => {
    console.log("Connected");
});

bot.on("messageCreate", async(msg) => {
    // const botWasMentioned = msg.mentions.find(mentionedUser => mentionedUser.id === bot.user.id);
    // if(botWasMentioned) {
    //     try {
    //         await msg.channel.createMessage("Present");
    //     } catch (err) {
    //         console.warn("Failed to respond to mention");
    //         console.warn(err);
    //     }
    // }
    const content = msg.content;
    if (!content.startsWith("boh")) {
        return;
    } else {
        try {
            await msg.channel.createMessage("Present");
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