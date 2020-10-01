module.exports = {
  name: "test",
  description: "Create a fully customizable embed through a command",
  execute(message, args, testEmbed) {
    if (message.content.startsWith(">>test")) {
      const myVariable = JSON.parse("{" + args.join(" ") + "}");

      testEmbed
        .setColor("#3ced48")
        .setTitle(myVariable.title)
        .setThumbnail(myVariable.thumbnail)
        .setDescription(myVariable.description)
        .addFields(
          {
            name: myVariable.fieldName,
            value: myVariable.fieldValue,
          },
          {
            name: myVariable.fieldName2,
            value: myVariable.fieldValue2,
          },
          {
            name: myVariable.fieldName3,
            value: myVariable.fieldValue3,
          }
        )
        .setImage(myVariable.image)
        .setTimestamp()
        .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");

      message.channel.send(testEmbed);
    }
  },
};
