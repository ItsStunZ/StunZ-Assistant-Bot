const fs = require('node:fs');
const path = require('node:path');
const { Events } = require("discord.js");
const Config = require("../config.json");

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
                if (command.name === message.content.split('.')[1]) {
                    command.execute(message);
                };
            };
        };

        // 67 BS
        if (message.content === '67') {
            message.reply('https://c.tenor.com/rCYUbYiuSqYAAAAC/tenor.gif');
        }
    },

    name: Events.MessageCreate
}