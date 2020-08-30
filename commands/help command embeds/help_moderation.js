module.exports = {
  name: "help_moderation",
  description: `embed for >>help moderation`,
  execute(message, args, help_moderationEmbed) {
    help_moderationEmbed
      .setColor("3ced48")
      .setTitle("Moderation Commands")
      .addFields(
        {
          name: "`>>ban [member]`",
          value: "Bans a member from the server.",
        },
        {
          name: "`>>clear [count]`",
          value: "Clears the amount of messages specified.",
        },
        {
          name: "`>>kick [member]`",
          value: "Kicks a member from the server.",
        },
        {
          name: "`>>tempmute [member] [time]`",
          value: "Mutes a member for the duration you specified.",
        },
        {
          name: "`>>warn [member] [reason]`",
          value: "Warns a member.",
        }
      );

    message.channel.send(help_moderationEmbed);
  },
};
