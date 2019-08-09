# event-sourcing-poc
An event sourcing/CQRS POC using systemic

## Architecture diagram

![alt text](https://github.com/feliun/event-sourcing-poc/blob/master/Event%20sourcing.png?raw=true)

## Usage
Start the service by doing

```
npm install
npm run docker
npm run start
````

You will need Docker running in your machine.

If you then go to `http://localhost:4000/api-docs` you should see a swagger UI showing the available endpoints.

## Tests
You can test the two available APIs with the following HTTP requests:

### Book API
Create a book
```
curl -X POST -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": { "id": "1", "name": "Felipe Polo" }, "id": "1"}' http://localhost:4000/api/v1/books
```

Update a book multiple times
```
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": { "id": "1", "name": "Felipe Polo" }, "id": "1"}' http://localhost:4000/api/v1/books/1

curl -X PUT -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": { "id": "1", "name": "Felipe Polo" }, "location": "Madrid", "id": "1"}' http://localhost:4000/api/v1/books/1

curl -X PUT -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": { "id": "1", "name": "Felipe Polo" }, "location": "Caceres", "id": "1"}' http://localhost:4000/api/v1/books/1
```
Reindex all book commands
```
curl -X POST http://localhost:4000/api/v1/books/reindex
```
Get a book
```
curl -X GET http://localhost:4000/api/v1/books/1
```

### Paragraph API
Create a paragraph on a book
```
curl -X POST -H "Content-Type: application/json" -d '{"title":"My paragraph", "text": "bla bla bla"}' http://localhost:4000/api/v1/books/1/paragraphs
```

### Author API
Get an author
```
curl -X GET http://localhost:4000/api/v1/authors/1
```