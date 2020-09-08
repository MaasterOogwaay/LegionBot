module.exports = {
  name: "convoys",
  description: "Information for the next convoy being held by Legion Logistics",
  execute(message, args, convoyEmbed) {
    convoyEmbed
      .setColor("#3ced48")
      .setTitle("Legion Logistics Convoy")
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "**__Date__**",
          value: "12th September 2020",
          inline: true,
        },
        {
          name: "**__Distance__**",
          value: "1,025km",
          inline: true,
        },
        {
          name: "**__Server__**",
          value: "Simulation 1",
          inline: true,
        },
        {
          name: "**__Meet up/Departure__**",
          value: "`-` 13:30 UTC\n `-` 14:00 UTC\n `-` Szczecin Poland",
          inline: true,
        },
        {
          name: "**__Destination__**",
          value: "Salzburg Austria",
          inline: true,
        }
      )
      .setImage("https://imgur.com/UvZHjMP.png")
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(convoyEmbed);
  },
};
