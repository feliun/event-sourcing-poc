const debug = require('debug')('service-book-api:books:projection:reducers:create');

module.exports = (_, { payload, timestamp, lastRecorded }) => {
	debug('Applying reducer to create a book...');
	return {
		...payload,
		timestamp,
		lastRecorded,
	};
};
