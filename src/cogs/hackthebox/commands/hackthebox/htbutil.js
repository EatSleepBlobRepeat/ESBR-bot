const { generateResource, getResource, saveResource } = require('../../utils/resourceManager');

const usernameMap = async (msg, args) => {
  if (args.length !== 2) {
    throw Error('Wrong args!');
  }
  // update member
  await generateResource();
  const members = getResource('dynamic', 'members');
  const usernameMapRes = getResource('dynamic', 'username_map');
  const theMember = members.find((mem) => mem.name === args[0]);
  if (theMember) {
    // eslint-disable-next-line prefer-destructuring
    usernameMapRes[theMember.name] = args[1];
    saveResource('dynamic', 'username_map', usernameMapRes);
    msg.channel.send(`Member with name ${args[0]} updated!`);
  } else {
    msg.channel.send(`Member with name ${args[0]} not found!`);
  }
};

module.exports = async (msg, /** @type {[]} */args) => {
  try {
    switch (args[0]) {
      case 'usermap': return await usernameMap(msg, args.slice(1));
      default:
        return msg.channel.send('wrong args!');
    }
  } catch (e) {
    console.log(e);
    return msg.channel.send('Something went wrong or wrong args lol');
  }
};
