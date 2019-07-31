module.exports = () => {
	const start = async ({ factories }) => {
		const books = {
			v1: {
				create: async book => {
					const command = factories.book.create.v1(book); // TODO validation happens inside
					console.log(command);
					// TODO await store.audit(command)
					// TODO await bus.publish
				},
			},
		};

		return { books };
	};

	return { start };
};
