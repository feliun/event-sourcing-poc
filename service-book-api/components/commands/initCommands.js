module.exports = () => {
	const start = async ({ factories, store }) => {
		const books = {
			v1: {
				create: async book => {
					const command = factories.book.create.v1(book);
					// TODO validation happens inside
					// TODO create this with the help of mixins
					await store.commands.audit(command);
					// TODO await bus.publish
				},
			},
		};

		return { books };
	};

	return { start };
};
