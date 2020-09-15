module.exports = {
  name: "externalconvoys",
  description: "Information for a convoy being held by other VTC's",
  execute(message, args, externalconvoysEmbed) {
    externalconvoysEmbed
      .setColor("#3ced48")
      .setTitle("CTL Celebration Convoy")
      .setDescription(
        "All information shown is temporary and may change in the future.\n `TBD` means To Be Decided."
      )
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "**__Date__**",
          value: "26th or 27th September 2020",
          inline: true,
        },
        {
          name: "**__Distance__**",
          value: "TBD",
          inline: true,
        },
        {
          name: "**__Server__**",
          value: "TBD",
          inline: true,
        },
        {
          name: "**__Meet up/Departure__**",
          value: "`-` 14:00 UTC\n `-` 15:00 UTC\n `-` Calais FERRY",
          inline: true,
        },
        {
          name: "**__Destination__**",
          value: "Mannheim Quarry",
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(externalconvoysEmbed);
  },
};
