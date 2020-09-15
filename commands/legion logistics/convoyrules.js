module.exports = {
  name: "convoyrules",
  description: "Rules covering convoys held by Legion Logistics",
  execute(message, args, convoyrulesEmbed) {
    convoyrulesEmbed
      .setColor("#3ced48")
      .setTitle("Legion Logistics Convoy Rules")
      .setThumbnail(message.guild.iconURL())
      .setDescription(
        "The list stated below are the rules covering all convoys hosted by Legion Logistics. All members participating in this convoy is asked to follow these rules and accept them. These rules are in place to make your drive better and safer but also those around you."
      )
      .addFields(
        {
          name: "**__Overtaking__**",
          value:
            "You are not permitted to overtake during a convoy unless advised by an Event Coordinator",
        },
        {
          name: "**__Use of cars__**",
          value:
            "The use of cars is prohibited. The only time you may see a car in the convoy, is when an Event Coordinator uses one.",
        },
        {
          name: "**__Reckless driving__**",
          value:
            "Please keep a safe distance from the vehicle ahead. The reccomended distance is 75 metres.",
        },
        {
          name: "**__Trailers__**",
          value:
            "The use of 2 or more trailers is prohibited. If you are too heavy, and are causing disruption within the convoy, you may be asked to move to the back.",
        }
      )
      .setTimestamp()
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

    message.channel.send(convoyrulesEmbed);
  },
};
