module.exports = store => {
	const getById = async bookId => {
		const book = await store.books.retrieve({ id: bookId });
		return book;
	};

	return {
		getById,
	};
};

