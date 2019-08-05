# event-sourcing-poc
An event sourcing/CQRS POC using systemic

## Architecture diagram

## Concepts

### Models
### Commands
#### Factories
#### Handlers
### Events
### Projection
#### Reducers
### Snapshots
### Sagas

## Usage

npm run start
swagger

## Tests
curl -X POST -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": "Felipe Polo", "id": "1"}' http://localhost:4000/api/v1/books

curl -X PUT -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": "Felipe Polo Ruiz", "id": "1"}' http://localhost:4000/api/v1/books/1

curl -X PUT -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": "Felipe Polo Ruiz", "location": "Madrid", "id": "1"}' http://localhost:4000/api/v1/books/1

curl -X PUT -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": "Felipe Polo Ruiz", "location": "Caceres", "id": "1"}' http://localhost:4000/api/v1/books/1

curl -X POST -H "Content-Type: application/json" -d '{"title":"Event sourcing & CQRS", "author": "Felipe Polo"}' http://localhost:4000/api/v1/books/reindex

curl -X GET http://localhost:4000/api/v1/books/1


curl -X POST -H "Content-Type: application/json" -d '{"title":"My paragraph", "text": "bla bla bla"}' http://localhost:4000/api/v1/books/1/paragraphs