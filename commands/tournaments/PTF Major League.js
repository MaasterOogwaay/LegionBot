module.exports = {
  name: "major-league",
  description: "Information about the PTF Major League.",
  guildOnly: true,
  execute(message, args, majorEmbed) {
    majorEmbed
      .setColor("#3ced48")
      .setTitle("PTF Major League")
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "**__About__**",
          value:
            "The PTF Major League is a tournament designed for players ranged from Diamond to Grand Masters. It's solely run by the staff of the PTF server.",
        },
        {
          name: "**__What is it?__**",
          value:
            "The tournament is for teams ranked Diamond-Grand Master. It is a way for teams to come and compete against each other in a tournament setting. Look at it as scrims or training for your team.",
        },
        {
          name: "**__How it works__**",
          value:
            "- The tournament is announced shortly after the last tournaments end.\n - Teams can enter by putting their name, region and roster in #teams using the example in the pinned message.\n - On the day of the tournament, a bracket will be announced showcasing which teams are facing each other\n - Each team will be asked to check in 15mins before their match\n - Each team picks a map to ban then a coin is flipped. The winner chooses map pick or first pick\n - The lobby is created and an ign is given to the commentators to spectate\n - Matches are Bo3 with the finals being Bo5",
        },
        {
          name: "**__Additional info__**",
          value:
            "- It's only for fun\n - It's possible you'll be match against a team higher ranked than yours\n - The rules can be found in #tournament-rules\n - If you any other questions just ask or DM ModMail.",
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(majorEmbed);
  },
};
