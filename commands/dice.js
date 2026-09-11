const MIN_NUMBER = 1;
const MAX_NUMBER = 6;

module.exports = {
    execute(message) {
        const randomNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
        message.reply(`${message.author.displayName} rolled the dice and got ${randomNumber}`);
    },

    name: "roll",
    description: ".roll [predicted number] use: .roll or .roll 2 (2 being the number you think the dice will land on)",
    // disabled: true
}