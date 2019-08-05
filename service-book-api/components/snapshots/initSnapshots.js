const debug = require('debug')('service-book-api:snapshots');
const { join } = require('path');
const models = require('require-all')(join(__dirname, '..', '..', 'models'));

module.exports = () => {
	const start = async ({ store, bus }) => {
		const hasSnapshot = section => section.snapshots;
		const extractSnapshot = hasSnapshot;
		const flatten = (total, list) => total.concat(list);

		const snapshots = Object.values(models)
			.filter(hasSnapshot)
			.map(extractSnapshot)
			.map(({ index }) => index(store))
			.reduce(flatten, []);

		snapshots.forEach(({ subscription, handler, publication }) => {
			const generalHandler = async payload => {
				const response = await handler(payload);
				debug(`Taking snapshot for subscription ${subscription}...`);
				await bus.publish(publication)(response);
			};
			debug(`Setting up subscription ${subscription}...`);
			bus.subscribe(subscription, generalHandler);
		});
	};

	return { start };
};
