module.exports = {
  name: "help",
  description: "Get help for my commands",
  execute(message, args, helpEmbed) {
    helpEmbed
      .setColor("#3ced48")
      .setAuthor("Legion Bot Commands", "https://imgur.com/Syb10i5.png")
      .setThumbnail("https://imgur.com/Syb10i5.png")
      .addFields(
        {
          name: "**Fun**",
          value: "`>>help_fun`",
          inline: true,
        },
        {
          name: "**Help**",
          value: "`>>help_help`",
          inline: true,
        },
        {
          name: "**Moderation**",
          value: "`>>help_moderation`",
          inline: true,
        },
        {
          name: "**Paladins**",
          value: "`>>help_paladins`",
          inline: true,
        },
        {
          name: "**Partnerships**",
          value: "`>>help_partnerships`",
          inline: true,
        },
        {
          name: "**Stats**",
          value: "`>>help_stats`",
          inline: true,
        }
      );

    return message.author
      .send(helpEmbed)
      .then(() => {
        if (message.channel.type === "dm") return;
        message.reply("I've sent you a DM with all my commands!");
      })
      .catch((error) => {
        console.error(
          `Could not send help DM to ${message.author.tag}.\n`,
          error
        );
        message.reply(
          "it seems like I can't DM you! Do you have DMs disabled?"
        );
      });
  },
};
