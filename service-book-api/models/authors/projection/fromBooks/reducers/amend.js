const debug = require('debug')('service-book-api:authors:projection:fromBooks:reducers:amend');

module.exports = (author, { payload, timestamp, lastRecorded }) => {
	debug('Applying reducer to generate an author when amending a book...');
	return {
		...author,
		...payload.author,
		total_amends_cnt: author.total_amends_cnt + 1,
		timestamp,
		lastRecorded,
	};
};
