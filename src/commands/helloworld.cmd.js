const Command = require('./base');

const executeFunc = (msg) => {
  msg.channel.send('Worldddd');
};
module.exports = [
  new Command('hello', 'world', executeFunc),
];
