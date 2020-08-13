module.exports = {
  name: "embed",
  description: "Creates an embed.",
  guildOnly: true,
  execute(message, args, exampleEmbed) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      let embedContent = message.content.substring(8);
      exampleEmbed
        .setColor("#3ced48")
        .setDescription(embedContent)
        .setTimestamp()
        .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

      message.channel.send(exampleEmbed);
    }
  },
};
