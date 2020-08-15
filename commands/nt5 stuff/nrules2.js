module.exports = {
  name: "nrules2",
  description: "List all of the servers rules.",
  guildOnly: true,
  execute(message, args, nrules2Embed) {
    nrules2Embed
      .setColor("#3ced48")
      .addFields(
        {
          name:
            "**__Don't spam, use affiliate links or promote other servers.__**",
          value:
            "-  Spam of any kind, in any channel, will not be tolerated. This includes;\n - spamming emojis or bot commands\n - unwanted DMs\n - mass mentioning the server\n - promotional/affiliate links.\n *Links to YouTube and Twitch channels are allowed in #share-clips*",
        },
        {
          name: "**__Use the appropriate channels__**",
          value:
            "- Put your message in the appropriate channel. Staff may ask you to move if in the wrong channel\n *We're not telling you to, just asking you to try put your message in the correct channel*",
        },
        {
          name: "**__If you need help/support with anything__**",
          value:
            "- You can get support by asking for help in #need-help.\n - If the problem urgently needs to be fixed, DM a member of staff.",
        },
        {
          name: "**__Staff have final say__**",
          value:
            "- If the staff member decides to mute,kick/ban or delete your message, it is final. Fighting the decision won't change the outcome.",
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(nrules2Embed);
  },
};
