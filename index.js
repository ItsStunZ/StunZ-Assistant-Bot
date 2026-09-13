const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const logs = require('./modules/logs.js');

// Client
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
]});

// Events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Voice channel join/leave
client.on(Events.VoiceStateUpdate, async (oldState, newState) => {

    // User joins a voice channel
    if (!oldState.channel && newState.channel) {
        // Get channel id
        const voiceChannel = await client.channels.fetch(newState.channelId)
        const user = newState.member;

        // Send a log
        logs.send(client, {
            title: user.displayName,
            description: `${user} joined voice channel <${voiceChannel}>`,
            color: 'success',
            image: user.displayAvatarURL(),
            userId: user.id
        })

        return;
    }

    // user switches voice channel
    if (oldState.channel && newState.channel && oldState.channelId !== newState.channelId) {
        // Get channel id
        const oldVoiceChannel = await client.channels.fetch(oldState.channelId)
        const newVoiceChannel = await client.channels.fetch(newState.channelId)
        const user = newState.member;

        // Send a log
        logs.send(client, {
            title: user.displayName,
            description: `${user} switched from voice channel <${oldVoiceChannel}> to <${newVoiceChannel}>`,
            color: 'primary',
            image: user.displayAvatarURL(),
            userId: user.id
        })

        return;
    }

    // User leaves a channel
    if (oldState.channel) {
        // Get channel id
        const oldVoiceChannel = await client.channels.fetch(oldState.channelId)
        const user = newState.member;

        // Send a log
        logs.send(client, {
            title: user.displayName,
            description: `${user} left voice channel <${oldVoiceChannel}>`,
            color: 'error',
            image: user.displayAvatarURL(),
            userId: user.id
        })

        return;
    }
})

client.login(token);
module.exports = { client };