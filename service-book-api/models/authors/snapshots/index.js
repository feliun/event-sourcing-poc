module.exports = store => {
	const persistAuthor = async author => {
		const response = await store.authors.upsert(author);
		return response;
	};
	return [
		{
			subscription: 'persistAuthorUpdated',
			handler: persistAuthor,
			publication: 'authorPersisted',
		},
	];
};
