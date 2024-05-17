const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'server-info',
    description: 'Info server ini',
    callback: async (client, interaction) => {
      try {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: 'Kamu hanya bisa menjalankan perintah ini di dalam server.',
                ephemeral: true,
            });
            return;
        }

        const { guild } = interaction;
        const owner = await guild.fetchOwner();
        const textChannels = guild.channels.cache.filter((c) => c.type === 0);
        const numberOfTextChannels = textChannels.size.toString();
        const voiceChannels = guild.channels.cache.filter((c) => c.type === 2);
        const numberOfVoiceChannels = voiceChannels.size.toString();
        const categoryChannels = guild.channels.cache.filter((c) => c.type === 4);
        const numberOfcategoryChannels= categoryChannels.size.toString();

        const roles = guild.roles.cache.filter(role => role.name !== '@everyone');

        const serverInfoEmbed = new EmbedBuilder()
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ size: 32 }) })
            .addFields(
                { name: 'Pemilik', value: owner.user.username, inline: true },
                { name: 'Text Channels', value: numberOfTextChannels, inline: true },
                { name: 'Voice Channels', value: numberOfVoiceChannels, inline: true },
                { name: 'Category Channels', value: numberOfcategoryChannels, inline: true },
                { name: 'Anggota', value: guild.memberCount.toString(), inline: true },
                { name: 'Roles', value: (roles.size).toString(), inline: true },
                { name: 'Daftar Roles', value: roles.map(role => role.name).join(', ') }
            )
            .setFooter({ text: `${guild.id} | Dibuat pada: ${guild.createdAt.toDateString()}` });

        interaction.reply({ embeds: [serverInfoEmbed] });
      } catch (error) {
        console.log(error);
      }
    },
};
