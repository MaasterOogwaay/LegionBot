module.exports = {
  name: "server-partner",
  description: "Shows information on how to become a partner.",
  guildOnly: true,
  execute(message, args, partnerEmbed) {
    partnerEmbed
      .setColor("#3ced48")
      .setTitle("Server Partnership Requirements")
      .setDescription(
        "Here are the requirements we have to become a partner with us. DM Murdoc Niccals for more information."
      )
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "**__Requirements__**",
          value:
            "- Must adhere to the Discord Terms of Service.\n - Must not be NSFW focused.\n - The main language of the server must be English.\n - Must not have more than 15 partners.",
        },
        {
          name: "**__And additional the server must__**",
          value:
            "- Minimum 150 total members with at least 75 members online at all times.\n - Must follow the Discord Community Guidelines.\n - The partners channel must be somewhere near the top of your server.",
        },
        {
          name: "**__Perks__**",
          value:
            "- A special role for you on this server.\n - Your server posted in this channel.",
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(partnerEmbed);
  },
};
