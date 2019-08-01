const debug = require('debug')('service-book-api:commands');
const { join } = require('path');
const models = require('require-all')(join(__dirname, '..', '..', 'models'));

module.exports = () => {
	const start = async ({ store, bus }) => {
		const publishCommand = bus.publish('commandReceived');
		// TODO this should be a generic "processCommand" - creates the command, audit and publish
		const booksApi = {
			v1: {
				create: async book => {
					const command = models.books.commands.factories.create.v1(book);
					// TODO validation happens inside
					await store.commands.audit(command);
					await publishCommand(command);
				},
			},
		};

		// on command subscription -> book/handler/execute (per type to know which event to create)
		const onCommandReceived = async command => {
			const { entity, operation } = command;
			debug(`Command received! Entity ${entity} and operation ${operation}...`);
			const handler = models[entity] && models[entity].commands.handlers[operation];
			if (!handler) throw new Error(`Unable to process command for entity ${entity} and operation ${operation}`);
			const { execute } = handler({ store, bus });
			await execute(command);
		};

		bus.subscribe('handleCommand', onCommandReceived);

		return { books: booksApi };
	};

	return { start };
};
