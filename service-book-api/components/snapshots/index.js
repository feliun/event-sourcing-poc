const System = require('systemic');
const initSnapshots = require('./initSnapshots');

module.exports = new System({ name: 'snapshots' })
	.add('snapshots', initSnapshots())
	.dependsOn('store', 'bus');
