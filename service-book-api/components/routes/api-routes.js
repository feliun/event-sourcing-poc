module.exports = () => {
	const start = async ({ manifest = {}, app }) => {
		/**
		 * This endpoint creates a book
		 * @route POST /api/v1/book
		 * @group Book API - exposed HTTP API for books
		 * @returns 200 - Sucessful response
		*/
		app.post('/api/v1/book', (req, res) => res.json(manifest));

		return Promise.resolve();
	};

	return { start };
};
