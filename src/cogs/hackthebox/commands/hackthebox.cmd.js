const Command = require('../../base/commands/base');

const contributions = require('./hackthebox/contributions');
const lastHacksTeam = require('./hackthebox/lasthacks.team');
const teamRanks = require('./hackthebox/teamrank');

module.exports = [
  new Command('teamrank', 'Get htb team rank', teamRanks),
  new Command('lasthacks', 'Get htb box completion stats', lastHacksTeam),
  new Command('contributions', 'Get contributions', contributions),
];
