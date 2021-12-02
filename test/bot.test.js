const {messageHandler} = require("../Accord Bot/Accord")


describe("Message Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("it should send pong", async() =>{
        const message = ({
            content: "",
            reply: jest.fn(),
            author: {
                bot: false
            }
        });
        message.content = ".ping";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith("pong")
        // if we are testing for channel send then replace with message.channel.send
    })
    it("it should send out a message saying goal has been created", async() => {
        message.content=".creategoal bill";
        await messageHandler(message);
        expect(message.channel.send).toHaveBeenCalledWith("```Goal has been created. Type '.ls' to view a list of goals.```")
    })
});
