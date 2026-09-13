const Config = require('../config.json')

const commandName = '8ball'
const responses = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes – definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
]

module.exports = {
    execute(message) {
        const messageContent = message.content
        // check if a message exists after command and is at least 3 words or more
        const isValid = messageContent.split(Config.prefix)[1].split(commandName)[1].split(' ').length >= 3;

        if (isValid) {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            message.reply(randomResponse);
        }
    },

    name: commandName
}