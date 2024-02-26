import { expect, should, use } from 'chai';
import chaiThings from 'chai-things';
import request from 'supertest';
import { beforeEach, describe, it } from 'mocha';
import { Book, Genre } from '../../src/models/index.js';
import { app } from '../../src/app.js';
import { getPlainResponse } from '../test-helpers.js';
import { dummyBook, dummyGenre } from '../../src/utils/fake-data.js';

should(use(chaiThings));

describe('/Books', () => {
  beforeEach(async () => {
    await Book.destroy({ where: {} });
    await Genre.destroy({ where: {} });
  });

  describe('with NO records in the database', () => {
    let fakeBook, fakeGenre;

    beforeEach(async () => {
      fakeGenre = await Genre.create(dummyGenre());
      fakeGenre = await getPlainResponse(fakeGenre);
      fakeBook = dummyBook({ GenreId: fakeGenre.id });
    });

    describe('POST /books', () => {
      it('creates new records in the database', async () => {
        const response = await request(app).post('/books').send(fakeBook);
        const newBook = await Book.findByPk(response.body.id, {
          include: Genre,
        });

        expect(response.status).to.equal(201);

        expect(response.body.title).to.equal(fakeBook.title);
        expect(newBook.title).to.equal(fakeBook.title);
        expect(response.body.GenreId).to.equal(newBook.Genre.id);
        expect(newBook.ISBN).to.equal(fakeBook.ISBN);
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .post('/books')
          .send('badthings')
          .set('Content-Type', 'text/html');

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns an 404 if the book title does not exist', async () => {
        const response = await request(app)
          .post('/books')
          .send(dummyBook({ title: null }));

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns an 404 if the author does not exist', async () => {
        const response = await request(app)
          .post('/books')
          .send(dummyBook({ AuthorId: null }));

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });
    });
  });

  describe('with records in the database', () => {
    let books, genres;
    beforeEach(async () => {
      genres = await Genre.bulkCreate([dummyGenre(), dummyGenre()]);
      books = await Book.bulkCreate([
        dummyBook({ GenreId: genres[0].id }),
        dummyBook({ GenreId: genres[1].id }),
      ]);

      books = books.map((record) => getPlainResponse(record));
    });

    describe('GET /books', () => {
      it('gets all the records in the database', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(2);

        response.body.forEach((record) => {
          const expected = books.find((book) => {
            return book.id == record.id;
          });

          expect(record.title).eql(expected.title);
          expect(record.author).eql(expected.author);
        });
      });

      it('returns a 404 if there are no books in the database', async () => {
        await Book.destroy({ where: {} });
        const response = await request(app).get('/books');

        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('error');
      });
    });

    describe('GET /books/:id', () => {
      it('gets a single book by id', async () => {
        const response = await request(app).get(`/books/${books[0].id}`);
        const expected = books[0];

        // console.log(response.body);
        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(expected.title);
        expect(response.body.author).to.equal(expected.author);
      });

      it('returns a 404 if no book does not exist', async () => {
        const response = await request(app).get('/books/1234');

        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('error');
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
        const updatedBook = await Book.findByPk(books[1].id);

        expect(response.status).to.equal(200);
        expect(updatedBook.title).to.not.eql(existingBook.title);
        expect(updatedBook.author).to.eql(existingBook.author);
        expect(updatedBook.ISBN).to.eql(existingBook.ISBN);
      });

      it('returns a 404 if book does not exist', async () => {
        const response = await request(app).patch('/books/12344').send({
          title: 'Broom of the System',
        });

        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .patch(`/books/${books[1].id}`)
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });
    });

    describe('DELETE /books/:id', () => {
      it('deletes a single book from the database', async () => {
        const existingRecord = books[0];
        const response = await request(app).delete(`/books/${books[0].id}`);
        const deletedBook = await Book.findByPk(books[0].id);

        const currentBooks = await Book.findAll({
          raw: true,
          attributes: ['title', 'ISBN'],
        });

        expect(currentBooks.length).to.equal(books.length - 1);
        expect(response.status).to.equal(200);
        expect(deletedBook).to.equal(null);
        expect(existingRecord).to.not.equal(null);
        expect(response.body).to.haveOwnProperty('success');
      });

      it('returns a 404 if book does not exist', async () => {
        const response = await request(app).delete('/books/1234');
        const currentBooks = await Book.findAll({
          raw: true,
          attributes: ['title', 'ISBN'],
        });

        expect(currentBooks.length).to.equal(books.length);
        expect(response.status).to.eql(404);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .delete(`/books/${books[0].id}`)
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.status).to.eql(400);
        expect(response.body).to.haveOwnProperty('error');
      });
    });
  });
});
