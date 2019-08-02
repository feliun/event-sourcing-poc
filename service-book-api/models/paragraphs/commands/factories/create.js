const debug = require('debug')('service-book-api:paragraphs:commands:factories:create');

// TODO create this with the help of mixins
const v1 = paragraph => {
	debug('Building "create paragraph" command');
	return {
		entity: 'paragraphs',
		operation: 'create',
		apiVersion: 1,
		payload: paragraph,
		timestamp: new Date(),
		lastRecorded: new Date(),
		id: '1', // TODO checksum id that identifies the actual paragraph
	};
};

module.exports = { v1 };
