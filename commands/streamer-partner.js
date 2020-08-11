module.exports = {
  name: "streamer-partner",
  description:
    "Shows information for streamer about how to partner with the server.",
  guildOnly: true,
  execute(message, args, streamerEmbed) {
    streamerEmbed
      .setColor("#3ced48")
      .setTitle("Streamer Partnership Requirements")
      .setDescription(
        "Here are the requirements we have to become a partner with us. DM Murdoc Niccals for more information."
      )
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "**__Requirements__**",
          value:
            "- Must adhere to the Twitch Terms of Service.\n - Must not be NSFW focused.\n - The main language of the stream must be English.\n - Must not have more than 5 partners.\n - Must stream at least 3 times a week.",
        },
        {
          name: "**__And additional the server must__**",
          value:
            "- Minimum 50 followers with at least 10 average viewers.\n - Must follow the Twicth Community Guidelines.\n - Have a partner command in your chat.\n - Have the PTF Twitch channel on your automatic host list.",
        },
        {
          name: "**__Perks__**",
          value:
            "- A special role for you on this server.\n - Your channel posted in this channel.\n - We'll have your channel on our automatic host list.",
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(streamerEmbed);
  },
};
