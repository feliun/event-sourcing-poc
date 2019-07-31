module.exports = () => {
	const start = async () => ({
		book: {
			create: {
				v1: book => ({
					entity: 'book',
					operation: 'create',
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
