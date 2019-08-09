const debug = require('debug')('service-book-api:authors:projection:fromBooks:reducers:create');

module.exports = (author, { payload, timestamp, lastRecorded }) => {
	debug('Applying reducer to generate an author when creating a book...');
	return {
		...author,
		...payload.author,
		total_amends_cnt: author.total_amends_cnt || 0,
		total_created_cnt: (author.total_created_cnt || 0) + 1,
		timestamp,
		lastRecorded,
	};
};
