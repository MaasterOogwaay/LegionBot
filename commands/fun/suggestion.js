module.exports = {
  name: "suggestion",
  description: "Creates suggestion embed with reactions.",
  guildOnly: true,
  execute(message, args, suggestionEmbed) {
    let embedContent = message.content.substring(12);
    suggestionEmbed
      .setColor("#3ced48")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle("I have a suggestion!")
      .setDescription(embedContent)
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(suggestionEmbed);
  },
};
