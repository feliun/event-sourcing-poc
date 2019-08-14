// This could be injected rather than harcoded, I did it this way to simplify it
const initBookProjection = require('../../books/projection');

/*
Generally with queries we will have the option to retrieve
- a cached version generated out of a snapshot (coming from the store)
- a fresh version generated out of a projection. We reuse the "projections" already created to process the commands, since entity generation from reducers application will work exactly in the same way
*/

module.exports = store => {
	const projectBook = initBookProjection(store);

	const getById = async bookId => {
		const book = await store.books.retrieve({ id: bookId });
		return book;
	};

	const adhoc = async bookId => {
		const projectedBook = await projectBook({ id: bookId, timestamp: new Date() });
		return projectedBook;
	};

	return {
		getById,
		adhoc,
	};
};

