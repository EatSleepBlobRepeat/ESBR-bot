const Command = require('./base');

const executeFunc = (msg, args)=>{
    msg.channel.send("Worldddd");
};
module.exports = [
    new Command("hello", "world", executeFunc)
];