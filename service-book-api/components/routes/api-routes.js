module.exports = () => {
	const start = async ({ app, commands, logger }) => {
		/**
		 * This endpoint creates a book
		 * @route POST /api/v1/books
		 * @group Book API - exposed HTTP API for books
		 * @returns 200 - Sucessful response
		*/
		app.post('/api/v1/books', async (req, res) => {
			const { body } = req;
			try {
				await commands.process('books', 'v1', 'create', body);
				res.json({ ok: true });
			} catch (e) {
				logger.error(e);
				res.sendStatus(500);
			}
		});

		return Promise.resolve();
	};

	return { start };
};
