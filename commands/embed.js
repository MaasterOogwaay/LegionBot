module.exports = {
	name: 'embed',
    description: 'Creates an embed.',
    guildOnly: true,
	execute(message, args, exampleEmbed) {
        let embedContent = message.content.substring(8);
        exampleEmbed
            .setColor('#0099ff')
            .setDescription(embedContent)
           
        message.channel.send(exampleEmbed);

	},
};