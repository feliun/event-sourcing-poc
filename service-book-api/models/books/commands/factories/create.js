const v1 = book => ({
	entity: 'book',
	operation: 'create',
	apiVersion: 1,
	payload: book,
	timestamp: new Date(),
	lastRecorded: new Date(),
	// TODO checksum id
});

module.exports = { v1 };
