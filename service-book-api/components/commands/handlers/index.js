const debug = require('debug')('service-book-api:commands:handlers');
const { join } = require('path');
const handlers = require('require-all')(join(__dirname));

module.exports = () => {
	const start = async ({ bus, store }) => {
		const onCommandReceived = async command => {
			const { entity, operation } = command;
			const handler = handlers[entity] && handlers[entity][operation];
			if (!handler) throw new Error(`Unable to process command for entity ${entity} and operation ${operation}`);
			const { execute } = handler({ store });
			debug(`Running command for entity ${entity} and operation ${operation}...`);
			await execute(command);
		};

		bus.subscribe('handleCommand', onCommandReceived);
		return Promise.resolve();
	};

	return { start };
};
