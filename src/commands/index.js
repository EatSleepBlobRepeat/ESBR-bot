/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  const commandFiles = fs.readdirSync(path.join(__dirname)).filter((file) => file.endsWith('.cmd.js'));
  for (const file of commandFiles) {
    // eslint-disable-next-line global-require
    const commands = require(path.join(__dirname, file));
    commands.forEach((command) => {
      client.commands.set(command.name, command);
    });
  }
};
