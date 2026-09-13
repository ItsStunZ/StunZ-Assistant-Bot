// Title -> User name
// Picture -> User picture
// Description -> The log description eg. someone joining vc
// Footer -> User id

const { EmbedBuilder } = require('discord.js')
const Config = require('../config.json');

const colors = {
    "primary": "#3498DB",
    "success": "#57F287",
    "error": "#ED4245"
}

module.exports = {
    async send(client, args) {
        const logEmbed = new EmbedBuilder()
            .setTitle(args.title || '?')
            .setDescription(args.description || '?')


        // add options (args)
        // color
        if (args.color && colors[args.color]) {
            logEmbed.setColor(colors[args.color]);
        }
        // image
        if (args.image) {
            logEmbed.setThumbnail(args.image);
        }
        // user id
        if (args.userId) {
            logEmbed.setFooter({ text: `ID: ${args.userId}` });
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