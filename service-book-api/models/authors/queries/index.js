module.exports = store => {
	const getById = async authorId => {
		const author = await store.authors.retrieve({ id: authorId });
		return author;
	};

	return {
		getById,
	};
};

