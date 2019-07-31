module.exports = () => {
	const start = async () => ({
		book: {
			create: {
				v1: book => ({
					operation: 'create',
					entity: 'book',
					apiVersion: 1,
					payload: book,
					timestamp: new Date(),
					lastRecorded: new Date(),
					// TODO checksum id
				}),
			},
		},
	});

	return { start };
};
