const { join } = require('path');
const { books } = require('require-all')(join(__dirname, '..', '..', 'models'));

module.exports = () => {
	const start = async ({ store, bus }) => {
		const publishCommand = bus.publish('commandReceived');
		const booksApi = {
			v1: {
				create: async book => {
					const command = books.commands.factories.create.v1(book);
					// TODO validation happens inside
					// TODO create this with the help of mixins
					await store.commands.audit(command);
					await publishCommand(command);
				},
			},
		};

		return { books: booksApi };
	};

	return { start };
};
