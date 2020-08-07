const fs = require("fs");
// Import the discord.js module
const Discord = require("discord.js");
// Create an instance of a Discord client
const { prefix, token } = require("./config.json");

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
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
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
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
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
      ["embed", "rules", "my-info", "server-info", "regions", "stats"].includes(
        command.name
      )
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
      .setColor("#0099ff")
      .addField("\u200B", `Welcome to Murdoc Niccals's server, ${member}`)
      .setThumbnail("https://i.imgur.com/ViRCIyJ.png")
      .addField(
        "\u200B",
        "In order to unlock the rest of the server, you must do a few things.\n 1 go to #bot\n 2 Set your region.\n 3 Set your platform.\n 4 Finally, you can unlock the server"
      )
      .setFooter("Legion Bot", "https://i.imgur.com/ViRCIyJ.png");
    channel.send(welcomeEmbed);
  });

  client.on("message", (message) => {
    if (message.author.bot) {
      if (message.embeds) {
        const embedMsg = message.embeds.find(
          (msg) => msg.title === "React to obtain your region role"
        );
        if (embedMsg) {
          message
            .react("738860202350215274")
            .then(() => message.react("738860185849692220"))
            .then(() => message.react("738860282327072829"))
            .then(() => message.react("706557479647182999"))
            .then(() => message.react("738860129348223097"))
            .catch(() => console.error("One of the emojis failed to react."));
        }
      }
    }
  });
});

// Log our bot in
client.login(token);
