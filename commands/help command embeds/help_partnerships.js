module.exports = {
  name: "help_partnerships",
  description: `embed for >>help partnerships`,
  execute(message, args, help_partnershipsEmbed) {
    help_partnershipsEmbed
      .setColor("3ced48")
      .setTitle("Partnership Commands")
      .addFields(
        {
          name: "`>>server-partner`",
          value:
            "Shows information for server owners on how to partner with PTF.",
        },
        {
          name: "`>>streamer-partner`",
          value: "Shows information for streamers on how to partner with PTF.",
        }
      );

    message.channel.send(help_partnershipsEmbed);
  },
};
