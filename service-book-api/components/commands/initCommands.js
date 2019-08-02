const debug = require('debug')('service-book-api:commands');
const { join } = require('path');
const models = require('require-all')(join(__dirname, '..', '..', 'models'));

module.exports = () => {
	const start = async ({ store, bus }) => {
		const publishCommand = bus.publish('commandReceived');
		const process = async (entity, version, action, payload) => {
			const factory = models[entity].commands.factories[action][version];
			const command = factory(payload); // TODO validation happens inside
			await store.commands.audit(command);
			await publishCommand(command);
		};

		const reindex = async entity => {
			const commands = await store.commands.getByEntity(entity);
			return Promise.all(commands.map(publishCommand));
		};

		const onCommandReceived = async command => {
			const { entity, operation } = command;
			debug(`Command received! Entity ${entity} and operation ${operation}...`);
			const handler = models[entity] && models[entity].commands.handlers[operation];
			if (!handler) throw new Error(`Unable to process command for entity ${entity} and operation ${operation}`);
			const { execute } = handler({ store, bus });
			await execute(command);
		};

		bus.subscribe('handleCommand', onCommandReceived);

		return { process, reindex };
	};

	return { start };
};
