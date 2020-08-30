module.exports = {
  name: "help_fun",
  description: `embed for >>help fun`,
  execute(message, args, help_funEmbed) {
    help_funEmbed.setColor("3ced48").setTitle("Fun Commands").addFields(
      {
        name: "`>>avatar [member]`",
        value: "Shows the avatar of the mentioned user",
      },
      {
        name: "`>>beep`",
        value: "Bot replies with Boop.",
      },
      {
        name: "`>>ping`",
        value: "Bot replies with Pong.",
      },
      {
        name: "`>>suggestion [your suggestion]`",
        value: "Bot creates an embed with your suggestion.",
      }
    );

    message.channel.send(help_funEmbed);
  },
};
