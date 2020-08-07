const axios = require('axios');
const moment = require('moment');

module.exports = {
  name: "pchampions",
  description: "Get your Paladins characters champions stats",
  guildOnly: true,
  async execute(message, args) {
    // Join all args and assume it is the ign
    const ign = encodeURI(args.join(' '));

    try {
      // Check for players with that name
      const players = await axios.get(`https://api.paladins.guru/v3/search?type=Player&term=${ign}`)

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
        await this.sendChampionsMessage(message, tmpPlayer);
      }
      // Else if multiple people
      else if (players.data && players.data.length > 1) {
        // Take only 10 players
        players.data = players.data.slice(0, 10);

        // Create a "select player" message
        let playersMessage = `I found ${players.data.length} players matching that name.\n\nPlease react with the number of your account:`;

        players.data.forEach((e, i) => {
          const lastSeen = moment(e.seen).format("Do MMM YYYY");
          playersMessage += `\n**${i+1}** - Level ${e.level}, last seen ${lastSeen}`;
        });

        message.reply(playersMessage).then((sentMessage) => {
          if (players.data.length >= 1) sentMessage.react('1️⃣');
          if (players.data.length >= 2) sentMessage.react('2️⃣');
          if (players.data.length >= 3) sentMessage.react('3️⃣');
          if (players.data.length >= 4) sentMessage.react('4️⃣');
          if (players.data.length >= 5) sentMessage.react('5️⃣');
          if (players.data.length >= 6) sentMessage.react('6️⃣');
          if (players.data.length >= 7) sentMessage.react('7️⃣');
          if (players.data.length >= 8) sentMessage.react('8️⃣');
          if (players.data.length >= 9) sentMessage.react('9️⃣');

          const filter = (reaction, user) => {
            return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
          };

          sentMessage.awaitReactions(filter, { time: 60000, max: 1, errors: ['time'] })
            .then(async reactions => {
              const reaction = reactions.first();

              let tmpPlayer = null;

              if (reaction.emoji.name === '1️⃣') tmpPlayer = players.data[0];
              if (reaction.emoji.name === '2️⃣') tmpPlayer = players.data[1];
              if (reaction.emoji.name === '3️⃣') tmpPlayer = players.data[2];
              if (reaction.emoji.name === '4️⃣') tmpPlayer = players.data[3];
              if (reaction.emoji.name === '5️⃣') tmpPlayer = players.data[4];
              if (reaction.emoji.name === '6️⃣') tmpPlayer = players.data[5];
              if (reaction.emoji.name === '7️⃣') tmpPlayer = players.data[6];
              if (reaction.emoji.name === '8️⃣') tmpPlayer = players.data[7];
              if (reaction.emoji.name === '9️⃣') tmpPlayer = players.data[8];

              if (tmpPlayer) {
                await this.sendChampionsMessage(message, tmpPlayer);
              }
            })
            .catch(() => {
              message.reply('you did not react in time!');
            });
        });
      }
    } catch (e) {
      console.log(`[${this.name}] reply failed.`);
      console.log(e);
    }
  },
  forceStringLength(string = '', length = 0) {
    string = '' + string;
    let result = '' + string.substring(0, length);
    if(result.length < length) {
      result = result.padEnd(length, " ");
    }
    return result;
  },
  championIdToName(id) {
    const championsJSON = JSON.parse("{\"2056\":{\"id\":2056,\"name\":\"Pip\",\"title\":\"The Rogue Alchemist\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Potion Launcher\"},\"2\":{\"name\":\"Explosive Flask\"},\"3\":{\"name\":\"Healing Potion\"},\"4\":{\"name\":\"Weightless\"},\"5\":{\"name\":\"Evil Mojo\"}}},\"2057\":{\"id\":2057,\"name\":\"Skye\",\"title\":\"The Twilight Assassin\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Wrist Crossbow\"},\"2\":{\"name\":\"Poison Bolts\"},\"3\":{\"name\":\"Smoke Screen\"},\"4\":{\"name\":\"Hidden\"},\"5\":{\"name\":\"Time Bomb\"}}},\"2071\":{\"id\":2071,\"name\":\"Fernando\",\"title\":\"The Self-Appointed Knight\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Flame Lance\"},\"2\":{\"name\":\"Shield\"},\"3\":{\"name\":\"Fireball\"},\"4\":{\"name\":\"Charge\"},\"5\":{\"name\":\"Immortal\"}}},\"2073\":{\"id\":2073,\"name\":\"Barik\",\"title\":\"The Master Mechanic\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Blunderbuss\"},\"2\":{\"name\":\"Barricade\"},\"3\":{\"name\":\"Turret\"},\"4\":{\"name\":\"Rocket Boots\"},\"5\":{\"name\":\"Dome Shield\"}}},\"2092\":{\"id\":2092,\"name\":\"Cassie\",\"title\":\"The Hunter's Daughter\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Crossbow\"},\"2\":{\"name\":\"Disengage\"},\"3\":{\"name\":\"Blast Shot\"},\"4\":{\"name\":\"Dodge Roll\"},\"5\":{\"name\":\"Scout\"}}},\"2093\":{\"id\":2093,\"name\":\"Grohk\",\"title\":\"The Lightning Orc\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Lightning Staff\"},\"2\":{\"name\":\"Shock Pulse\"},\"3\":{\"name\":\"Healing Totem\"},\"4\":{\"name\":\"Ghost Walk\"},\"5\":{\"name\":\"Tempest\"}}},\"2094\":{\"id\":2094,\"name\":\"Evie\",\"title\":\"The Winter Witch\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Ice Staff\"},\"2\":{\"name\":\"Ice Block\"},\"3\":{\"name\":\"Blink\"},\"4\":{\"name\":\"Soar\"},\"5\":{\"name\":\"Ice Storm\"}}},\"2147\":{\"id\":2147,\"name\":\"Buck\",\"title\":\"The Unyielding\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Shotgun\"},\"2\":{\"name\":\"Net Shot\"},\"3\":{\"name\":\"Recovery\"},\"4\":{\"name\":\"Heroic Leap\"},\"5\":{\"name\":\"Buck Wild\"}}},\"2149\":{\"id\":2149,\"name\":\"Ruckus\",\"title\":\"The Worst of Friends\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Miniguns\"},\"2\":{\"name\":\"Missile Launcher\"},\"3\":{\"name\":\"Emitter\"},\"4\":{\"name\":\"Advance\"},\"5\":{\"name\":\"Hexa Fire\"}}},\"2205\":{\"id\":2205,\"name\":\"Androxus\",\"title\":\"The Godslayer\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Revolver\"},\"2\":{\"name\":\"Defiance\"},\"3\":{\"name\":\"Reversal\"},\"4\":{\"name\":\"Nether Step\"},\"5\":{\"name\":\"Accursed Arm\"}}},\"2249\":{\"id\":2249,\"name\":\"Kinessa\",\"title\":\"The Bounty Hunter\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Sniper Rifle\"},\"2\":{\"name\":\"Sniper Mode\"},\"3\":{\"name\":\"Oppressor Mine\"},\"4\":{\"name\":\"Transporter\"},\"5\":{\"name\":\"Headhunter\"}}},\"2254\":{\"id\":2254,\"name\":\"Grover\",\"title\":\"The Wild\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Throwing Axe\"},\"2\":{\"name\":\"Crippling Throw\"},\"3\":{\"name\":\"Blossom\"},\"4\":{\"name\":\"Vine\"},\"5\":{\"name\":\"Whirlwind\"}}},\"2267\":{\"id\":2267,\"name\":\"Ying\",\"title\":\"The Blossom\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Illusory Mirror\"},\"2\":{\"name\":\"Shatter\"},\"3\":{\"name\":\"Illusion\"},\"4\":{\"name\":\"Dimensional Link\"},\"5\":{\"name\":\"Illusory Rift\"}}},\"2277\":{\"id\":2277,\"name\":\"Drogoz\",\"title\":\"The Greedy\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Rocket Launcher\"},\"2\":{\"name\":\"Fire Spit\"},\"3\":{\"name\":\"Salvo\"},\"4\":{\"name\":\"Thrust\"},\"5\":{\"name\":\"Dragon Punch\"}}},\"2281\":{\"id\":2281,\"name\":\"Bomb King\",\"title\":\"His Majesty\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Sticky Bomb\"},\"2\":{\"name\":\"Detonate\"},\"3\":{\"name\":\"Grumpy Bomb\"},\"4\":{\"name\":\"Poppy Bomb\"},\"5\":{\"name\":\"King Bomb\"}}},\"2285\":{\"id\":2285,\"name\":\"Viktor\",\"title\":\"The Lone Wolf\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Assault Rifle\"},\"2\":{\"name\":\"Iron Sights\"},\"3\":{\"name\":\"Frag Grenade\"},\"4\":{\"name\":\"Hustle\"},\"5\":{\"name\":\"Barrage\"}}},\"2288\":{\"id\":2288,\"name\":\"Makoa\",\"title\":\"The Ancient\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Cannon\"},\"2\":{\"name\":\"Dredge Anchor\"},\"3\":{\"name\":\"Shell Shield\"},\"4\":{\"name\":\"Shell Spin\"},\"5\":{\"name\":\"Ancient Rage\"}}},\"2303\":{\"id\":2303,\"name\":\"Mal'Damba\",\"title\":\"Wekono's Chosen\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Spitting Cobra\"},\"2\":{\"name\":\"Mending Spirits\"},\"3\":{\"name\":\"Gourd\"},\"4\":{\"name\":\"Slither\"},\"5\":{\"name\":\"Dread Serpent\"}}},\"2307\":{\"id\":2307,\"name\":\"Sha Lin\",\"title\":\"The Desert Wind\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Longbow\"},\"2\":{\"name\":\"Crippling Arrow\"},\"3\":{\"name\":\"Rapid Shot\"},\"4\":{\"name\":\"Withdraw\"},\"5\":{\"name\":\"Heat Haze\"}}},\"2314\":{\"id\":2314,\"name\":\"Tyra\",\"title\":\"The Untamed\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Auto Rifle\"},\"2\":{\"name\":\"Nade Launcher\"},\"3\":{\"name\":\"Fire Bomb\"},\"4\":{\"name\":\"Hunter's Mark\"},\"5\":{\"name\":\"Crossfire\"}}},\"2322\":{\"id\":2322,\"name\":\"Torvald\",\"title\":\"The Runic Sage\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Gauntlet\"},\"2\":{\"name\":\"Nullify\"},\"3\":{\"name\":\"Protection\"},\"4\":{\"name\":\"Recharge\"},\"5\":{\"name\":\"Hyper Beam\"}}},\"2338\":{\"id\":2338,\"name\":\"Maeve\",\"title\":\"of Blades\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Daggers\"},\"2\":{\"name\":\"Pounce\"},\"3\":{\"name\":\"Nine Lives\"},\"4\":{\"name\":\"Prowl\"},\"5\":{\"name\":\"Midnight\"}}},\"2348\":{\"id\":2348,\"name\":\"Inara\",\"title\":\"The Stone Warden\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Stone Spear\"},\"2\":{\"name\":\"Earthen Guard\"},\"3\":{\"name\":\"Impasse\"},\"4\":{\"name\":\"Warder's Field\"},\"5\":{\"name\":\"Seismic Crash\"}}},\"2362\":{\"id\":2362,\"name\":\"Lex\",\"title\":\"The Hand of Justice\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Magnums\"},\"2\":{\"name\":\"In Pursuit\"},\"3\":{\"name\":\"Retribution\"},\"4\":{\"name\":\"Combat Slide\"},\"5\":{\"name\":\"The Law\"}}},\"2372\":{\"id\":2372,\"name\":\"Seris\",\"title\":\"Oracle of the Abyss\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Soul Orb\"},\"2\":{\"name\":\"Restore Soul\"},\"3\":{\"name\":\"Rend Soul\"},\"4\":{\"name\":\"Shadow Travel\"},\"5\":{\"name\":\"Convergence\"}}},\"2393\":{\"id\":2393,\"name\":\"Willo\",\"title\":\"of the Summer Court\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Wand of Overgrowth\"},\"2\":{\"name\":\"Dead Zone\"},\"3\":{\"name\":\"Seedling\"},\"4\":{\"name\":\"Flutter\"},\"5\":{\"name\":\"Fae Flight\"}}},\"2404\":{\"id\":2404,\"name\":\"Ash\",\"title\":\"The War Machine\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Burst Cannon\"},\"2\":{\"name\":\"Kinetic Burst\"},\"3\":{\"name\":\"Siege Shield\"},\"4\":{\"name\":\"Shoulder Bash\"},\"5\":{\"name\":\"Assert Dominance\"}}},\"2417\":{\"id\":2417,\"name\":\"Lian\",\"title\":\"Scion of House Aico\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Heirloom Rifle\"},\"2\":{\"name\":\"Valor\"},\"3\":{\"name\":\"Presence\"},\"4\":{\"name\":\"Grace\"},\"5\":{\"name\":\"Enlightenment\"}}},\"2420\":{\"id\":2420,\"name\":\"Zhin\",\"title\":\"The Tyrant\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Inferno Blade\"},\"2\":{\"name\":\"Counter\"},\"3\":{\"name\":\"Billow\"},\"4\":{\"name\":\"Whirl\"},\"5\":{\"name\":\"Spite\"}}},\"2431\":{\"id\":2431,\"name\":\"Jenos\",\"title\":\"The Ascended\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Star Splitter\"},\"2\":{\"name\":\"Astral Mark\"},\"3\":{\"name\":\"Void Grip\"},\"4\":{\"name\":\"Stellar Wind\"},\"5\":{\"name\":\"Through Time and Space\"}}},\"2438\":{\"id\":2438,\"name\":\"Strix\",\"title\":\"Ghost Feather\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Talon Rifle (Pistol)\"},\"2\":{\"name\":\"Scope/Flair (Flare)\"},\"3\":{\"name\":\"Quick Switch\"},\"4\":{\"name\":\"Stealth\"},\"5\":{\"name\":\"Flashbang\"}}},\"2472\":{\"id\":2472,\"name\":\"Talus\",\"title\":\"of the Ska'drin\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Veracharger\"},\"2\":{\"name\":\"Blitz Upper\"},\"3\":{\"name\":\"Overcharge\"},\"4\":{\"name\":\"Rune of Travel\"},\"5\":{\"name\":\"True Power\"}}},\"2477\":{\"id\":2477,\"name\":\"Terminus\",\"title\":\"The Fallen\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Massacre Axe\"},\"2\":{\"name\":\"Calamity Blast\"},\"3\":{\"name\":\"Power Siphon\"},\"4\":{\"name\":\"Shatterfall\"},\"5\":{\"name\":\"Reanimate\"}}},\"2479\":{\"id\":2479,\"name\":\"Khan\",\"title\":\"Primus of house Aico\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Heavy Repeater\"},\"2\":{\"name\":\"Bulwark\"},\"3\":{\"name\":\"Battle Shout\"},\"4\":{\"name\":\"Commander's Grab\"},\"5\":{\"name\":\"Overpower\"}}},\"2480\":{\"id\":2480,\"name\":\"Vivian\",\"title\":\"The Cunning\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Light Machine Gun\"},\"2\":{\"name\":\"Precision Sights\"},\"3\":{\"name\":\"Deflector Shield\"},\"4\":{\"name\":\"Sensor Drone\"},\"5\":{\"name\":\"Sentinels\"}}},\"2481\":{\"id\":2481,\"name\":\"Moji\",\"title\":\"and Friends\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Familiar Spray\"},\"2\":{\"name\":\"Familiar Spit\"},\"3\":{\"name\":\"Magic Barrier\"},\"4\":{\"name\":\"Scamper\"},\"5\":{\"name\":\"Bon Appetit\"}}},\"2491\":{\"id\":2491,\"name\":\"Furia\",\"title\":\"Angel of Vengeance\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Pyre Blade\"},\"2\":{\"name\":\"Kindle Soul\"},\"3\":{\"name\":\"Pyre Strike\"},\"4\":{\"name\":\"Wings of Wrath\"},\"5\":{\"name\":\"Inflame\"}}},\"2493\":{\"id\":2493,\"name\":\"Koga\",\"title\":\"The Lost Hand\",\"class\":\"Flanker\",\"abilities\":{\"1\":{\"name\":\"Submachine Guns (Hellkite Claws)\"},\"2\":{\"name\":\"Shadow Step (Skewer)\"},\"3\":{\"name\":\"Dragon Stance\"},\"4\":{\"name\":\"Agility\"},\"5\":{\"name\":\"Cyclone Strike\"}}},\"2495\":{\"id\":2495,\"name\":\"Dredge\",\"title\":\"Admiral of the Abyss\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Cursed Howitzer\"},\"2\":{\"name\":\"Broadside\"},\"3\":{\"name\":\"Harpoon\"},\"4\":{\"name\":\"Shortcut\"},\"5\":{\"name\":\"Kraken\"}}},\"2509\":{\"id\":2509,\"name\":\"Imani\",\"title\":\"The Last Warder\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Frost Bolt (Pyre Ball)\"},\"2\":{\"name\":\"Frost Bomb (Inferno Cannon)\"},\"3\":{\"name\":\"Elemental Shift\"},\"4\":{\"name\":\"Frostfire Glide\"},\"5\":{\"name\":\"Dragon's Call\"}}},\"2512\":{\"id\":2512,\"name\":\"Atlas\",\"title\":\"The Man Out of Time\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Chrono-Cannon\"},\"2\":{\"name\":\"Setback\"},\"3\":{\"name\":\"Stasis Field\"},\"4\":{\"name\":\"Second Chance\"},\"5\":{\"name\":\"Exile\"}}},\"2517\":{\"id\":2517,\"name\":\"Io\",\"title\":\"the Shattered Goddess\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Light Bow\"},\"2\":{\"name\":\"Moonlight\"},\"3\":{\"name\":\"Guardian Spirit\"},\"4\":{\"name\":\"Lunar Leap\"},\"5\":{\"name\":\"Begone\"}}},\"2528\":{\"id\":2528,\"name\":\"Raum\",\"title\":\"Rage of the Abyss\",\"class\":\"Front Line\",\"abilities\":{\"1\":{\"name\":\"Hellfire Gatling\"},\"2\":{\"name\":\"Ignition\"},\"3\":{\"name\":\"Soul Harvest\"},\"4\":{\"name\":\"Juggernaut\"},\"5\":{\"name\":\"Cataclysm\"}}},\"2529\":{\"id\":2529,\"name\":\"Tiberius\",\"title\":\"The Weapons Master\",\"class\":\"Damage\",\"abilities\":{\"1\":{\"name\":\"Bladed Chakrams\"},\"2\":{\"name\":\"Heavy Blade\"},\"3\":{\"name\":\"Combat Trance\"},\"4\":{\"name\":\"Crouching Tigron\"},\"5\":{\"name\":\"Blade Dance\"}}},\"2533\":{\"id\":2533,\"name\":\"Corvus\",\"title\":\"The Magistrate's Blade\",\"class\":\"Support\",\"abilities\":{\"1\":{\"name\":\"Officer's Pistol\"},\"2\":{\"name\":\"Abyssal Reconstruction\"},\"3\":{\"name\":\"Mark of Fate\"},\"4\":{\"name\":\"Projection\"},\"5\":{\"name\":\"Entropic Breach\"}}}}");
    return championsJSON[id].name;
  },
  /**
   * Send message
   *
   * @param tmpMessage
   * @param tmpPlayer
   * @return {Promise<void>}
   */
  async sendChampionsMessage(tmpMessage, tmpPlayer) {
    const player = await axios.get(`https://api.paladins.guru/v3/profiles/${tmpPlayer.id}-${encodeURI(tmpPlayer.name)}/summary`)

    console.log("PLAYER: ", player);

    let championStats = player.data.champions
      .sort(e => e.gold)
      .slice(0, 5)
      .map((e) => {
        const momentDuration = moment.duration(e.playtime, 'minutes');
        const Champion = this.forceStringLength(this.championIdToName(e.id), 10);
        const Kills = this.forceStringLength(e.kills, 7);
        const Deaths = this.forceStringLength(e.deaths, 7);
        const Assists = this.forceStringLength(e.assists, 7);
        const KDAR = this.forceStringLength(
          ((e.kills + e.assists) / e.deaths).toFixed(2),
          4
        );
        const Wins = this.forceStringLength(e.wins, 6);
        const Losses = this.forceStringLength(e.losses, 6);
        const WLR = this.forceStringLength(
          (e.wins / ((e.wins + e.losses) / 100)).toFixed(2) + '%',
          6
        );
        const Gold = this.forceStringLength(e.gold, 8);
        const timePlayed = this.forceStringLength(
          `${momentDuration
            .asHours()
            .toFixed(0)}h ${momentDuration.minutes().toFixed(0)}m`,
          11
        );

        return (
          '' +
          `
|${Champion}|${Kills}|${Deaths}|${Assists}|${KDAR}|${Wins}|${Losses}|${WLR}|${Gold}|${timePlayed}|
+----------+-------+-------+-------+----+------+------+------+--------+-----------+`
        );
      })
      .join('');

    championStats =
      '' +
      `\`\`\`
+---------------------------------------------------------------------------------+
|Top 5 Champions                                                                  |
+---------------------------------------------------------------------------------+
|Champion  |Kills  |Deaths |Assists|KDA |Wins  |Losses|WLR   |Gold    |Time Played|
+----------+-------+-------+-------+----+------+------+------+--------+-----------+` +
      championStats +
      `\`\`\``;

    await tmpMessage.reply(championStats);
    console.log(`[${this.name}] replied successfully.`);
  }
};
