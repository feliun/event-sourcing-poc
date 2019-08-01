module.exports = ({ store }) => {
	const execute = async ({ payload, timestamp, lastRecorded }) => {
		await store.books.create({
			...payload,
			timestamp,
			lastRecorded,
		});
		// CREATE SHOULD BE A REDUCER that returns the initial book
	};

	return { execute };
};
