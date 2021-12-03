jest.useFakeTimers()
const logon = require("../test_functions/login.js")

const messagehandler = require("../test_functions/testcommands.js")


describe('Discord bot functions', ()=>{
    test(`tesing clienting startup`, async () =>{
        console.log = jest.fn()
        const client ={
            user:{
                tag:"Discord#tag_num"
            }
        }
        logon(client)
        expect(console.log.mock.calls[0][0]).toBe(`Logged in as ${client.user.tag}!`)
    })

    test(`Testing successful role assign`, async() =>{
        const message = ({
            guild:{
                roles:{
                    fetch:jest.fn(()=>{
                        const name=['testrole']
                        return name
                    }).mockName('fetch')
                    
                }
            },
            mentions:{
                members:{
                    first: jest.fn(()=>{
                            const member = {
                                displayName:"test_name",
                                roles:{
                                    add:jest.fn().mockName('add')
                                }
                            }
                            return member
                        }).mockName('first')
                }
            },
            content:`.assign @test_mention testrole`,
            reply:jest.fn()
        })
        messagehandler(message)
        
        await expect(message.guild.roles.fetch).toHaveBeenCalled()

        await expect(message.mentions.members.first).toHaveBeenCalled()

        
        expect(message.reply.mock.calls[0][0]).toBe("role added")
        

    })

    test(`Testing for role creation task`, async()=>{
        const message ={
            guild:{
                roles:{
                    create:jest.fn().mockName('create')
                }
            },
            content:".createrole testname #12345",
            reply:jest.fn()
        }

        messagehandler(message)
        await expect(message.guild.roles.create).toHaveBeenCalled()
        await expect(message.reply.mock.calls[0][0]).toBe("New role has been created\n for testname with color: #12345")

    })

    test(`Check github pull requests API`,()=>{
        const message = {
            content:".github pullrq phivo1998 Accord",
            reply:jest.fn()

        }
        console.log = jest.fn()
        
        messagehandler(message)
        expect(console.log.mock.calls[0][0]).toBe("Retrieved pull requests")
        expect(message.reply.mock.calls[0][0]).toBe("Retrieving Pull Requests, give me a moment...")
    })

    test(`Check github issues requests API`,()=>{
        const message = {
            content:".github issues phivo1998 Accord",
            reply:jest.fn()

        }
        console.log = jest.fn()
        
        messagehandler(message)
        expect(console.log.mock.calls[0][0]).toBe("Retrieved issues requests")

        expect(message.reply.mock.calls[0][0]).toBe("Retrieving Issues, give me a moment...")
    })

    test('Reply with bot commands', async()=>{
        const message = ({
            content: ".commands",
            reply:jest.fn()
            
        })    

         messagehandler(message)
         expect(message.reply.mock.calls[0][0]).toBe(".todo: Add to your personal To Do List! \n" +
         ".list: View your personal To Do List! \n" +
         ".remove: Remove one of your To Do List Duties! \n" +
         ".creategoal: Create your own Personal Goal! \n" +
         ".editgoaldesc: Edit a goal's description to your liking\n" +
         ".ls: View your List of Goals! \n" +
         ".viewgoal: View a Specific Goal and Learn more about it! \n" +
         ".rmgoal: Remove a Goal! \n" +
         ".github: Learn about this GitHub Command! \n" +
         ".github pullrq owner repo: Pull Requests from your sepcifed Owner and Repo! \n" +
         ".github issues owner repo: Issues from your specific Owner and Repo! \n" +
         ".request: Inputs your Help Request to a list for others to view \n" +
         ".reqlist: Views the list of Help Requests  \n" +
         ".reqinfo: Information on who sent the Help Request \n" +
         ".deletereq: Delete a Help Request from the list \n" +
         ".remindme: Set a reminder\n" +
         ".createrole team_name #color_number: adds new role to server with discord hex color\n"+
         ".assign @member role_name: adds a mentioned member to a specified team")
        
    })
})

