const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    AttachmentBuilder,
  } = require('discord.js');
  const canvacord = require('canvacord');
  const calculateLevelXp = require('../../utils/calculateLevelXp');
  const Level = require('../../models/Level');
  
  module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
      if (!interaction.inGuild()) {
        interaction.reply('You can only run this command inside a server.');
        return;
      }
  
      await interaction.deferReply();
  
      const mentionedUserId = interaction.options.get('target-user')?.value;
      const targetUserId = mentionedUserId || interaction.member.id;
      const targetUserObj = await interaction.guild.members.fetch(targetUserId);
  
      const fetchedLevel = await Level.findOne({
        userId: targetUserId,
        guildId: interaction.guild.id,
      });
  
      if (!fetchedLevel) {
        interaction.editReply(
          mentionedUserId
            ? `Maaf tuan ${targetUserObj.user.tag} belum memiliki level, coba lagi ketika dia telah naik level^^ .`
            : "Maaf tuan belum memiliki level,cobalah untuk berbicara aga level tuan naik^^."
        );
        return;
      }
  
      let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
        '-_id userId level xp'
      );
  
      allLevels.sort((a, b) => {
        if (a.level === b.level) {
          return b.xp - a.xp;
        } else {
          return b.level - a.level;
        }
      });
  
      let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;
      const { Font } = require('canvacord');
      Font.loadDefault();

      const rank= new canvacord.RankCardBuilder()
      .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
      .setRank(currentRank)
      .setLevel(fetchedLevel.level)
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(calculateLevelXp(fetchedLevel.level))
      .setUsername(targetUserObj.user.username)
      .setStatus(targetUserObj.presence.status)
      .setStyles({
        progressbar: {
             thumb: {
                  style: {
                       backgroundColor: "Pink",
                  },
             },
        },
   })
      .setTextStyles({
        level: "LEVEL:", 
        xp: "EXP:", 
        rank: "RANK:",
   });

   const image = await rank.build({ format: 'png',});
   const attachment = new AttachmentBuilder(image);
   await interaction.editReply({ files: [attachment] });
    },
  
    name: 'level',
    description: "Shows your/someone's level.",
    options: [
      {
        name: 'target-user',
        description: 'The user whose level you want to see.',
        type: ApplicationCommandOptionType.Mentionable,
      },
    ],
  };