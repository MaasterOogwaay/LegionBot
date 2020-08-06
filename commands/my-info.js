module.exports = {
    name: 'my-info',
    description: 'Shows some info on the author of the message.',
    guildOnly: true,
	execute(message, args, userEmbed) {
            userEmbed
                .setColor('#0099ff')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                 .setThumbnail(message.author.displayAvatarURL())
                .setTitle('User Info')
                .addField('User Name', message.author.tag)
                .addField('User ID', message.author.id)
                .addField('Account Created', message.author.createdAt.toLocaleString())
                        
             message.channel.send(userEmbed);
          
	},
};
// Add a feature so you can check the stats of other people