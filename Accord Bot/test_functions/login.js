const Discord = require("discord.js");
const client = new Discord.Client({
intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS","GUILD_MEMBERS"],
});

const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `` });
require("dotenv").config();

// var admin = require("firebase-admin");
// var serviceAccount = require("./firebase.json");

// admin.initializeApp({
// credential: admin.credential.cert(serviceAccount),
// });

// const DB = admin.firestore();
const prefix = ".";

const logon = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
}
client.on("ready", logon);
client.destroy();

module.exports = logon