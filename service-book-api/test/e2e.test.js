const expect = require('expect.js');
const system = require('../system');
const supertest = require('supertest');
const book = require('./fixtures/book.json');

describe('e2e tests', () => {
	let request;
	const sys = system();
	let purge;

	before(async () => {
		const { app, store } = await sys.start();
		request = supertest(app);
		purge = store.purge;
		await purge();
	});

	afterEach(async () => {
		await purge();
	});

	after(() => sys.stop());

	const createBook = async payload =>
		request
			.post('/api/v1/books')
			.send(payload)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200);

	const amendBook = async (id, payload) =>
		request
			.put(`/api/v1/books/${id}`)
			.send(payload)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200);

	const getBook = async bookId =>
		request
			.get(`/api/v1/books/${bookId}`)
			.expect(200);

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	const DIGESTION_TIME = 200;

	describe('Books API', () => {
		it('returns manifest', () =>
			request
				.get('/__/manifest')
				.expect(200)
				.then(response => {
					expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
				}));

		it('creates a new book', async () => {
			const response = await createBook(book);
			expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
			expect(response.body).to.eql({ ok: true });
			const getResponse = await getBook(book.id);
			expect(getResponse.body.id).to.equal(book.id);
			expect(getResponse.body.title).to.equal(book.title);
			expect(getResponse.body.author).to.equal(book.author);
			expect(getResponse.body).to.have.keys('timestamp', 'lastRecorded');
		});

		it('amends a book', async () => {
			await createBook(book);
			await amendBook(book.id, { ...book, city: 'Madrid' });
			await delay(DIGESTION_TIME);
			const getResponse = await getBook(book.id);
			expect(getResponse.body.city).to.equal('Madrid');
		});

		it('amends a book multiple times', async () => {
			await createBook(book);
			await amendBook(book.id, { ...book, city: 'Madrid' });
			await delay(DIGESTION_TIME);
			const getResponse = await getBook(book.id);
			expect(getResponse.body.city).to.equal('Madrid');
			await amendBook(book.id, { ...book, city: 'Madrid', phone: 1111 });
			await delay(DIGESTION_TIME);
			const newGetResponse = await getBook(book.id);
			expect(newGetResponse.body.phone).to.equal(1111);
		});
	});
});
