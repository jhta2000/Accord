const Discord = require("discord.js")
//const Commando = require('discord.js-commando')
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS"]})

const {Octokit} = require("@octokit/core")
const octokit = new Octokit({auth: ``})
require("dotenv").config()

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
        
        const result = getPullRequests(words[2],words[3])
        result.then(term =>{
          console.log(`${term}`)
          msg.reply(term)
        })

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
        //head,repo, name
      const name = result.data[0]["head"]["repo"]["name"]
      //console.log(`${name}`)
            //repo , description
      const description = result.data[0]["head"]["repo"]["description"]
      //console.log(`${description}`)
      const repo = []
      repo.push(name,description)
      for(let i = 0; i < result.data.length; i ++){
        ////html_url
        const url = result.data[i]["html_url"]
        //console.log(`${url}`)
        //number
        const num_pullRequest = result.data[i]["number"]
        const pr_num = ("\n\nPull request #"+ num_pullRequest)
        //console.log(`${num_pullRequest}`)
        //title
        const title_pullRequest = result.data[i]["title"]
        //console.log(`${title_pullRequest}`)
        //user, login
        const posted_by = result.data[i]["user"]["login"]
        //console.log(`${posted_by}`)
        //"body"
        const description_pullRequest = result.data[i]["body"]
        //console.log(`${description_pullRequest}`)

        //console.log(`${JSON.stringify(result.data,null,4)}`)
        //console.log(`${result.status} is type: ${typeof result.status}`)
        
        repo.push(pr_num, url, title_pullRequest, posted_by,description_pullRequest)
      }
      
      //console.log(`${pullrequestList}`)
      return repo.join("\n")
      
    }else{
      throw Error
    }
  }catch(err){
    console.log(`${err} `)
    return 'An error occurred invalid Github User or Repository'
  }
  
}

client.login(process.env.TOKEN)

