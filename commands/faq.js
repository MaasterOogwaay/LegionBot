module.exports = {
  name: "faq",
  description: "All the faqs we get in the server.",
  guildOnly: true,
  execute(message, args, faqEmbed) {
    faqEmbed
      .setColor("#3ced48")
      .setTitle("Frequently Asked Questions")
      .setDescription("Here are some FAQs we get")
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "__How do I unlock the server?__",
          value: "- React to the messages in #unlock-server-here.",
        },
        {
          name: "__How do I get the champion roles?__",
          value:
            "- Go to #select-your-champion and put a ! infront of each champions name. e.g. `!grover`,\n - Bomb King, Sha lin and Mal'Damba use a hyphen. e.g. `!bomb-king`",
        },
        {
          name: "__How do I remove a champion role?__",
          value:
            "- Use the command `!remove(champname)`. e.g. `!removegrover`.",
        },
        {
          name: "__How do I get the LFG roles?__",
          value:
            "- For the casual role, `!lfgcasual`.\n - For the ranked role, `!lfgranked`.",
        },
        {
          name: "__How do I remove the LFG roles?__",
          value:
            "- Use these commands, `!removelfgcasual` or `!removelfgranked`.",
        },
        {
          name: "__When is the tournament?__",
          value: "- The tournament is every 2 weeks.",
        },
        {
          name: "__Can I apply for staff?__",
          value:
            "- We will release an application form when we need new staff.",
        },
        {
          name: "__Why was my meme deleted?__",
          value: "- It was probably NSFW.",
        },
        {
          name: "__How do I join the tournament?__",
          value: "- Head to #teams and use the pinned message as an example.",
        },
        {
          name: "__Who do I contact about becomeing a partner?__",
          value: "- DM the owner Murdoc Nicaals for more information.",
        },
        {
          name: "__Where can I find the tournament stream?__",
          value: "- Here's a link! https://www.twitch.tv/paladinsteamfinder/",
        },
        {
          name: "__I can't DM ModMail.__",
          value: "- If ModMail is offline, please DM a staff member.",
        }
      );

    message.channel.send(faqEmbed);
  },
};
