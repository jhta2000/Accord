const Discord = require("discord.js");
const { messageHandler } = require("./Accord");
require('dotenv').config()

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS"],
});


client.on("ready", () => {
    if(client.user){
        console.log(`Logged in as ${client.user.tag}!`)
    }
})

client.on("messageCreate", messageHandler);
client.login(process.env.BOT_TOKEN)