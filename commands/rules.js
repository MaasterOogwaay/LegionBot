module.exports = {
  name: "rules",
  description: "List all of the servers rules.",
  guildOnly: true,
  execute(message, args, rulesEmbed) {
    rulesEmbed
      .setColor("#3ced48")
      .setTitle("Server Rules")
      .setDescription("Here are the rules in this server")
      .setThumbnail("https://i.imgur.com/ViRCIyJ.png")
      .addFields({ name: "Im a sneaky snake", value: "blah blah\n blah bluy" })
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(rulesEmbed);
  },
};
