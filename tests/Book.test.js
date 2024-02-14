import { expect, should, use } from 'chai';
import chaiThings from 'chai-things';
import request from 'supertest';
import { beforeEach, describe, it } from 'mocha';
import { Book } from '../src/models/index.js';
import { app } from '../src/app.js';

should(use(chaiThings));

describe('/Books', () => {
  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with NO records in the database', () => {
    describe('POST /books', () => {
      it('creates new records in the database', async () => {
        const response = await request(app).post('/books').send({
          name: 'The Trial',
          author: 'Franz Kafka',
          genre: 'Surreal',
          ISBN: 'GB29 NWBK 6016 1331 9268 19',
        });
        const newBook = await Book.findByPk(response.body.id);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('The Trial');
        expect(newBook.title).to.equal('The Trial');
        expect(newBook.author).to.equal('Franz Kafka');
        expect(newBook.genre).to.equal('Surreal');
        expect(newBook.ISBN).to.equal('GB29 NWBK 6016 1331 9268 19');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .post('/books')
          .send('badthings')
          .set('Content-Type', 'text/html');

        expect(response.status).to.equal(400);
        expect(response.body.error).to.eql('Bad request');
      });
    });

    describe('with records in the database', () => {
      let books;
      beforeEach(async () => {
        books = await Book.bulkCreate([
          {
            name: 'The Trial',
            author: 'Franz Kafka',
            genre: 'Surreal',
            ISBN: 'GB29 NWBK 6016 1331 9268 19',
          },
          {
            name: 'Infinite Jest',
            author: 'David F. Wallace',
            genre: 'Postmodern',
            ISBN: 'GB33 NWBK 4024 1551 9227 86',
          },
        ]);
      });

      describe('GET /books', () => {
        it('gets all the records in the database', async () => {
          const response = await request(app).get('/books');
          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(2);

          response.body.map((record) => {
            const expected = books.find((book) => book.id == record.id);
            expect(record.title).eql(expected.title);
            expect(record.author).eql(expected.author);
          });
        });

        it('returns a 404 if there are no books in the database', async () => {
          Book.destroy({ where: {} });
          const response = await request(app).get('/books');

          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('No Books found!');
        });
      });

      describe('GET /books/:id', () => {
        it('gets a single book by id', async () => {
          const response = await request(app).get(`/books/${books[0].id}`);
          const expected = books[0];

          expect(response.status).to.equal(200);
          expect(response.body.title).to.equal(expected.title);
          expect(response.body.author).to.equal(expected.author);
        });

        it('returns a 404 if no book does not exist', async () => {
          const response = await request(app).get('/books/1234');

          expect(response.status).to.equal(404);
          expect(response.body.error).to.eql('Book not found');
        });
      });

      describe('PATCH /books/:id', () => {
        it('updates a books title in the database', async () => {
          const response = await request(app)
            .patch(`/books/${books[1].id}`)
            .send({
              title: 'Broom of the System',
            });

          const existingBook = books[1];

          expect(response.status).to.equal(200);
          expect(response.body.title).to.not.eql(existingBook.title);
          expect(response.body.author).to.eql(existingBook.author);
          expect(response.body.ISBN).to.eql(existingBook.ISBN);
        });

        it('returns a 404 if book does not exist', async () => {
          const response = await request(app).patch('/books/12344').send({
            title: 'Broom of the System',
          });

          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('Book not found!');
        });

        it('returns a 400 if request is not of the correct type', async () => {
          const response = await request(app)
            .patch(`/books/${books[1].id}`)
            .send('badthing')
            .set('Content-Type', 'application/json');

          expect(response.status).to.equal(400);
          expect(response.body.error).to.eql('Bad network request');
        });
      });

      describe('DELETE /books/:id', () => {
        it('deletes a single book from the database', async () => {
          const existingRecord = books[0];
          const response = await request(app).delete(`/books/${books[0].id}`);
          const deletedBook = await Book.findByPk(books[0].id);

          const currentBooks = await Book.findAll({
            raw: true,
            attributes: ['title', 'author', 'genre', 'ISBN'],
          });

          expect(currentBooks.length).to.equal(books.length - 1);
          expect(response.status).to.equal(200);
          expect(deletedBook).to.be(null);
          expect(existingRecord).to.not.be(null);
          expect(response.body.success).eql('Book deleted');
        });

        it('returns a 404 if book does not exist', async () => {
          const response = await request(app).delete('/books/1234');
          const currentBooks = await Book.findAll({
            raw: true,
            attributes: ['title', 'author', 'genre', 'ISBN'],
          });

          expect(currentBooks.length).to.equal(books.length);
          expect(response.status).to.eql(404);
          expect(response.body.error).to.eql('Book not found');
        });

        it('returns a 400 if request is not of the correct type', async () => {
          const response = await request(app).delete(`/books/${books[0].id}`);

          expect(response.status).to.eql(400);
          expect(response.body.error).to.eql('Bad request');
        });
      });
    });
  });
});
