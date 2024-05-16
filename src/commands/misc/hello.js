module.exports = {
    name: 'hello',
    description: 'Lest be a friend!',
    // devOnly: Boolean,
    // testOnly: true,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
      interaction.reply(`Hello Nice to meet you, ${interaction.user}!`);
    },
  };