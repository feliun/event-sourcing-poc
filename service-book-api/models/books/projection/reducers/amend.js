const debug = require('debug')('service-book-api:books:projection:reducers:amend');

module.exports = (book, { payload, timestamp, lastRecorded }) => {
	debug('Applying reducer to amend a book...');
	return {
		...book,
		...payload,
		timestamp,
		lastRecorded,
	};
};
