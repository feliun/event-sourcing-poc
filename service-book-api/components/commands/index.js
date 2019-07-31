const System = require('systemic');
const initFactories = require('./factories');
const initHandlers = require('./handlers');
const initCommands = require('./initCommands');

module.exports = new System({ name: 'commands' })
	.add('commands.factories', initFactories())
	.dependsOn('config', 'logger')
	.add('commands.handlers', initHandlers())
	.dependsOn('config', 'logger')
	.add('commands', initCommands())
	.dependsOn({ component: 'commands.factories', destination: 'factories' }, { component: 'commands.handlers', destination: 'handlers' });
