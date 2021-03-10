const { TEAM_ID } = require('../../constants');
const HTBClient = require('../../wrapper');

module.exports = async (msg) => {
  try {
    const { data } = await HTBClient.getTeamMembers(TEAM_ID);
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
};
