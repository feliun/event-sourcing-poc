const debug = require('debug')('service-book-api:books:commands:factories:create');

// TODO create this with the help of mixins
const v1 = book => {
	debug('Building "create book" command');
	return {
		entity: 'books',
		operation: 'create',
		apiVersion: 1,
		payload: book,
		timestamp: new Date(),
		lastRecorded: new Date(),
		id: 1, // TODO checksum id that identifies the actual book
	};
};

module.exports = { v1 };
