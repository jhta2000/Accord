const messageHandler = require("../Accord Bot/Accord.js")


describe("Message Handler", () => {
    //these are our message properties
    const message = ({
        channel: {
            send: jest.fn()
        },
        content: "",
        reply: jest.fn(),
        author: {
            username: "testBot",
            bot: false,
        },
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it("should add to do list", async() =>{
        message.content = ".todo ooga";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith("List Added")
        // if we are testing for channel send then replace with message.channel.send
        })
    it("present list", async () => {
        message.content = ".list";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith("To Do List: " +"\n" + "1) ooga" +"\n");
        // if we are testing for channel send then replace with message.channel.send
    })
    it("remove from list", async () => {
        message.content = ".remove ooga";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith("Deleted");
        // if we are testing for channel send then replace with message.channel.send
    })
    it("creates goal list", async () => {
        message.content = ".creategoal booga";
        await messageHandler(message);
        expect(message.channel.send).toHaveBeenCalledWith("```Goal has been created. Type '.ls' to view a list of goals.```");
        // if we are testing for channel send then replace with message.channel.send
    })
    it("view list", async () => {
        message.content = ".ls";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith("Go Accomplish Them!");
        // if we are testing for channel send then replace with message.channel.send
    })
    it("views goal", async () => {
        message.content = ".viewgoal booga";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith( "Go Accomplish This!");
        // if we are testing for channel send then replace with message.channel.send
        })
    it("deletes a goal", async () => {
        message.content = ".rmgoal booga";
        await messageHandler(message);
        expect(message.channel.send).toHaveBeenCalledWith("```Type '.ls' to view a list of goals.```");
        // if we are testing for channel send then replace with message.channel.send
    })
    it("github", async () => {
        message.content = ".github";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith(".github <pullrq or issues> owner repo");
        // if we are testing for channel send then replace with message.channel.send
    })
    it("add supp list", async () => {
        message.content = ".request nooga";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith( "Support Request Item Added");
        // if we are testing for channel send then replace with message.channel.send
    })
    it("see supp list", async () => {
        message.content = ".reqlist";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith( "What to do?");
        // if we are testing for channel send then replace with message.channel.send
    })
    it("see supp info", async () => {
        message.content = ".reqinfo";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith( "Info Presented");
        // if we are testing for channel send then replace with message.channel.send
    })
});
