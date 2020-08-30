module.exports = {
  name: "help_help",
  description: `embed for >>help help`,
  execute(message, args, help_helpEmbed) {
    help_helpEmbed.setColor("3ced48").setTitle("Helpful Commands").addFields(
      {
        name: "`>>embed [message]`",
        value: "Creates a embed with your message.",
      },
      {
        name: "`>>help`",
        value: "Shows the help embed",
      },
      {
        name: "`>>faq`",
        value: "Bot replies with the server FAQ's.",
      },
      {
        name: "`>>regions`",
        value: "Embed with region reactions which give roles.",
      },
      {
        name: "`>>reload [command]`",
        value: "Reloads the command mentioned.",
      },
      {
        name: "`>>rules`",
        value: "Shows the first page of the server rules.",
      },
      {
        name: "`>>rules2`",
        value: "Shows the second page of the server rules.",
      }
    );

    message.channel.send(help_helpEmbed);
  },
};
