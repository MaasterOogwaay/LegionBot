module.exports = {
  name: "regions",
  description: "Creates a reactions role for regions.",
  guildOnly: true,
  execute(message, args, regionsEmbed) {
    regionsEmbed
      .setColor("#3ced48")
      .setTitle("React to obtain your region role")
      .setDescription(
        "<:Asia:738860202350215274> - Asia\n" +
          "<:Austrailia:738860185849692220> - Austrailia\n" +
          "<:Brazil:738860282327072829> - Brazil\n" +
          "<:EU:706557479647182999> - EU\n" +
          "<:NA:738860129348223097> - NA"
      );

    message.reply(regionsEmbed).then((sentMessage) => {
      let reactionUser;

      const regions = [
        "738860202350215274",
        "738860185849692220",
        "738860282327072829",
        "706557479647182999",
        "738860129348223097",
      ];

      regions.forEach((region) => sentMessage.react(region));

      const filter = (reaction, user) => {
        reactionUser = user;
        return (
          regions.includes(reaction.emoji.id) && user.id === message.author.id
        );
      };

      sentMessage
        .awaitReactions(filter, { time: 60000, max: 1, errors: ["time"] })
        .then(async (reactions) => {
          const reaction = reactions.first();

          this.addRole(
            reaction.message.guild,
            reaction.emoji.name,
            reactionUser.id
          );
        })
        .catch((e) => {
          console.log(e);
          message.reply("you did not react in time!");
        });
    });
  },
  /**
   * Add role to user
   *
   * @param server
   * @param emojiName
   * @param userId
   */
  addRole(server, emojiName, userId) {
    // Find emoji/role using emojiToRole
    const emoji = emojiName;

    // If found emoji
    if (emoji) {
      // Find role that is the same name as the selected emoji
      const role = server.roles.cache.find((role) => role.name === emoji);

      // Find member by their userId
      const member = server.members.cache.get(userId);

      // Add role to user
      member.roles.add(role);
    }
  },
};
