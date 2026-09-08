const { Events } = require("discord.js");

module.exports = {
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
    
    name: Events.ClientReady,
    once: true
}