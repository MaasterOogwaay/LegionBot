module.exports = {
  name: "staff",
  description: "Links to staff application forms",
  execute(message, args, staffEmbed) {
    staffEmbed
      .setColor("#3ced48")
      .setTitle("Legion Logistics is looking for staff!")
      .setThumbnail(message.guild.iconURL())
      .setDescription(
        "Below you can find links to apply to our various positions that are currently available. You can click on the blue text to get redirected to the appropriate form."
      )
      .addFields(
        {
          name: "Moderator Application",
          value:
            "Looks after the discord server and makes sure everybody abides by the server rules\n [Apply here!](https://forms.gle/hbyRdNP64rHbwmAdA)",
        },
        {
          name: "Events Team Application",
          value:
            "Deals with event invitations, invites VTCs to our events and makes sure our drivers get to fully enjoy the events\n [Apply here!](https://forms.gle/arGF4Q7GtNrbHi897)",
        },
        {
          name: "HR Department Application",
          value:
            "Deals with driver applications and takes new drivers through the joining procedure.\n [Apply here!](https://forms.gle/FyNnw1WoaJQCETrC9)",
        },
        {
          name: "Developer Application",
          value:
            "A team of hard working developers.\n [Apply here!](https://forms.gle/7hwpvHCWwQXygoFe6)",
        }
      )
      .setImage("https://imgur.com/mmdMckc.png")
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(staffEmbed);
  },
};
