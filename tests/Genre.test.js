import request from 'supertest';
import { getPlainResponse } from './test-helpers.js';
import { beforeEach, describe, it, afterEach } from 'mocha';
import { expect, should, use } from 'chai';
import chaiThings from 'chai-things';
import { app } from '../src/app.js';
import { Genre } from '../src/models/index.js';
should(use(chaiThings));

describe('Genre', () => {
  afterEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe.only('POST /genre', () => {
      it('adds a genre into the database', async () => {
        const response = await request(app).post('/genres').send({
          genre: 'Surreal',
        });

        let newGenre = await Genre.findOne({
          where: { genre: 'Surreal' },
        });

        newGenre = getPlainResponse(newGenre);

        expect(response.status).to.equal(201);
        expect(newGenre).to.not.eql(null);
        expect(newGenre.genre).to.eql('Surreal');
      });

      it('returns an 400 if no genre provided', async () => {
        const response = await request(app).post('/genres').send({});

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });
    });

    describe('with records in the database', () => {
      let genres;

      beforeEach(async () => {
        genres = await Genre.bulkCreate([
          { genre: 'Surreal' },
          { genre: 'Romance' },
        ]);

        genres = genres.map((genre) => getPlainResponse(genre));
      });

      describe.only('GET /genre', () => {
        it('gets all genres in the database', async () => {
          const response = await request(app).get('/genres');

          expect(response.status).to.equal(200);
          expect(response.body.length).to.eql(2);

          response.body.forEach((record) => {
            const expected = genres.find((genre) => {
              return genre.id == record.id;
            });
            expect(record.genre).to.eql(expected.genre);
          });
        });

        it('returns a 404 if no genres in the database', async () => {
          await Genre.destroy({ where: {} });
          const response = await request(app).get('/genres');

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });

      describe('GET /genres/:id', () => {
        it('gets a single genre by id', async () => {
          const existing = genres[0];
          const response = await request(app).get(`/genres/${existing.id}`);

          expect(response.status).to.equal(200);
          expect(response.body.genre).to.equal(existing.genre);
        });

        it('returns 404 if the genre does not exist', async () => {
          const response = await request(app).get(`/genres/1234`);

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });

      describe('PATCH /genres/:id', () => {
        it('updates an existing genre in the database', async () => {
          const idParam = genres[0].id;
          const existingRecord = genres[0];
          const response = await request(app)
            .patch(`/genres/${idParam}`)
            .send({ genre: 'Horror' });

          const updatedRecord = await Genre.findByPk(idParam, { raw: true });
          expect(response.status).to.equal(200);
          expect(response.body).to.haveOwnProperty('success');
          expect(existingRecord.genre).to.not.equal(updatedRecord.genre);
          expect(updatedRecord.genre).to.equal('Horror');
        });

        it('returns a 404 if genre does not exist', async () => {
          const response = await request(app)
            .patch(`/genres/1234`)
            .set('Content-Type', 'application/json');

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });
    });
  });
});
