const { join } = require('path');
const reducers = require('require-all')(join(__dirname, 'reducers'));
const debug = require('debug')('service-book-api:authors:projection');

module.exports = store => async command => {
	debug(`Retrieving all commands for books and id ${command.id}`);
	const commands = await store.commands.retrieve('books', command.id, command.timestamp);
	debug(`Generating projection for authors and command id ${command.id}...`);
	return commands.reduce((total, currentCommand) => {
		const reducer = reducers[currentCommand.operation];
		return reducer(total, currentCommand);
	}, {});
};
