const Command = require('../../base/commands/base');

const executeFunc = (msg) => {
  msg.channel.send('Worldddd');
};
module.exports = [
  new Command('hello', '| sends \'world\'', executeFunc),
];
