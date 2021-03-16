const Command = require('../../base/commands/base');

const contributions = require('./hackthebox/contributions');
const lastHacksTeam = require('./hackthebox/lasthacks.team');
const teamRanks = require('./hackthebox/teamrank');
const htbUtil = require('./hackthebox/htbutil');

module.exports = [
  new Command('teamrank', '| Get htb team rank', teamRanks),
  new Command('lasthacks', '<numdays> [by <user>] [limit <number>] | Get htb box completion stats', lastHacksTeam),
  new Command('contributions', '| Get contributions', contributions),
  new Command('leaderboard', '| Contributions alias', contributions),
  new Command('htbutil', '| various utilities', htbUtil),
];
