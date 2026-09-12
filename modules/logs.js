// Title -> User name
// Picture -> User picture
// Description -> The log description eg. someone joining vc
// Footer -> User id

const { EmbedBuilder } = require('discord.js')
const Config = require('../config.json');

module.exports = {
    async send(client, args) {
        const logEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(args.title || '?')
            .setDescription(args.description || '?')
            .setFooter({ text: `ID: ${args.userId || '?'}` });

        // Add any extras (e.g image)
        if (args.image) {
            logEmbed.setImage(args.image);
        }

        try {
            const logsChannel = await client.channels.fetch(Config.logs_channel_id);
            if (logsChannel) {
                console.log('Found channel ✅')
                await logsChannel.send({ embeds: [logEmbed] });
            } else {
                console.log(`Could not find logs channel`);
            }
        } catch(error) {
            console.error(error);
        }
    }
}