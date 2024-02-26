import { expect } from 'chai';
import request from 'supertest';
import { getPlainResponse } from '../test-helpers.js';
import { beforeEach, describe, it } from 'mocha';
import { Author, Book, connection } from '../../src/models/index.js';
import { app } from '../../src/app.js';
import { dummyAuthor, dummyBook } from '../../src/utils/fake-data.js';

describe('/Authors', () => {
  beforeEach(async () => {
    await connection.sync({ force: true });
    await Author.destroy({ where: {} });
  });
  describe('with no records in the database', () => {
    let fakeAuthor = dummyAuthor();
    describe('POST /authors', () => {
      it('creates a new author in the database', async () => {
        const response = await request(app).post('/authors').send(fakeAuthor);
        let newAuthor = await Author.findOne({
          where: { author: fakeAuthor.author },
        });

        newAuthor = getPlainResponse(newAuthor);

        expect(response.status).to.equal(201);
        expect(newAuthor).to.not.eql(null);
        expect(newAuthor.author).to.eql(fakeAuthor.author);
        expect(newAuthor.id).to.eql(response.body.id);
      });

      it('returns an 400 if no author provided', async () => {
        const response = await request(app).post('/authors').send({});

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .post(`/authors`)
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.body).to.haveOwnProperty('error');
        expect(response.status).to.equal(400);
      });
    });

    describe('with records in the database', () => {
      let authors, books;

      beforeEach(async () => {
        authors = await Author.bulkCreate([dummyAuthor(), dummyAuthor()]);
        books = await Book.bulkCreate([
          dummyBook({ AuthorId: authors[0].id }),
          dummyBook({ AuthorId: authors[1].id }),
        ]);
        authors = authors.map((author) => getPlainResponse(author));
      });

      describe('GET /authors', () => {
        it('gets all authors int the database', async () => {
          const response = await request(app).get('/authors');

          expect(response.status).to.equal(200);
          expect(response.body.length).to.eql(2);
          response.body.forEach((record) => {
            const expected = authors.find((author) => {
              return author.id == record.id;
            });

            expect(record.author).to.eql(expected.author);
            record.Books.should.all.haveOwnProperty('AuthorId');
            expect(record.Books[0].AuthorId).to.eql(record.id);
          });
        });

        it('returns a 404 if no authors in the database', async () => {
          await Author.destroy({ where: {} });
          const response = await request(app).get('/authors');

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });

      describe('GET /authors/:id', () => {
        it('gets a single author by id', async () => {
          const existing = await Author.findByPk(authors[0].id);
          const response = await request(app).get(`/authors/${existing.id}`, {
            include: [Book],
          });

          expect(response.status).to.equal(200);
          expect(response.body.author).to.equal(existing.author);
          expect(response.body.Books[0].id).to.equal(books[0].id);
          expect(response.body.Books[0].title).to.equal(books[0].title);
        });

        it('returns 404 if the author does not exist', async () => {
          const response = await request(app).get(`/authors/1234`);

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });

      describe('PATCH /authors/:id', () => {
        it('updates an existing author in the database', async () => {
          const idParam = authors[0].id;
          const existingRecord = authors[0];
          const response = await request(app)
            .patch(`/authors/${idParam}`)
            .send({ author: 'Voltaire' });

          const updatedRecord = await Author.findByPk(idParam, { raw: true });
          expect(response.status).to.equal(200);
          expect(response.body).to.haveOwnProperty('success');
          expect(existingRecord.author).to.not.equal(updatedRecord.author);
          expect(updatedRecord.author).to.equal('Voltaire');
        });

        it('returns a 404 if author does not exist', async () => {
          const response = await request(app)
            .patch(`/authors/1234`)
            .set('Content-Type', 'application/json');

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });

        it('returns a 400 if request is not of the correct type', async () => {
          const response = await request(app)
            .patch(`/authors/${authors[0].id}`)
            .send('badthing')
            .set('Content-Type', 'text/html');

          expect(response.body).to.haveOwnProperty('error');
          expect(response.status).to.equal(400);
        });
      });

      describe('DELETE /authors/:id', () => {
        it('deletes a single author from the database', async () => {
          const existingRecord = authors[0];
          const response = await request(app).delete(
            `/authors/${authors[0].id}`
          );
          const deletedAuthor = await Author.findByPk(authors[0].id);

          const currentAuthors = await Author.findAll({
            raw: true,
            attributes: ['author'],
          });

          expect(currentAuthors.length).to.equal(authors.length - 1);
          expect(response.status).to.equal(200);
          expect(deletedAuthor).to.equal(null);
          expect(existingRecord).to.not.equal(null);
          expect(response.body).to.haveOwnProperty('success');
        });

        it('returns a 404 if author does not exist', async () => {
          const response = await request(app).delete('/authors/1234');
          const currentAuthors = await Author.findAll({
            raw: true,
            attributes: ['author'],
          });

          expect(currentAuthors.length).to.equal(authors.length);
          expect(response.status).to.eql(404);
          expect(response.body).to.haveOwnProperty('error');
        });

        it('returns a 400 if request is not of the correct type', async () => {
          const response = await request(app)
            .delete(`/authors/${authors[0].id}`)
            .send('badthing')
            .set('Content-Type', 'text/html');

          expect(response.status).to.eql(400);
          expect(response.body).to.haveOwnProperty('error');
        });
      });
    });
  });
});
