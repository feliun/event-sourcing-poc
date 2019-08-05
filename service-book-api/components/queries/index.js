const System = require('systemic');
const initQueries = require('./initQueries');

module.exports = new System({ name: 'queries' })
	.add('queries', initQueries())
	.dependsOn('store');
