const { join } = require('path');
const reducers = require('require-all')(join(__dirname, 'reducers'));
const debug = require('debug')('service-book-api:paragraphs:projection');

module.exports = store => async command => {
	debug(`Retrieving all commands for paragraphs and id ${command.id}`);
	const commands = await store.commands.retrieve('paragraphs', command.id);
	debug(`Generating projection for paragraphs and id ${command.id}...`);
	return commands.reduce((total, currentCommand) => {
		const reducer = reducers[currentCommand.operation];
		return reducer(total, currentCommand);
	}, {});
};
