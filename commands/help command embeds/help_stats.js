module.exports = {
  name: "help_stats",
  description: `embed for >>help stats`,
  execute(message, args, help_statsEmbed) {
    help_statsEmbed.setColor("3ced48").setTitle("Stat Commands").addFields(
      {
        name: "`server-info`",
        value: "Shows information about the server.",
      },
      {
        name: "`>>stats [member]`",
        value: "Shows information about a member.",
      }
    );

    message.channel.send(help_statsEmbed);
  },
};
