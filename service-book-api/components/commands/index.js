const System = require('systemic');
const initFactories = require('./factories');
const initHandlers = require('./handlers');
const initCommands = require('./initCommands');

module.exports = new System({ name: 'commands' })
	.add('commands.factories', initFactories())
	.add('commands.handlers', initHandlers())
	.dependsOn('bus', 'store')
	.add('commands', initCommands())
	.dependsOn(
		'store',
		'bus',
		{ component: 'commands.factories', destination: 'factories' });
