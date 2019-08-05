const expect = require('expect.js');
const system = require('../../system');
const supertest = require('supertest');
const book = require('../fixtures/book.json');

describe('Books API Tests', () => {
	let request;
	const sys = system();
	let purge;

	before(async () => {
		const { app, store } = await sys.start();
		request = supertest(app);
		purge = store.purge;
	});

	afterEach(async () => {
		await purge();
	});

	after(() => sys.stop());

	const create = async payload =>
		request
			.post('/api/v1/books')
			.send(payload)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200);

	const amend = async (id, payload) =>
		request
			.put(`/api/v1/books/${id}`)
			.send(payload)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200);

	const get = async bookId =>
		request
			.get(`/api/v1/books/${bookId}`)
			.expect(200);

	it('returns manifest', () =>
		request
			.get('/__/manifest')
			.expect(200)
			.then(response => {
				expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
			}));

	it('creates a new book', async () => {
		const response = await create(book);
		expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
		expect(response.body).to.eql({ ok: true });
		const getResponse = await get(book.id);
		expect(getResponse.body.id).to.equal(book.id);
		expect(getResponse.body.title).to.equal(book.title);
		expect(getResponse.body.author).to.equal(book.author);
		expect(getResponse.body).to.have.keys('timestamp', 'lastRecorded');
	});

	it('amends a book', async () => {
		await create(book);
		await amend(book.id, { ...book, city: 'Madrid' });
		const getResponse = await get(book.id);
		expect(getResponse.body.city).to.equal('Madrid');
	});

	it('amends a book multiple times', async () => {
		await create(book);
		await amend(book.id, { ...book, city: 'Madrid' });
		const getResponse = await get(book.id);
		expect(getResponse.body.city).to.equal('Madrid');
		await amend(book.id, { ...book, city: 'Madrid', phone: 1111 });
		const newGetResponse = await get(book.id);
		expect(newGetResponse.body.phone).to.equal(1111);
	});
});
