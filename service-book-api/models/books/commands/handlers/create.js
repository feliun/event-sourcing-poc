// -> book/projection/ -> apply all reducers (potentially cache it)
// -> generate event -> publish

const debug = require('debug')('service-book-api:commands:handlers:create');

module.exports = ({ store, bus }) => {
	const execute = async (command) => {
    const bookCommands = await store.commands.retrieve('books', command.id);
    console.log(bookCommands);
		console.log('Calling the projection, which will access the store, and apply all reducers');
		console.log('Later on I will construct an event and publish');
	};

	return { execute };
};
