module.exports = store => {
	const persistBook = async book => {
		const response = await store.books.upsert(book);
		return response;
	};
	return [
		{
			subscription: 'persistBookCreation',
			handler: persistBook,
			publication: 'bookPersisted',
		},
		{
			subscription: 'persistBookAmendment',
			handler: persistBook,
			publication: 'bookPersisted',
		},
	];
};
