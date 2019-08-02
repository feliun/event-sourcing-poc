const debug = require('debug')('service-book-api:paragraphs:projection:reducers:create');

module.exports = (_, { payload, timestamp, lastRecorded }) => {
	debug('Applying reducer to create a paragraph...');
	return {
		...payload,
		timestamp,
		lastRecorded,
	};
};
