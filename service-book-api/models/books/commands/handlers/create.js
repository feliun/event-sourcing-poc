// -> book/projection/ -> apply all reducers (potentially cache it)
// -> generate event -> publish
const debug = require('debug')('service-book-api:books:commands:handlers:create');
const initProjection = require('../../projection');

module.exports = ({ store }) => {
	const project = initProjection(store);

	const execute = async command => {
		debug('Running handler for any "book create" command...');
		const projection = await project(command);
		console.log(projection);
		debug('Later on I will construct an event and publish');
	};

	return { execute };
};
