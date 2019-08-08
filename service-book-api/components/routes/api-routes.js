module.exports = () => {
	const start = async ({ app, queries, commands, logger }) => {
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

		/**
		 * This endpoint retrieves a book
		 * @route GET /api/v1/books/:bookId
		 * @group Book API - exposed HTTP API for books
		 * @returns 200 - Sucessful response
		*/
		app.get('/api/v1/books/:bookId', async (req, res) => {
			const { params } = req;
			try {
				const book = await queries.books.getById(params.bookId);
				res.json(book);
			} catch (e) {
				logger.error(e);
				res.sendStatus(500);
			}
		});

		/**
		 * This endpoint retrieves an author
		 * @route GET /api/v1/authors/:authorId
		 * @group Author API - exposed HTTP API for authors
		 * @returns 200 - Sucessful response
		*/
		app.get('/api/v1/authors/:authorId', async (req, res) => {
			const { params } = req;
			try {
				const author = await queries.authors.getById(params.authorId);
				res.json(author);
			} catch (e) {
				logger.error(e);
				res.sendStatus(500);
			}
		});

		/**
		 * This endpoint creates a paragraph in a book
		 * @route POST /api/v1/paragraphs
		 * @group Book API - exposed HTTP API for books
		 * @returns 200 - Sucessful response
		*/
		app.post('/api/v1/books/:bookId/paragraphs', async (req, res) => {
			const { body, params } = req;
			const paragraph = {
				...body,
				bookId: params.bookId,
			};
			try {
				await commands.process('paragraphs', 'v1', 'create', paragraph);
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
