const ms = require("ms");

module.exports = {
  name: "tempmute",
  description: "Mutes a user",
  guildOnly: true,
  execute(message, args) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      if (message.content.startsWith(">>tempmute")) {
        var member = message.guild.member(
          message.mentions.users.first() ||
            message.guild.members.cache.get(args[0])
        );
        if (!member)
          return message.reply("Please Provide a Member to TempMute.");

        let mainrole = message.guild.roles.cache.find(
          (role) => role.name === "Member"
        );
        let role = message.guild.roles.cache.find(
          (role) => role.name === "Muted"
        );

        if (!role) return message.reply("Couldn't find the 'muted' role.");

        let time = args[1];
        if (!time) {
          return message.reply("You didnt specify a time!");
        }

        member.roles.remove("738151326042685462");
        member.roles.add("741061068511772742");

        message.channel.send(`${member} has been muted for ${ms(ms(time))}`);

        setTimeout(function () {
          member.roles.add("738151326042685462");
          member.roles.remove("741061068511772742");
          message.channel.send(`${member} has been unmuted.`);
        }, ms(time));
      } else {
        return message.channel.send("You dont have perms.");
      }
    }
  },
};
