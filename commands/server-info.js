module.exports = {
  name: "server-info",
  description: "Display info about this server.",
  guildOnly: true,
  execute(message, args, serverEmbed) {
    const { guild } = message;
    serverEmbed
      .setColor("#3ced48")
      .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
      .setThumbnail(guild.iconURL())
      .addField("Created On", guild.createdAt.toLocaleString(), true)
      .addField("Server Owner", guild.owner.user.tag)
      .addField("Total Members", guild.memberCount, true)
      .addField(
        "Total Real Members",
        guild.members.cache.filter((member) => !member.user.bot).size,
        true
      )
      .addField(
        "Total Bots",
        guild.members.cache.filter((member) => member.user.bot).size,
        true
      )
      .addField("Total Channels", guild.channels.cache.size, true)
      .addField(
        "Total Text Channels",
        guild.channels.cache.filter((ch) => ch.type === "text").size,
        true
      )
      .addField(
        "Total Voice Channels",
        guild.channels.cache.filter((ch) => ch.type === "voice").size,
        true
      )
      .addField("Total Roles", `${guild.roles.cache.size}`);

    message.channel.send(serverEmbed);
  },
};
