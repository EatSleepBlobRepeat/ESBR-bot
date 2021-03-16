/* eslint-disable global-require */
const Discord = require('discord.js');
const BOT_CONFIG = require('./config');
const { generateResource, loadResource } = require('./cogs/hackthebox/utils/resourceManager');

(async () => {
  await generateResource();
  const loadedResource = await loadResource();
  const client = new Discord.Client({ disableEveryone: false });
  const commandHandler = require('./config/injectCogs');
  Object.keys(loadedResource).forEach((resource) => {
    client[resource] = loadedResource[resource];
  });
  client.commands = new Discord.Collection();
  commandHandler(client);

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', async (msg) => {
    if (!msg.content.startsWith(BOT_CONFIG.prefix) || msg.author.bot) {
      return;
    }
    const args = msg.content.slice(BOT_CONFIG.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(command, args);
    const commandObject = client.commands.get(command);
    if (commandObject) {
      commandObject.execute(msg, args);
    }
  });

  client.login(process.env.DISCORD_TOKEN);
})();
