module.exports = {
  name: "rules2",
  description: "List all of the servers rules.",
  guildOnly: true,
  execute(message, args, rules2Embed) {
    rules2Embed
      .setColor("#3ced48")
      .addFields(
        {
          name:
            "**__Don't spam, use affiliate links or promote other servers.__**",
          value:
            "-  Spam of any kind, in any channel, will not be tolerated. This includes;\n - spamming emojis or bot commands\n - unwanted DMs\n - mass mentioning the server\n - promotional/affiliate links.\n *Links to YouTube and Twitch channels are allowed in #content-creators*",
        },
        {
          name: "**__Use the appropriate channels__**",
          value:
            "- Put your message in the appropriate channel. Staff may ask you to move if in the wrong channel\n *We're not telling you to, just asking you to try put your message in the correct channel*",
        },
        {
          name: "**__If you need help/support with anything__**",
          value:
            "- You can get support by DMing ModMail. Info can be found in #support.\n - If the problem urgently needs to be fixed, DM a member of staff.",
        },
        {
          name: "**__Cheating__**",
          value:
            "- The selling, trading and/or advertising of any hacks/cheats/accounts will result in an instant warn or ban.",
        },
        {
          name: "**__Staff have final say__**",
          value:
            "- If the staff member decides to mute,kick/ban or delete your message, it is final. Fighting the decision won't change the outcome.",
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(rules2Embed);
  },
};
