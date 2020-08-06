module.exports = {
	name: 'beep',
	description: 'Beep!',
	guildOnly: true,
	execute(message, args) {
		message.channel.send('Boop.');
	},
};