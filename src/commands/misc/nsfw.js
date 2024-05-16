
module.exports = {
 
    name:'secret',
    description: 'secret document only for Master',
    // devOnly: Boolean,
    // testOnly: true,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
        if (client.user.id === '717576420037230623') {
          const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Secret Document')
            .setURL('https://example.com/secret-document.pdf')
            .setDescription('This is a secret document only for Master.')
            .setThumbnail('https://example.com/secret-document-thumbnail.png')
            .setImage('https://example.com/secret-document-image.png');
    
          interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply(`You are not authorized to view this document.`);
        }
      },
  };