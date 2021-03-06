/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');

const config = require('./index');
const TriggerAnnouncement = require('../cogs/hackthebox/polls/triggerAnnouncement');
const TriggerShameAlert = require('../cogs/hackthebox/polls/triggerShameAlerts');

module.exports = (client) => {
  // inject polling
  new TriggerAnnouncement().registerPoll(client);
  new TriggerShameAlert().registerPoll(client);
  // Inject all the commands
  Object.keys(config.cogs).forEach((cog) => {
    if (!config.cogs[cog]) return;
    const dirPath = path.join(__dirname, '../cogs', cog, 'commands');
    const commandFiles = fs.readdirSync(dirPath).filter((file) => file.endsWith('.cmd.js'));
    for (const file of commandFiles) {
      // eslint-disable-next-line global-require
      const commands = require(path.join(dirPath, file));
      commands.forEach((command) => {
        client.commands.set(command.name, command);
      });
    }
  });
};
