module.exports = {
  name: "phelp",
  description: "Shows the commands for Paladins stats.",
  guildOnly: true,
  execute(message, args, phelpEmbed) {
    phelpEmbed
      .setColor("#3ced48")
      .setAuthor("Paladins Team Finder", message.guild.iconURL())
      .setDescription("Hi, I am here to help!")
      .addFields(
        {
          name: "`>>phelp`",
          value: "Shows this page",
        },
        {
          name: "`>>pstats ign`",
          value:
            "Replace `ign` in the command with your Paladins name to see your stats and possibly add your account to the leaderboard",
        },
        {
          name: "`>>pchampions ign`",
          value:
            "Replace `ign` in the command with your Paladins name to see your top 5 champion stats",
        },
        {
          name: "`>>pleaderboard`",
          value: "View the leaderboard of everyone who has done `>>pstats`",
        },
        {
          name: "How is my leaderboard position calculated?",
          value: "(Wins * Level) - (Losses * Level) = Total\n `* = Multiply` ",
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(phelpEmbed);
  },
};
