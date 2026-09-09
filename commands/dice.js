const MIN_NUMBER = 1;
const MAX_NUMBER = 6;

module.exports = {
    execute(message) {
        const randomNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
        message.reply(`${message.author.displayName} rolled the dice and got ${randomNumber}`);
    },

    name: "roll",
    description: "Roll a dice to get a number from 1 - 6"
}