const { join } = require('path');
const booksReducers = require('require-all')(join(__dirname, '..', '..', 'models', 'books', 'projection', 'reducers'));

module.exports = store => {
	const testQuery = async (entity, id) => {
		const commands = await store.commands.getByAggregate(entity, id);
		return commands.reduce((total, currentCommand) => {
			const reducer = booksReducers[currentCommand.operation];
			return reducer(total, currentCommand);
		}, {});
	};

	return {
		testQuery,
	};
};

