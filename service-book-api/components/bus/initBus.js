const debug = require('debug')('service-book-api:bus');
const { EventEmitter } = require('events');

module.exports = () => {
	let emitter;
	const start = async ({ config: { subscriptions, publications } }) => {
		emitter = new EventEmitter();

		const publish = publication => async payload => {
			const channel = publications[publication];
			debug(`Publishing message on channel ${channel}...`);
			emitter.emit(channel, payload);
		};

		const subscribe = (subscription, handler) => {
			const channel = subscriptions[subscription];
			debug(`Just received a message from channel ${channel}...`);
			emitter.on(channel, handler);
		};

		return {
			publish,
			subscribe,
		};
	};

	return { start };
};
