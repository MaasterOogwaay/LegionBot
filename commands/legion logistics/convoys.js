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
          value: "24th October 2020",
          inline: true,
        },
        {
          name: "**__Distance__**",
          value: "1,027km",
          inline: true,
        },
        {
          name: "**__Server__**",
          value: "Simulation 1",
          inline: true,
        },
        {
          name: "**__Meet up/Departure__**",
          value: "`-` 4pm BST\n `-` LKW, Hamburg",
          inline: true,
        },
        {
          name: "**__Destination__**",
          value: "Quarry, Prague",
          inline: true,
        },
        // {
        //   name: "**__Confirm your attendence here__**",
        //   value: "[Click here to confirm](https://ets2c.com/)",
        // },
        {
          name: "**__Convert to your timezone__**",
          value: "[Convert here!](https://www.thetimezoneconverter.com/)",
        }
      )
      .setImage("https://imgur.com/JzgdxkT.png")
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(convoyEmbed);
  },
};
