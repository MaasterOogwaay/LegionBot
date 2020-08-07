module.exports = {
  name: "suggestion",
  description: "Creates suggestion embed with reactions.",
  guildOnly: true,
  execute(message, args, suggestionEmbed) {
    let embedContent = message.content.substring(12);
    suggestionEmbed
      .setColor("#0099ff")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle("I have a suggestion!")
      .setDescription(embedContent)
      .setTimestamp()
      .setFooter("Legion Bot", "https://i.imgur.com/ViRCIyJ.png");

    message.channel.send(suggestionEmbed);
  },
};
