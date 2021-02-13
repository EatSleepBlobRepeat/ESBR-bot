module.exports = (client) => {
	const fs = require('fs');
	const path = require('path');
	const commandFiles = fs.readdirSync(path.join(__dirname)).filter(file => file.endsWith('.cmd.js'));
	for (const file of commandFiles) {
		const commands = require(path.join(__dirname, file));
		commands.forEach(command => {
			client.commands.set(command.name, command);
		});
	}
}