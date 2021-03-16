/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');

const config = require('./index');

module.exports = (client) => {
  // Inject all the commands
  Object.keys(config.cogs).forEach((cog) => {
    if (!config.cogs[cog]) return;
    // Inject Polls
    const pollPath = path.join(__dirname, '../cogs', cog, 'polls');
    const pollFiles = fs.readdirSync(pollPath).filter((file) => file.startsWith('trigger') && file.endsWith('.js'));
    for (const file of pollFiles) {
      // eslint-disable-next-line global-require
      const TriggerPoll = require(path.join(pollPath, file));
      new TriggerPoll().registerPoll(client);
    }
    // Inject commands
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
