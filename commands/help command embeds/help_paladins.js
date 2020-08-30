module.exports = {
  name: "help_paladins",
  description: `embed for >>help paladins`,
  execute(message, args, help_paladinsEmbed) {
    help_paladinsEmbed
      .setColor("3ced48")
      .setTitle("Paladins Stats Commands")
      .addFields(
        {
          name: "`>>phelp`",
          value: "Shows paladins stats help embed.",
        },
        {
          name: "`>>pstats [ign]`",
          value: "Shows the player's Paladins stats.",
        },
        {
          name: "`>>pchampions [ign]`",
          value: "Shows the player's top 5 champions.",
        },
        {
          name: "`>>pleaderboard`",
          value:
            "Shows a leaderboard of player's that has used `>>pstats [ign]`.",
        }
      );

    message.channel.send(help_paladinsEmbed);
  },
};
