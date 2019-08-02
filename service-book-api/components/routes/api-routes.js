module.exports = () => {
	const start = async ({ app, commands, logger }) => {
		/**
		 * This endpoint reindexes all books commands
		 * @route POST /api/v1/books/reindex
		 * @group Book API - exposed HTTP API for books
		 * @returns 200 - Sucessful response
		*/
		app.post('/api/v1/books/reindex', async (req, res) => {
			try {
				await commands.reindex('books');
				res.json({ ok: true });
			} catch (e) {
				logger.error(e);
				res.sendStatus(500);
			}
		});

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

		/**
		 * This endpoint amends a book
		 * @route PUT /api/v1/books/:bookId
		 * @group Book API - exposed HTTP API for books
		 * @returns 200 - Sucessful response
		*/
		app.put('/api/v1/books/:bookId', async (req, res) => {
			const { body, params } = req;
			const book = {
				...body,
				id: params.bookId,
			};
			try {
				await commands.process('books', 'v1', 'amend', book);
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
