module.exports = {
    name: 'rules',
    description: 'List all of the servers rules.',
    guildOnly: true,
	execute(message, args, rulesEmbed) {
        rulesEmbed
            .setColor('#0099ff')
            .setTitle('Server Rules')
            .setDescription('Here are the rules in this server')
            .setThumbnail('https://i.imgur.com/ViRCIyJ.png')
            .addFields(
                { name: 'Im a sneaky snake', value: 'blah blah\n blah blah' },
            )
            .setTimestamp('')
            .setFooter('');
        
        message.channel.send(rulesEmbed);

	},
};