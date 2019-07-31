module.exports = ({ store }) => {
	const execute = async ({ payload, timestamp, lastRecorded }) => {
		await store.books.create({
			...payload,
			timestamp,
			lastRecorded,
		});
	};

	return { execute };
};
