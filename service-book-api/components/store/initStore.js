const debug = require('debug')('service-book-api:store');
const { MongoClient } = require('mongodb');

module.exports = () => {
	const start = async ({ config }) => {
		const mongo = await MongoClient.connect(config.url, config.options);
		const db = mongo.db(config.db);
		debug('Configuring db....');
		db.collection('audit').createIndex({ entity: 1, timestamp: 1, id: 1 });

		const audit = async payload => {
			debug('Recording a new audited item...');
			await db.collection('audit').insertOne(payload);
		};

		const retrieve = async (type, id, timestamp) => {
			debug(`Retrieving commands related to type ${type} and id ${id}`);
			const result = await db.collection('audit').find({ entity: type, id, timestamp: { $lte: timestamp } }).sort({ timestamp: 1 }).toArray();
			return result;
		};

		const getByEntity = async entity => {
			debug(`Getting all commands for entity ${entity}`);
			const result = await db.collection('audit')
				.aggregate({
					$group: {
						entity,
					},
				})
				.sort({ timestamp: 1 })
				.toArray();
			return result;
		};

		return {
			commands: {
				audit,
				retrieve,
				getByEntity,
			},
		};
	};

	return {
		start,
	};
};
