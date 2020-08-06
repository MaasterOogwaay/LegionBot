module.exports = {
	name: 'regions',
    description: 'Creates a reactions role for regions.',
    guildOnly: true,
	execute(message, args, regionsEmbed) {
        regionsEmbed
            .setColor('#0099ff')
            .setTitle('React to obtain your region role')
            .setDescription("<:Asia:738860202350215274> - Asia\n" +
                             "<:Austrailia:738860185849692220> - Austrailia\n" +
                             "<:Brazil:738860282327072829> - Brazil\n" +
                             "<:EU:706557479647182999> - EU\n" +
                             "<:NA:738860129348223097> - NA");
           
        
        message.channel.send(regionsEmbed);

      
	},
};