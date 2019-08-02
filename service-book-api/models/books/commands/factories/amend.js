const debug = require('debug')('service-book-api:books:commands:factories:amend');

const v1 = book => {
	debug('Building "amend book" command');
	return {
		entity: 'books',
		operation: 'amend',
		apiVersion: 1,
		payload: book,
		timestamp: new Date(),
		lastRecorded: new Date(),
		id: '1', // TODO checksum id that identifies the actual book
	};
};

module.exports = { v1 };
