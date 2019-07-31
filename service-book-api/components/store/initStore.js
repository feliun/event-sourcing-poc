const debug = require('debug')('service-book-api:store');

module.exports = () => {
	const commands = [];

	const start = async () => ({
		commands: {
			audit: async command => {
				commands.push(command);
				debug(`Current commands: ${JSON.stringify(commands)}`);
			},
		},
	});

	return { start };
};
