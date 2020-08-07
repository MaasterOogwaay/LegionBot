/**
 * Imports
 */
const { discord_db } = require('./connection');

/**
 * Class constants
 */
const Leaderboard = {
  database: 'paladins',
  table: 'players',

  /**
   * Initialise database and tables
   */
  init() {
    this.createDatabase();
    this.useDatabase();
    this.createTable();
  },

  /**
   * Create database if not exists
   */
  createDatabase() {
    discord_db.query(
      `CREATE DATABASE IF NOT EXISTS ${this.database};`,
      (err, res) => {
        if (err) throw err;
        console.log(`Created database: ${this.database}`);
      }
    );
  },

  /**
   * Use the newly created database
   */
  useDatabase() {
    discord_db.query(`USE  ${this.database};`, (err, res) => {
      if (err) throw err;
      console.log(`Using database: ${this.database}`);
    });
  },

  /**
   * Create table if not exists
   */
  createTable() {
    discord_db.query(
      `CREATE TABLE IF NOT EXISTS \`${this.table}\` (
      \`Id\` INT,
      \`Name\` VARCHAR(255),
      \`Level\` INT,
      \`Matches\` INT,
      \`Wins\` INT,
      \`Losses\` INT,
      \`WLR\` INT COMMENT 'Win / Loss ratio',
      PRIMARY KEY (\`id\`), INDEX(\`Level\`));`,
      (err, res) => {
        if (err) throw err;
        console.log(`Created table: ${this.table}`);
      }
    );
  },

  /**
   * Insert player stats into table
   */
  storePlayer(player) {
    const totalMatches = player.totals.wins + player.totals.losses;
    const WLR = (player.totals.wins / (totalMatches / 100)).toFixed(2); // Win / Loss ratio

    const sqlPlayer = {
      Id: player.player.id,
      Name: player.player.name,
      Level: player.player.level,
      Matches: totalMatches,
      Wins: player.totals.wins,
      Losses: player.totals.losses,
      WLR: WLR
    };

    discord_db.query(
      `
      INSERT INTO ${this.table} SET ? 
      ON DUPLICATE KEY UPDATE
        Level=VALUES(Level), Matches=VALUES(Matches), Wins=VALUES(Wins),
        Losses=VALUES(Losses), WLR=VALUES(WLR)
      `,
      sqlPlayer,
      (err, res) => {
        if (err) throw err;
        console.log(`Inserted / updated player successfully into: ${this.table}`);
      }
    );
  },

  /**
   * Return all players in leaderboard, ordered by Level
   */
  getPlayersByLevel() {
    return new Promise((resolve, reject) => {
      discord_db.query(
        `SELECT * FROM ${this.table} ORDER BY Level DESC LIMIT 15;`,
        (err, res) => {
          if (err) {
            reject();
            throw err;
          }
          console.log(`Selected from: ${this.table}`);
          resolve(res);
        }
      );
    });
  },

  /**
   * Return all players in leaderboard, ordered by WLR
   */
  getPlayersByWLR() {
    return new Promise((resolve, reject) => {
      discord_db.query(
        `SELECT * FROM ${this.table} ORDER BY ((Wins * Level) - (Losses * Level)) DESC LIMIT 15;`,
        (err, res) => {
          if (err) {
            reject();
            throw err;
          }
          console.log(`Selected from: ${this.table}`);
          resolve(res);
        }
      );
    });
  }
};

/**
 * Export
 */
module.exports = {
  Leaderboard
};
