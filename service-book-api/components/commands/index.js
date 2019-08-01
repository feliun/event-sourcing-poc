const System = require('systemic');
const initCommands = require('./initCommands');

module.exports = new System({ name: 'commands' })
	.add('commands', initCommands())
	.dependsOn('store', 'bus');
