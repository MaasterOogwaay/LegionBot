module.exports = {
  name: "rules",
  description: "List all of the servers rules.",
  guildOnly: true,
  execute(message, args, rulesEmbed) {
    rulesEmbed
      .setColor("#3ced48")
      .setTitle("Server Rules")
      .setDescription("Here are the rules in this server")
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "**__Be respectful of others and their opinions__**",
          value:
            "- Harassing members or staff with/without reason is not allowed.\n - Debating a topic is fine as long as it is respectful. You can disagree without being a jerk. Users who are arguing will be asked to take their argument to DMs or muted.",
        },
        {
          name:
            "**__This Discord is for the discussion of the Hi-Rez game, Paladins.__**",
          value:
            "- The #general channel is for conversation that stray from these topics.\n - This Discord is not the place for topics such as: Politics, religion, race, sexual orientation, drug usage, or suicide.",
        },
        {
          name:
            "**__NSFW content is strictly prohibited and will result in a ban.__**",
          value:
            "- NSFW content define all creative writing or chat, pictures, animations, links, and emojis that describe, suggest, or depict nudity, sexual acts, excessive blood, violence or gore.",
        }
      );

    message.channel.send(rulesEmbed);
  },
};
