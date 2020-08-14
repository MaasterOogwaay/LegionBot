module.exports = {
  name: "warn",
  description: "Warns a user",
  guildOnly: true,
  execute(message, args, warnEmbed) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      if (message.content.startsWith(">>warn")) {
        var member = message.guild.member(
          message.mentions.users.first() ||
            message.guild.members.chache.get(args[0])
        );
        if (!member) return message.reply("Please provide a member to warn.");

        let reason = args[1];
        if (!reason) {
          return message.reply("You didn't give a reason.");
        }

        warnEmbed
          .setColor("#3ced48")
          .setDescription(`${member} has been warned`)
          .addField("\u200B", `Reason: ${reason}`)
          .setTimestamp();

        message.channel.send(warnEmbed);
      }
    }
  },
};
