const axios = require('axios').default;
const { HTB_HEADER } = require('../constants');

class HackTheBoxClient {
  static getTeamOwns(teamid) {
    return axios.default.get(`https://www.hackthebox.eu/api/v4/team/stats/owns/${teamid}`, {
      headers: HTB_HEADER,
    });
  }

  static getTeamMembers(teamid) {
    return axios.default.get(`https://www.hackthebox.eu/api/v4/team/members/${teamid}`, {
      headers: HTB_HEADER,
    });
  }

  static getMemberActivity(memberID) {
    return axios.default.get(`https://www.hackthebox.eu/api/v4/user/profile/activity/${memberID}`, {
      headers: HTB_HEADER,
    });
  }
}

module.exports = HackTheBoxClient;
