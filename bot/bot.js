const Discord = require("discord.js")
//const Commando = require('discord.js-commando')
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS"]})

const {Octokit} = require("@octokit/core")
const octokit = new Octokit({auth: ``})

const prefix = "*gb "



client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`)
})



client.on("message", msg =>{
  if (msg.content === (prefix + "ping")){
    msg.reply("pang")
  }

})

client.on("message", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "clearchat")) {
         async function clear() {
             msg.delete()
             const fetched = await msg.channel.messages.fetch({limit: 99})
             msg.channel.bulkDelete(fetched)
            
         }
         clear()

    }

    if (msg.content === ("*gb")){
      msg.reply("not a valid command")
    }

    
    if(msg.content.toLowerCase().startsWith(prefix + "get")){
      const words = msg.content.split(" ")
      if(words.length < 4){
        msg.reply("try command *gb get owner repo")
      }else{
        getPullRequests(words[2],words[3])
      }
      
      
      
    }
    if(msg.content.toLowerCase().startsWith(prefix + "issues")){

    }
})

async function getPullRequests(owner,repo){
  try{
    const result = await octokit.request('GET /repos/{owner}/{repo}/pulls',
        {
          owner: owner,
          repo: repo
        })
    if(result.status === 200){
        //repo, name
      //repo , description
      ////html_url
      //number
      //title
      
      //user, login
      //"body"
      console.log(`${result.status} is type: ${typeof result.status}`)
      console.log(`${result.data[0]["user"]["login"]}`)
      console.log(`${result.data[0]["head"]["repo"]["description"]}`)
    }else{
      console.log(`Error code: ${result.status}`)
    }
  }catch(err){
    console.log(`${err}`)
  }
  
}


const token = 'OTAwMTIzMTY4NzM4NTEyOTI3.YW8vBg.-gfow5tLVk48asfzLKe63V7jwi4'
client.login(token)

