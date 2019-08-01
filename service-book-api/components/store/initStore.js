const debug = require('debug')('service-book-api:store');

module.exports = () => {
	const commands = [];
	const books = [];

	const start = async () => ({
		commands: {
			audit: async command => {
				commands.push(command);
				debug(`Current commands: ${JSON.stringify(commands)}`);
			},
			retrieve: async (type, id) => {
				debug(`Retrieving commands related to type ${type} and id ${id}`);
				return commands
					.filter(command => command.entity === type && command.id === id)
					.sort(command => command.timestamp);
			},
		},
		books: {
			create: async book => {
				books.push(book);
				debug(`Current books: ${JSON.stringify(books)}`);
			},
		},
	});

	return { start };
};
