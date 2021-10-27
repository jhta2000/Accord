const Discord = require('discord.js');
require('dotenv').config()
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES']
});
const token = process.env.BOT_TOKEN;
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yare-bot-21083-default-rtdb.firebaseio.com"
});

const DB = admin.firestore();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on("messageCreate", async message =>{
  if(message.author === client.user){ return; }
  try{
    if(message.content.startsWith("!createGoal")){
      const [command, ...args] = message.content.split(" ")
      await DB.collection("Goals").doc(args.join(" ")).set({
        GoalDescription: " ",
        ExpectedGoalCompleteDate: " ",
        GoalAuthor: message.author.username,
        GoalCreated: admin.firestore.Timestamp.fromDate(new Date())
      })
      .then(() => {
        console.log("Document written")
      })
      .catch((error) => {
        console.error("Error writing document: ", error)
      })
      message.reply("```Goal has been created. Type '!ls' to view a list of goals.```");
    }
  }
  catch(err){
    console.log(err);
  }
});
client.login(token);