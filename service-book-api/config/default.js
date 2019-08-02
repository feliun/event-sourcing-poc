module.exports = {
	server: {
		host: '0.0.0.0',
		port: 4000,
	},
	bus: {
		subscriptions: {
			handleCommand: 'book-api.v1.command.received',
		},
		publications: {
			commandReceived: 'book-api.v1.command.received',
			bookCreated: 'book-api.v1.book.created',
			bookAmended: 'book-api.v1.book.amended',
		},
	},
	store: {
		url: process.env.MONGO_URL || 'mongodb://node:node@localhost:27017/eventsourcing',
		db: process.env.MONGO_DB || 'eventsourcing',
		options: { useNewUrlParser: true },
	},
	routes: {
		admin: {
			swaggerOptions: {
				swaggerDefinition: {
					info: {
						description: 'Documentation for service-book-api',
						title: 'service-book-api',
						version: '1.0.0',
					},
					host: process.env.SERVICE_ENV || 'localhost:4000',
					basePath: '/v1',
					produces: ['application/json'],
					schemes: ['http'],
					securityDefinitions: {
						JWT: {
							type: 'apiKey',
							in: 'header',
							name: 'Authorization',
							description: '',
						},
					},
				},
			},
		},
	},
	logger: {
		transport: 'console',
		include: [
			'tracer',
			'timestamp',
			'level',
			'message',
			'error.message',
			'error.code',
			'error.stack',
			'request.url',
			'request.headers',
			'request.params',
			'request.method',
			'response.statusCode',
			'response.headers',
			'response.time',
			'process',
			'system',
			'package.name',
			'service',
		],
		exclude: ['password', 'secret', 'token', 'request.headers.cookie', 'dependencies', 'devDependencies'],
	},
};
