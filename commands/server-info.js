module.exports = {
	name: 'server-info',
	description: 'Display info about this server.',
	guildOnly: true,
	execute(message, args, serverEmbed) {
		serverEmbed
			.setColor('#0099ff')
			.setTitle('Server Information')
			.addField('Server Name', message.guild.name)
			.addField('Owner', message.guild.owner)
			.addField('Member Count', message.guild.memberCount)
			// Doesn't work  .addField('Number of Roles', message.guild.roles.cache)

		message.channel.send(serverEmbed);
	},
};