module.exports = {
  name: "avatar",
  description: "Get the avatar URL of the tagged user(s), or your own avatar.",
  aliases: ["icon", "pfp"],
  guildOnly: true,
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`
      );
    }

    const avatarList = message.mentions.users.map((user) => {
      return `${user.username}'s avatar: ${user.displayAvatarURL({
        format: "png",
        dynamic: true,
      })}`;
    });

    message.channel.send(avatarList);
  },
};
