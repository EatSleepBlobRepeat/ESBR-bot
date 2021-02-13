const axios = require('axios');
const Command = require('./base');
const HTBparser = require('./hackthebox/hacktheboxParser');
const { TEAM_ID, HTB_HEADER } = require('./hackthebox/constants');

const commands = {
  teamrankFunc: async (msg) => {
    try {
      const { data } = await axios.default.get(`https://www.hackthebox.eu/api/v4/team/stats/owns/${TEAM_ID}`, {
        headers: HTB_HEADER,
      });
      const title = `Team Rank is: ${data.rank}!\nRespects: ${data.respects}`;
      return msg.channel.send({ embed: { title, color: 1371762 } });
    } catch (e) {
      return msg.channel.send('Something wrong with HTB api');
    }
  },
  /// //////////////////////////////////////
  lasthacks: async (msg, args) => {
    try {
      const parsedArgs = HTBparser(args);
      try {
        const { data } = await axios.default.get(`https://www.hackthebox.eu/api/v4/team/activity/${TEAM_ID}`, {
          params: { n_past_days: parsedArgs.day },
          headers: HTB_HEADER,
        });
        const embed = {
          title: `Hacks in Last ${parsedArgs.day} days!`,
          color: 1371762,
        };
        let resultSize = 0;
        embed.fields = [];
        for (let i = 0; i < data.length; i += 1) {
          const pwns = data[i];
          let embedstr = '';
          if (parsedArgs.by !== null && pwns.user.name !== parsedArgs.by) {
            continue;
          }
          if (parsedArgs.limit !== null && parsedArgs.limit === resultSize) {
            break;
          }
          resultSize += 1;
          if (pwns.object_type === 'challenge') {
            embedstr += `Fucked \`${pwns.name}\` ${pwns.challenge_category} ${pwns.object_type} and got us ${pwns.points} points`;
          } else {
            embedstr += `Fucked \`${pwns.type}\` of ${pwns.object_type} \`${pwns.name}\` and got us ${pwns.points} points`;
          }
          embed.fields.push({
            name: pwns.user.name,
            value: embedstr,
            inline: false,
          });
        }
        return await msg.channel.send({ embed });
      } catch (e) {
        console.log(e);
        return await msg.channel.send('Something wrong with HTB api');
      }
    } catch (e) {
      return msg.channel.send(`<@${msg.author.id}>, You dumb fuck!\nBtw, the command is \`-lasthacks <numdays> [by <user>] [limit <number>]\``);
    }
  },
  contributions: async (msg) => {
    try {
      const { data } = await axios.default.get(`https://www.hackthebox.eu/api/v4/team/members/${TEAM_ID}`, {
        headers: HTB_HEADER,
      });
      const embed = {
        title: 'Team Contribution:',
        color: 1371762,
      };
      embed.fields = data.sort((a, b) => b.points - a.points).map((user) => ({
        name: `${user.points < 150 ? ':red_circle: ' : ''}${user.name}`,
        value: `with ${user.points} points`,
      }));
      return msg.channel.send({ embed });
    } catch (e) {
      return msg.channel.send('Something wrong with HTB api');
    }
  },
};

module.exports = [
  new Command('teamrank', 'Get htb team rank', commands.teamrankFunc),
  new Command('lasthacks', 'Get htb box completion stats', commands.lasthacks),
  new Command('contributions', 'Get contributions', commands.contributions),
];
