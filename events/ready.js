const { Events } = require("discord.js");
const logs = require('../modules/logs.js')

module.exports = {
    execute(client) {
        // Log the bot came online
        // logs.send(client, {
        //     title: 'Bot Status',
        //     description: `Ready! ${client.user.tag} is now online ✅`,
        // });
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
    
    name: Events.ClientReady,
    once: true
}