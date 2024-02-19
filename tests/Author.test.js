import { expect, should, use } from 'chai';
import chaiThings from 'chai-things';
import request from 'supertest';
import { getPlainResponse } from './test-helpers.js';
import { beforeEach, describe, it } from 'mocha';
import { Author } from '../src/models/index.js';
import { app } from '../src/app.js';

describe('/Authors', () => {
  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });
  describe('with no records in the database', () => {
    describe('POST /authors', () => {
      it('creates a new author in the database', async () => {
        const response = await request(app).post('/authors').send({
          author: 'Franz Kafka',
        });

        let newAuthor = await Author.findOne({
          where: { author: 'Franz Kafka' },
        });

        newAuthor = getPlainResponse(newAuthor);

        expect(response.status).to.equal(201);
        expect(newAuthor).to.not.eql(null);
        expect(newAuthor.author).to.eql('Surreal');
      });

      it('returns an 400 if no author provided', async () => {
        const response = await request(app).post('/authors').send({});

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });
    });

    describe('with records in the database', () => {
      let authors;

      beforeEach(async () => {
        authors = await Author.bulkCreate([
          { author: 'Franz Kafka' },
          { author: 'David F. Wallace' },
        ]);

        authors = authors.map((author) => getPlainResponse(author));
      });

      describe('GET /authors', () => {
        it('gets all authors int the database', async () => {
          const response = await request(app).get('/authors');

          expect(response.status).to.equal(200);
          expect(response.body[0]).to.eql(authors);
        });
        it('returns a 404 if no authors in the database', async () => {
          await Author.destroy({ where: {} });
          const response = await request(app).get('/authors');

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });

      describe('GET /authors:id', () => {
        it('gets a single author by id', async () => {
          const existing = authors[0];
          const response = await request(app).get(`/authors/${existing.id}`);

          expect(response.status).to.equal(200);
          expect(response.body.author).to.equal(existing.author);
        });

        it('returns 404 if the author does not exist', async () => {
          const response = await request(app).get(`/authors/1234`);

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });
    });
  });
});
