const debug = require('debug')('service-book-api:store');
const { MongoClient } = require('mongodb');

module.exports = () => {
	const onlyTest = fn => (...args) => {
		if (process.env.SERVICE_ENV !== 'test') throw new Error('Function only available in test mode!');
		return fn(...args);
	};

	const start = async ({ config }) => {
		const mongo = await MongoClient.connect(config.url, config.options);
		const db = mongo.db(config.db);
		debug('Configuring db....');
		db.collection('audit').createIndex({ entity: 1, timestamp: 1, id: 1 });
		db.collection('books').createIndex({ id: 1 });

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

		const upsert = async book => {
			await db.collection('books').updateOne({ id: book.id }, { $set: book }, { upsert: true });
			return book;
		};

		const retrieveBook = async query => {
			debug(`Retrieving book with query ${JSON.stringify(query)}`);
			const result = await db.collection('books').findOne(query);
			return result;
		};

		const purge = async () => {
			await db.collection('audit').deleteMany({});
			await db.collection('books').deleteMany({});
		};

		return {
			purge: onlyTest(purge),
			commands: {
				audit,
				retrieve,
				getByEntity,
			},
			books: {
				upsert,
				retrieve: retrieveBook,
			},
		};
	};

	return {
		start,
	};
};
