// Not working yet
module.exports = {
  name: 'mute',
  description: 'Mutes a user in the server',
  guildOnly: 'true',
  execute(message) {
      if (message.content.startsWith('>>mute')) {
          const user = message.mentions.users.first();
          if (user) {
              const member = message.guild.member(user);
              if (member) {
                  member
                  .mute({
                      reason: 'They were bad!',
                  })
                  .then(() => {
                      message.reply(`Successfully muted ${user.tag}`);
                  })
                  .catch(err => {
                      message.reply('I was unable to mute the member');
                      console.error(err);
                  });
              } else {
                  message.reply("That user isn't in this guild!");
              }
          } else {
              message.reply("You didn't mention the user to mute!");
          }
      }
  }
};