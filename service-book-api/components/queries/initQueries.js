const debug = require('debug')('service-book-api:queries');
const { join } = require('path');
const models = require('require-all')(join(__dirname, '..', '..', 'models'));

const adhocQueries = require('./adhocQueries');


module.exports = () => {
	const start = async ({ store }) => {
		const queries = {};
		Object.keys(models).forEach(model => {
			debug(`Setting up queries for model ${model}...`);
			queries[model] = models[model].queries && models[model].queries.index(store);
		});


		return { adhoc: adhocQueries(store), ...queries };
	};

	return { start };
};
