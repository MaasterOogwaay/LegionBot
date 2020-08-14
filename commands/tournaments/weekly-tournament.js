module.exports = {
  name: "weekly-tournament",
  description: "Information about the PTF Weekly Tournament.",
  guildOnly: true,
  execute(message, args, weeklyEmbed) {
    weeklyEmbed
      .setColor("#3ced48")
      .setTitle("PTF Weekly Tournament")
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "**__About__**",
          value:
            "The PTF Weekly Tournament is a new tournament coming to the PTF server. It's our second tournament solely run by the server staff.",
        },
        {
          name: "**__What is it?__**",
          value:
            "The new weekly tournament is for players that don't have a team so they can't compete in the main bi-weekly tournament. This new tournament will be run weekly and will give players a chance to play in a tournament environment and possibly play in the PTF Bi-Weekly Tournament if their team chooses to stick together.",
        },
        {
          name: "**__How it works__**",
          value:
            "- When the tournament is announced, players can react to the message which will put their name into the pool.\n - As players register we'll put them into teams.\n - Teams will have an opportunity to train during the week.\n - Each team will be asked to check in 15mins before their match\n - The tournament will run the same as the bi-weekly tournament.",
        },
        {
          name: "**__Additional info__**",
          value:
            "- It's only for fun\n - It's possible you'll be matched with/against higher elo players\n - Rules are the same as the bi-weekly tournament. They can be found here: #solos-rules \n - If you any other questions just ask or DM ModMail.",
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(weeklyEmbed);
  },
};
