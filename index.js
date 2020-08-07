const fs = require("fs");
// Import the discord.js module
const Discord = require("discord.js");

require("dotenv").config({ path: ".env" });

const { PREFIX, DISCORD_TOKEN } = process.env;

// Create an instance of a Discord client
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Retrieve the command files
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("I can't execute that command inside DMs!");
  }

  client.user.setActivity(">>help | For help with commands", {
    type: "PLAYING",
  });

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    if (
      [
        "embed",
        "rules",
        "my-info",
        "server-info",
        "regions",
        "stats",
        "suggestion",
      ].includes(command.name)
    ) {
      const exampleEmbed = new Discord.MessageEmbed();
      command.execute(message, args, exampleEmbed);
    } else {
      command.execute(message, args);
    }
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }

  client.on("guildMemberAdd", (member) => {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "welcome"
    );
    if (!channel) return;
    const welcomeEmbed = new Discord.MessageEmbed()
      .setColor("#3ced48")
      .addField("\u200B", `Welcome to Murdoc Niccals's server, ${member}`)
      .setThumbnail(message.guild.iconURL())
      .addField(
        "\u200B",
        "In order to unlock the rest of the server, you must do a few things.\n 1 go to #bot\n 2 Set your region.\n 3 Set your platform.\n 4 Finally, you can unlock the server"
      )
      .setFooter("Legion Bot", "https://imgur.com/Syb10i5.png");
    channel.send(welcomeEmbed);
  });

  // client.on("message", (message) => {
  //   if (message.author.bot) {
  //     if (message.embeds) {
  //       const embedMsg = message.embeds.find(
  //         (msg) => msg.title === "React to obtain your region role"
  //       );
  //       if (embedMsg) {
  //         message
  //           .react("738860202350215274")
  //           .then(() => message.react("738860185849692220"))
  //           .then(() => message.react("738860282327072829"))
  //           .then(() => message.react("706557479647182999"))
  //           .then(() => message.react("738860129348223097"))
  //           .catch(() => console.error("One of the emojis failed to react."));
  //       }
  //     }
  //   }
  // });

  client.on("message", (message) => {
    if (message.author.bot) {
      if (message.embeds) {
        const embedMsg = message.embeds.find(
          (msg) => msg.title === "I have a suggestion!"
        );
        if (embedMsg) {
          message
            .react("👍")
            .then(() => message.react("👎"))
            .catch(() => console.error("One of the emojis failed to react."));
        }
      }
    }
  });
});

// Log our bot in
client.login(DISCORD_TOKEN);
