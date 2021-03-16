const Command = require('../../base/commands/base');
const config = require('../../../config');

const executeFunc = (msg) => {
  const { commands } = msg.client;
  const message = Array.from(commands.values()).map((v) => `${config.prefix}${v.help()}`).join('\n');
  msg.channel.send(`\`\`\`md\n${message}\n\`\`\``);
};
module.exports = [
  new Command('help', '| Get some help!', executeFunc),
];
