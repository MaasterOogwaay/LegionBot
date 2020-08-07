module.exports = {
  name: "stats",
  description: "Display info about the user mentioned.",
  guildOnly: true,
  execute(message, args, statsEmbed) {
    if (message.content.toLowerCase().startsWith(">>stats")) {
      const args = message.content.split(" ");
      console.log(args);
      if (args.length > 2) {
        message.channel.send(
          `Incorrect Usage: >>stats | >>stats <user_id> | >>stats @mention`
        );
      } else if (args.length === 2) {
        const member =
          message.mentions.members.size === 1
            ? message.mentions.members.first()
            : message.guild.members.cache.get(args[1]);
        if (member) {
          statsEmbed
            .setColor("#3ced48")
            .setAuthor(
              `${member.user.tag} (${member.id})`,
              member.user.displayAvatarURL()
            )
            .setThumbnail(member.user.displayAvatarURL())
            .addField(
              "Created On",
              member.user.createdAt.toLocaleString(),
              true
            )
            .addField("Joined On", member.joinedAt, true)
            .addField("Presence", member.presence.status)
            .setDescription(
              `${member.roles.cache.map((role) => role.toString()).join(" ")}`
            );
          message.channel.send(statsEmbed);
        } else {
          message.channel.send(
            `I couldn't find that member with ID ${args[1]}`
          );
        }
      }
    }
  },
};
