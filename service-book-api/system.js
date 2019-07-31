const System = require('systemic');
const { join } = require('path');

module.exports = () =>
	new System({ name: 'service-book-api' })
		.bootstrap(join(__dirname, 'components'));

