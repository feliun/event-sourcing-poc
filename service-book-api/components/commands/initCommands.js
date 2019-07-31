module.exports = () => {
	const start = async ({ factories, store, bus }) => {
		const publishCommand = bus.publish('commandReceived');
		const books = {
			v1: {
				create: async book => {
					const command = factories.book.create.v1(book);
					// TODO validation happens inside
					// TODO create this with the help of mixins
					await store.commands.audit(command);
					await publishCommand(command);
				},
			},
		};

		return { books };
	};

	return { start };
};
