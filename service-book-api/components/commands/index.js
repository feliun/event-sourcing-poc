const System = require('systemic');
const initHandlers = require('./handlers');
const initCommands = require('./initCommands');

module.exports = new System({ name: 'commands' })
	.add('commands.handlers', initHandlers())
	.dependsOn('bus', 'store')
	.add('commands', initCommands())
	.dependsOn('store', 'bus');
