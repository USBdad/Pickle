const { Events, EmbedBuilder } = require("discord.js");
const config = require('../config');
const filter = require('../jsons/filter.json')

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client, interaction) {

        if (message.author.bot) return;
        if (message.content.includes('fban'))  {
        
        const args = message.content.split(' ');
        const user = message.mentions.users.first() || client.users.cache.get(args[1]);
        const reason = args.slice(2).join(' ') || '\`\`Reason for ban not given\`\`';

        if (filter.words.includes(reason)) return message.reply({ content: `${client.config.filterMessage}`, ephemeral: true});
        
        if (!user) return message.reply({ content: 'Please mention a user to ban.', ephemeral: true });
        
        const bonEmbed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} ban command`})
        .setTitle(`> ${config.modEmojiHard}  Ban command ${config.arrowEmoji}`)
        .setColor(config.embedModHard)
        .addFields({ name: 'User', value: `> ${user.tag}`, inline: true })
        .addFields({ name: 'Reason', value: `> ${reason}`, inline: true })
        .setFooter({ text: `Someone got struck by the ban hammer` })
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        
        return message.reply({ embeds: [bonEmbed]});
        
        }
    },
}