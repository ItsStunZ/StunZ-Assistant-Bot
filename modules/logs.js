// ! Not for use. Needs working on
// Title -> User name
// Picture -> User picture
// Description -> The log description eg. someone joining vc
// Footer -> User id

const { EmbedBuilder } = require('discord.js')
const Config = require('../config.json');

module.exports = {
    async send(client, title, description, userId) {
        console.log(client.channels);
        const logEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(title)
            .setDescription(description)
            .setFooter({ text: `ID: ${userId}` });

        try {
            const logsChannel = await client.channels.cache.get(Config.logs_channel_id);
            if (logsChannel) {
                await logsChannel.send({ embeds: [logEmbed] });
            } else {
                console.log(`Could not find logs channel`);
            }
        } catch(error) {
            console.error(error);
        }
    }
}