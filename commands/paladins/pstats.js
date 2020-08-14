const axios = require("axios");
const moment = require("moment");

const { Leaderboard } = require("../database/Leaderboard");

module.exports = {
  name: "pstats",
  description: "Get your Paladins characters stats",
  guildOnly: true,
  async execute(message, args) {
    // Join all args and assume it is the ign
    const ign = encodeURI(args.join(" "));

    try {
      // Check for players with that name
      const players = await axios.get(
        `https://api.paladins.guru/v3/search?type=Player&term=${ign}`
      );

      // Ensure HTTP status hasn't failed
      if (players.status !== 200) {
        await message.reply("I could not retrieve your stats at this time.");
      }

      // Ensure we found at least 1 player with that ign
      if (!players.data || players.data.length === 0) {
        await message.reply("there are no players found for that name.");
      }

      // Single player
      if (players.data && players.data.length === 1) {
        const tmpPlayer = players.data.pop();
        await this.sendStatsMessage(message, tmpPlayer);
      }
      // Else if multiple people, initiate reaction event
      else if (players.data && players.data.length > 1) {
        // Take max 10 players with the same name
        players.data = players.data.slice(0, 10);

        // Create a "select player" message
        let playersMessage = `I found ${players.data.length} players matching that name. Please react with the number of your account:\n`;

        players.data.forEach((e, i) => {
          const lastSeen = moment(e.seen).format("Do MMM YYYY");
          playersMessage += `\n**${i + 1}** - Level ${
            e.level
          }, last seen ${lastSeen}`;
        });

        message.reply(playersMessage).then((sentMessage) => {
          if (players.data.length >= 1) sentMessage.react("1️⃣");
          if (players.data.length >= 2) sentMessage.react("2️⃣");
          if (players.data.length >= 3) sentMessage.react("3️⃣");
          if (players.data.length >= 4) sentMessage.react("4️⃣");
          if (players.data.length >= 5) sentMessage.react("5️⃣");
          if (players.data.length >= 6) sentMessage.react("6️⃣");
          if (players.data.length >= 7) sentMessage.react("7️⃣");
          if (players.data.length >= 8) sentMessage.react("8️⃣");
          if (players.data.length >= 9) sentMessage.react("9️⃣");

          const filter = (reaction, user) => {
            return (
              ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"].includes(
                reaction.emoji.name
              ) && user.id === message.author.id
            );
          };

          sentMessage
            .awaitReactions(filter, { time: 60000, max: 1, errors: ["time"] })
            .then(async (reactions) => {
              const reaction = reactions.first();

              let tmpPlayer = null;

              if (reaction.emoji.name === "1️⃣") tmpPlayer = players.data[0];
              if (reaction.emoji.name === "2️⃣") tmpPlayer = players.data[1];
              if (reaction.emoji.name === "3️⃣") tmpPlayer = players.data[2];
              if (reaction.emoji.name === "4️⃣") tmpPlayer = players.data[3];
              if (reaction.emoji.name === "5️⃣") tmpPlayer = players.data[4];
              if (reaction.emoji.name === "6️⃣") tmpPlayer = players.data[5];
              if (reaction.emoji.name === "7️⃣") tmpPlayer = players.data[6];
              if (reaction.emoji.name === "8️⃣") tmpPlayer = players.data[7];
              if (reaction.emoji.name === "9️⃣") tmpPlayer = players.data[8];

              if (tmpPlayer) {
                await this.sendStatsMessage(message, tmpPlayer);
              }
            })
            .catch((e) => {
              console.log(e);
              message.reply("you did not react in time!");
            });
        });
      }
    } catch (e) {
      console.log(`[${this.name}] reply failed.`);
      console.log(e);
    }
  },
  /**
   * Send message
   *
   * @param tmpMessage
   * @param tmpPlayer
   * @return {Promise<void>}
   */
  async sendStatsMessage(tmpMessage, tmpPlayer) {
    const player = await axios.get(
      `https://api.paladins.guru/v3/profiles/${tmpPlayer.id}-${encodeURI(
        tmpPlayer.name
      )}/summary`
    );

    // Get stats in embed
    const embedReply = this.getFormattedStats(player.data);

    // Reply
    await tmpMessage.reply(embedReply);

    console.log(`[${this.name}] replied successfully.`);

    // Insert into Leaderboard
    Leaderboard.init();
    Leaderboard.storePlayer(player.data);
  },
  /**
   * Given JSON stats, return Discord embed object for the !stats ign reply
   *
   * @param player
   *
   * @url https://anidiots.guide/first-bot/using-embeds-in-messages
   * @url https://leovoel.github.io/embed-visualizer/
   */
  getFormattedStats(player) {
    const totalMatches = player.totals.wins + player.totals.losses;
    const WLR = (player.totals.wins / (totalMatches / 100)).toFixed(2); // Win / Loss ratio

    return {
      embed: {
        color: 1686129,
        author: {
          name: player.player.name,
          url: "https://disboard.org/server/571514585857654804",
          icon_url:
            "https://cdn.discordapp.com/icons/571514585857654804/d06a63bab3c40dc8c30c82cd907e3b8a.png",
        },
        thumbnail: {
          url:
            "https://cdn.discordapp.com/icons/571514585857654804/d06a63bab3c40dc8c30c82cd907e3b8a.png",
        },
        description: `Overall, ${player.player.region}, Level ${player.player.level}, Matches: ${totalMatches}`,
        fields: [
          {
            name: "Wins",
            value: player.totals.wins,
          },
          {
            name: "Losses",
            value: player.totals.losses,
          },
          {
            name: "Win / Loss ratio",
            value: `${WLR}%`,
          },
          {
            name: "Hours Played",
            value:
              Math.floor(player.totals.playtime / 60) +
              ":" +
              (player.totals.playtime % 60),
          },
        ],
        footer: {
          text: "Paladins Team Finder",
        },
      },
    };
  },
};
