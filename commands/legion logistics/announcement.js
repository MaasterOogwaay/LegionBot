module.exports = {
  name: "announcement",
  description: "Announcement message for Legion Logistics",
  execute(message, args, announcementEmbed) {
    const { guild } = message;
    const channel1 = guild.channels.cache.find(
      (ch) => ch.name === "🎁competition"
    );
    const channel2 = guild.channels.cache.find(
      (ch) => ch.name === "📸pictures"
    );
    announcementEmbed
      .setColor("#3ced48")
      .setTitle("Competition Time!")
      .setThumbnail(message.guild.iconURL())
      .setDescription(
        `With the company growing and the introduction of our website in the coming days, we've decided that we need a logo to be better recognised. The logo can be created from scratch or use an image shared in ${channel2}. To submit your image, post it in ${channel1}. The winner will be picked on the 1st of November 2020`
      )
      .addFields(
        {
          name: "Requirements",
          value: `- Must have the VTC name or variation of the name in the image\n - Must not slander/destroy the name of the company\n - Must not break server rules`,
        },
        {
          name: "Size",
          value:
            "The estimated sizes are as follows,\n width: 664px\n height: 676px\n - Your image doesn't have to be this size but we may ask you to make it smaller so it can fit in discord icon",
        },
        {
          name: "Prize",
          value: "Customised role of your choice",
        }
      )
      .setImage("https://imgur.com/Sq5mD4j.png")
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(announcementEmbed);

    // You can create Masked Links by putting the text in [] brackets and the the URL in ()
  },
};
