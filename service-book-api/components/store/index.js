const System = require('systemic');
const initStore = require('./initStore');

module.exports = new System({ name: 'store' })
	.add('store', initStore())
	.dependsOn('logger');
