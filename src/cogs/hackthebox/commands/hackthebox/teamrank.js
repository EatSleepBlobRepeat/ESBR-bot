const axios = require('axios');
const { TEAM_ID, HTB_HEADER } = require('../../constants');

module.exports = async (msg) => {
  try {
    const { data } = await axios.default.get(`https://www.hackthebox.eu/api/v4/team/stats/owns/${TEAM_ID}`, {
      headers: HTB_HEADER,
    });
    const title = `Team Rank is: ${data.rank}!\nRespects: ${data.respects}`;
    return msg.channel.send({ embed: { title, color: 1371762 } });
  } catch (e) {
    return msg.channel.send('Something wrong with HTB api');
  }
};
