const fs = require('node:fs');
const path = require('node:path');
const { Events } = require("discord.js");
const autoResponses = require('../autoResponses.json');
const Config = require("../config.json");

const AUTO_RESPONSE_CHANCE = 30; // 30% chance of triggering an auto response

module.exports = {
    execute(message) {
        if (message.author.bot) return;
        
        // Command handling
        if (message.content.startsWith(Config.prefix)) {
            // check for command in commands folder
            const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(__dirname, '..', 'commands', file);
                const command = require(filePath);
                // Check if message matches the command.name
                if (command.name === message.content.split(Config.prefix)[1].split(' ')[0]) {
                    // Check if command is disabled
                    if (command.disabled) {
                        message.reply("That command is currently disabled");
                        return;
                    }
                    
                    command.execute(message);
                    return;
                };
            };

            message.reply("No such command 😢");
        };

        // Auto responses handling
        for (const word in autoResponses) {
            if (message.content.toLowerCase().startsWith(word) &&
                Math.random() < (AUTO_RESPONSE_CHANCE / 100)) {
                message.reply(autoResponses[word][Math.floor(Math.random() * autoResponses[word].length)]);
            }
        }
    },

    name: Events.MessageCreate
}