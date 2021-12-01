const { group, test, command, beforeStart, afterAll, expect } = require("corde");
// You can also import const corde = require("corde"); This is a default export with all others
// functions.
const { client, loginBot } = require("../Accord Bot/Accord.js");

beforeStart(() => {
    loginBot();
});

group("main commands", () => {
    test("ping command should return pong", () =>{
        expect("ping").toReturn("pong")
    })
})