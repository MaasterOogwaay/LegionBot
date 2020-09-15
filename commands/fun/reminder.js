const ms = require("ms");

module.exports = {
  name: "reminder",
  description: "Set a reminder that will ping the user once the time is up",
  guildOnly: true,
  execute(message, args) {
    if (message.content.startsWith(">>reminder")) {
      var member = message.guild.member(
        message.mentions.users.first() ||
          message.guild.members.cache.get(args[0])
      );
      if (!member) return message.reply("Please Provide a Member to remind.");

      let time = args[1];
      if (!time) {
        return message.reply("You didnt specify a time!");
      }

      let reminder = args.slice(2).join(" ");
      if (!reminder) {
        return message.reply("You didn't specify what to remind you of!");
      }

      message.channel.send(`${member} has set a reminder for ${ms(ms(time))}`);

      setTimeout(function () {
        message.channel.send(`${member}, ${reminder}.`);
      }, ms(time));
    } else {
      return message.channel.send("You dont have perms.");
    }
  },
};
