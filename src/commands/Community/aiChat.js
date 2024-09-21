const { SlashCommandBuilder } = require('discord.js');
const { ApexChat } = require('apexify.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Generate AI chat response')
    .addStringOption(option => option.setName('prompt').setDescription('The prompt for GPT').setRequired(true))
    .addStringOption(option => option.setName('modal').setDescription('The modal to use')
    .addChoices(
            {name: "v3-32k", value: "v3-32k"},
            {name: "turbo", value: "turbo"},
            {name: "apexChat", value: "apexChat"},
            {name: "starChat", value: "starChat"},
            {name: "check docs", value: "check docs"}).setRequired(false)),
    async execute(interaction) {

        await interaction.deferReply();
        const modal = interaction.options.getString('modal') || "turbo";
        const prompt = interaction.options.getString('prompt');
        const userId = interaction.user.id;

        try {
            const response = await ApexChat(modal, prompt, {
                userId: userId,
                memory: false,
                instruction: ""
            });

            await interaction.editReply({ content: `${response}` });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `An error occurred while generating your response. Please try again later.`, ephemeral: true });
        }
    },
};
