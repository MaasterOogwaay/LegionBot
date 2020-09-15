module.exports = {
  name: "applications",
  description: "Announcement message for Legion Logistics staff applications",
  execute(message, args, applicationsEmbed) {
    applicationsEmbed
      .setColor("#3ced48")
      .setTitle("Legion Logistics is looking for staff!")
      .setThumbnail(message.guild.iconURL())
      .setDescription(
        "Legion Logistics is currently looking for new members for the staff team. Available positions and other information can be found below.\n\n There are 5 sections, 3 of them you can fill out. Aspiring moderators can skip section 4 and aspiring event coordinators can skip section 3.\n *note: these sections are required so if it's not for you just fill in random answers until your section arrives*"
      )
      .setURL("https://forms.gle/BcxCWDZ9uUsy8ZQX9")
      .addFields(
        {
          name: "Available Positions",
          value:
            "Company Mod - This is the server moderator\n Event Coordinator - Plans, sets up and finds convoys/events for Legion Logistics to host/take part in.",
        },
        {
          name: "Deadline",
          value: "The application will be open till September 19th 2020.",
        },
        {
          name: "\u200B",
          value: "[Apply here!](https://forms.gle/BcxCWDZ9uUsy8ZQX9)",
        }
      )
      .setImage("https://imgur.com/mmdMckc.png")
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(applicationsEmbed);

    // You can create Masked Links by putting the text in [] brackets and the the URL in ()
  },
};
