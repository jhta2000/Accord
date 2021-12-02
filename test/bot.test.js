const {messageHandler} = require("../Accord Bot/Accord")


describe("Message Handler", () => {
    //these are our message properties
    const message = ({
        channel: {
            send: jest.fn()
        },
        content: "",
        reply: jest.fn(),
        author: {
            bot: false,
        },
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("it should send pong", async() =>{
        message.content = ".ping";
        await messageHandler(message);
        expect(message.reply).toHaveBeenCalledWith("pong")
        // if we are testing for channel send then replace with message.channel.send
    })
});
