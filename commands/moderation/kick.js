module.exports = {
  name: "kick",
  description: "Tag a member and kick them.",
  guildOnly: true,
  execute(message) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      if (message.content.startsWith(">>kick")) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
          // Now we get the member from the user
          const member = message.guild.member(user);
          // If the member is in the guild
          if (member) {
            /**
             * Kick the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             */
            member
              .kick("Optional reason that will display in the audit logs")
              .then(() => {
                // We let the message author know we were able to kick the person
                message.reply(`Successfully kicked ${user.tag}`);
              })
              .catch((err) => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                message.reply("I was unable to kick the member");
                // Log the error
                console.error(err);
              });
          } else {
            // The mentioned user isn't in this guild
            message.reply("That user isn't in this guild!");
          }
          // Otherwise, if no user was mentioned
        } else {
          message.reply("You didn't mention the user to kick!");
        }
      }
    }
  },
};
