module.exports = {
  name: "args-info",
  description: "Information about the arguments provided.",
  args: true,
  guildOnly: true,
  execute(message, args) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      if (args[0] === "foo") {
        return message.channel.send("bar");
      }

      message.channel.send(`First argument: ${args[0]}`);
    }
  },
};
