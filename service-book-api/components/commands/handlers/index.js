module.exports = () => {
	const start = async ({ bus }) => {
		const onCommandReceived = async () => {
			console.log('Got a command to handle!');
		};
		bus.subscribe('handleCommand', onCommandReceived);
		return Promise.resolve();
	};

	return { start };
};
