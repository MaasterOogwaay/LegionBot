const axios = require('axios');
const moment = require('moment');

const { Leaderboard } = require('../database/Leaderboard');

module.exports = {
  name: "pleaderboard",
  description: "PTF stats leaderboard",
  guildOnly: true,
  async execute(message, args) {
    Leaderboard.init();
    Leaderboard.getPlayersByWLR()
      .then((players) => {
        let leaderboardResult = players
          .map((e) => {
            const Name = this.forceStringLength(e.Name, 20);
            const Level = this.forceStringLength(e.Level, 5);
            const Matches = this.forceStringLength(e.Matches, 7);
            const Wins = this.forceStringLength(e.Wins, 6);
            const Losses = this.forceStringLength(e.Losses, 6);
            const WLR = this.forceStringLength(e.WLR + '%', 3);

            return (
              '' +
              `
|${Name}|${Level}|${Matches}|${Wins}|${Losses}|${WLR}|
+--------------------+-----+-------+------+------+---+`
            );
          })
          .join('');

        leaderboardResult =
          '' +
          `\`\`\`
+----------------------------------------------------+
|Leaderboard                                         |
+----------------------------------------------------+
|Name                |Level|Matches|Wins  |Losses|W/L|
+--------------------+-----+-------+------+------+---+` +
          leaderboardResult +
          `\`\`\``;

        message
          .reply(leaderboardResult)
          .then(() => {
            console.log(`[${this.name}] replied successfully.`);
          })
          .catch((err) => {
            console.log(err);
            console.log(`[${this.name}] reply failed.`);
          });
      })
      .catch((err) => {
        console.log(`[${this.name}] failed to get leaderboard.`);
        console.log(err);
      });
  },
  forceStringLength(string = '', length = 0) {
    string = '' + string;
    let result = '' + string.substring(0, length);
    if(result.length < length) {
      result = result.padEnd(length, " ");
    }
    return result;
  }
};
