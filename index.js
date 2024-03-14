const eris = require("eris");
require("dotenv").config();
const {parse} = require("./parsing/index");
const {getJson} = require("./json");

const bot = new eris.Client(process.env.TOKEN);

bot.on("ready", () => {
    console.log("Connected");
    console.log(getJson("money"));
});

bot.on("messageCreate", async(msg) => {
    await parse(msg);
});

bot.on("error", err => {
    console.warn(err);
});

bot.connect();