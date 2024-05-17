const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const UserProfile = require('../../models/User');

module.exports = {
    name: 'gamble',
    description: 'Judi!!',
    options: [{
        name: 'jumlah',
        description: 'Jumlah yang mau dipertaruhkan',
        type: ApplicationCommandOptionType.Number,
        required: true,
    }],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            await interaction.reply({
                content: 'You can only do this in a server',
                ephemeral: true,
            });
            return;
        }

        const amount = interaction.options.getNumber('jumlah');
        if (amount < 500) {
            await interaction.reply('Kamu harus bertaruh minimal 500');
            return;
        }

        let userProfile = await UserProfile.findOne({
            userId: interaction.user.id,
        });

        if (!userProfile) {
            userProfile = new UserProfile({
                userId: interaction.user.id,
                balance: 0, // Pastikan untuk memberikan nilai awal balance
            });
        }

        if (amount > userProfile.balance) {
            await interaction.reply('Kamu tidak punya cukup uang untuk melakukannya.');
            return;
        }

        const didWin = Math.random() > 0.5;
        if (!didWin) {
            userProfile.balance -= amount;
            await userProfile.save();
            await interaction.reply('Kamu tidak memenangkan taruhan ini...');
            return;
        }

        const amountWin = Math.floor(amount * (Math.random() + 0.55));
        userProfile.balance += amountWin;
        await userProfile.save();
        await interaction.reply(`Kamu memenangkan ${amountWin}\nTotal uang kamu sekarang ${userProfile.balance}`);
    },
};
