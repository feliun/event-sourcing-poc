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
