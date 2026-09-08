const fs = require('node:fs');
const path = require('node:path');
const { EmbedBuilder } = require('discord.js');
const Config = require('../config.json');

module.exports = {
    execute(message) {
        // Loop over all commands
        // Get a list of all command names
        // reply with the list

        // create the embed message
        const commandsEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('All Command')
            .setDescription(`A list of all available commands. Begin a command with the prefix '${Config.prefix}' followed by the command`)

        // get all command files
        const commandFiles = fs.readdirSync(__dirname).filter((file) => file.endsWith('.js'));

        // get all command names and add to commands list
        for (const file of commandFiles) {
            const filePath = path.join(__dirname, file);
            const command = require(filePath);

            const commandName = command.name;

            if (commandName) {
                commandsEmbed.addFields({ name: `${Config.prefix}${commandName}`, value: command.description ? command.description : ""});
            }
        }

        message.channel.send({ embeds: [commandsEmbed] });
    },

    name: "commands",
    description: "Get a list of all available commands"
}