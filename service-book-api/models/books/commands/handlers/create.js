const debug = require('debug')('service-book-api:books:commands:handlers:create');
const initBookProjection = require('../../projection');
const initAuthorProjection = require('../../../authors/projection/fromBooks');
const { join } = require('path');
const bookEventFactories = require('require-all')(join(__dirname, '..', '..', 'events', 'factories'));
const authorEventFactories = require('require-all')(join(__dirname, '..', '..', '..', '..', 'models', 'authors', 'events', 'factories'));

module.exports = ({ store, bus }) => {
	const projectBook = initBookProjection(store);
	const projectAuthor = initAuthorProjection(store);

	const processBook = async command => {
		const bookProjection = await projectBook(command);
		const { publication, payload } = bookEventFactories[command.operation](bookProjection);
		await bus.publish(publication)(payload);
	};

	const processAuthor = async command => {
		const authorProjection = await projectAuthor(command);
		const { publication: authorPublication, payload: authorPayload } = authorEventFactories.update(authorProjection);
		await bus.publish(authorPublication)(authorPayload);
	};

	const execute = async command => {
		debug('Running handler for any "book create" command...');
		await Promise.all([
			processBook(command),
			processAuthor(command),
		]);
	};

	return { execute };
};
