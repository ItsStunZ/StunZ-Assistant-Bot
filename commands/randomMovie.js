const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events, ModalBuilder, LabelBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { client } = require('../index.js');
const Config = require('../config.json');

const commandName = "random_movie"

const categories = {
    "Action": 28,
    "Animation": 16,
    "Comedy": 35,
    "Drama": 18,
    "Horror": 27,
    "Romance": 10749
};
const languages = {
    "English": "en"
}

module.exports = {
    async execute(message) {
        // send button
        await message.reply({ components: [createButton()] });
    },

    name: commandName,
    description: "Choose a category and language to receive a random movie",
    // disabled: true
}

client.on(Events.InteractionCreate, async (interaction) => {

    // Get movie button
    if (interaction.customId === 'getmovie') {
        // create and prompt modal
        const modal = createModal();
        await interaction.showModal(modal);
    }
    // Show movie modal submit
    if (interaction.customId === 'moviemodal') {
        // Retrieve data from modal
        try {
            const category = interaction.fields.getStringSelectValues('categorySelect');
            const language = interaction.fields.getStringSelectValues('languageSelect');

            if (category && language) {
                const randomMovie = await getRandomMovie(category, language);
                console.log(randomMovie);
                const movieEmbed = createEmbed(randomMovie);
                interaction.reply({ embeds: [movieEmbed] });
            }
        } catch(error) {
            console.error(error);
        }
    }

})

function createModal() {
    // prompt modal to get category and langugage
    const modal = new ModalBuilder().setCustomId('moviemodal').setTitle('Movie Options')

    const categoryOptions = Object.entries(categories).map(([category, id]) => {
        return new StringSelectMenuOptionBuilder()
            .setLabel(category)
            .setValue(id.toString());
    })

    const languageOptions = Object.entries(languages).map(([language, id]) => {
        return new StringSelectMenuOptionBuilder()
            .setLabel(language)
            .setValue(id.toString());
    })

    const categorySelect = new StringSelectMenuBuilder()
        .setCustomId('categorySelect')
        .setPlaceholder(Object.keys(categories)[0])
        .setRequired(true)
        .addOptions(categoryOptions);

    const categoriesLabel = new LabelBuilder()
        .setLabel('Choose a category')
        .setStringSelectMenuComponent(categorySelect);

    const languageSelect = new StringSelectMenuBuilder()
    .setCustomId('languageSelect')
    .setPlaceholder(Object.keys(languages)[0])
    .setRequired(true)
    .addOptions(languageOptions);

    const languageLabel = new LabelBuilder()
        .setLabel('Choose a Language')
        .setStringSelectMenuComponent(languageSelect);

    modal.addLabelComponents(categoriesLabel, languageLabel);

    return modal;
}

async function getRandomMovie(category, language) {
    const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${category}&with_original_language=${language}`,
            {
                headers: {
                    Authorization: `Bearer ${Config.tmdb_api_key}`,
                    accept: "application/json"
                }
            }
        );

    if (response) {
        const data = await response.json();
        const movie = data.results[Math.floor(Math.random() * data.results.length)];
        return movie;
    } else {
        console.log('Could not get a response for command randomMovie');
    }
}

function createEmbed(data) {
    const movieEmbed = new EmbedBuilder()
        .setTitle(data.title)
        .setDescription(data.overview)
        .setImage(`https://image.tmdb.org/t/p/w500${data.poster_path}`)
        .setFooter({ text: 'Provided by themoviedb.org' });

    return movieEmbed;
}

function createButton() {
    const button = new ButtonBuilder()
        .setCustomId('getmovie')
        .setLabel('Get Movie')
        .setStyle(ButtonStyle.Primary)
    
    const row = new ActionRowBuilder()
        .addComponents(button);
    
    return row;
}