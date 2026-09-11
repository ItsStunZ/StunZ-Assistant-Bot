const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const logs  = require('./modules/logs.js');

// Client
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
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

client.login(token);
module.exports = { client };

logs.send(client, 'Test', 'description', 'test@stunz');