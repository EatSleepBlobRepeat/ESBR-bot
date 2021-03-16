const { TEAM_ID } = require('../../constants');
const HTBClient = require('../../wrapper');
const config = require('../../../../config');

module.exports = async (msg) => {
  try {
    const { data } = await HTBClient.getTeamMembers(TEAM_ID);
    const embed = {
      title: `Team Contribution: (Cutoff ${config.hackthebox.min_points})`,
      color: 1371762,
    };
    embed.fields = data.sort((a, b) => a.rank - b.rank).map((user) => ({
      name: `HOF-${user.rank} | ${user.points < config.hackthebox.min_points ? ':red_circle: ' : ''}${user.name}`,
      value: `with ${user.points} points`,
    }));
    return msg.channel.send({ embed });
  } catch (e) {
    return msg.channel.send('Something wrong with HTB api');
  }
};
