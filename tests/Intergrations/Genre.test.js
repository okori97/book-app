import request from 'supertest';
import { getPlainResponse } from '../test-helpers.js';
import { beforeEach, describe, it, afterEach } from 'mocha';
import { expect, should, use } from 'chai';
import chaiThings from 'chai-things';
import { app } from '../../src/app.js';
import { Genre } from '../../src/models/index.js';
import { dummyGenre } from '../../src/utils/fake-data.js';
should(use(chaiThings));

describe('Genre', () => {
  afterEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    let fakeGenre = dummyGenre();
    describe('POST /genre', () => {
      it('adds a genre into the database', async () => {
        const response = await request(app).post('/genres').send(fakeGenre);

        let newGenre = await Genre.findOne({
          where: { genre: fakeGenre.genre },
        });

        newGenre = getPlainResponse(newGenre);

        expect(response.status).to.equal(201);
        expect(newGenre).to.not.eql(null);
        expect(newGenre.genre).to.eql(fakeGenre.genre);
      });

      it('returns an 400 if no genre provided', async () => {
        const response = await request(app).post('/genres').send({});

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .post(`/genres`)
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.body).to.haveOwnProperty('error');
        expect(response.status).to.equal(400);
      });
    });

    describe('with records in the database', () => {
      let genres;

      beforeEach(async () => {
        genres = await Genre.bulkCreate([dummyGenre(), dummyGenre()]);

        genres = genres.map((genre) => getPlainResponse(genre));
      });

      describe('GET /genre', () => {
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

        it('returns a 400 if request is not of the correct type', async () => {
          const response = await request(app)
            .patch(`/genres/${genres[0].id}`)
            .send('badthing')
            .set('Content-Type', 'text/html');

          expect(response.body).to.haveOwnProperty('error');
          expect(response.status).to.equal(400);
        });
      });

      describe('DELETE /genres/:id', () => {
        it('deletes a single genre from the database', async () => {
          const existingRecord = genres[0];
          const response = await request(app).delete(`/genres/${genres[0].id}`);
          const deletedGenre = await Genre.findByPk(genres[0].id);

          const currentGenres = await Genre.findAll({
            raw: true,
          });

          expect(currentGenres.length).to.equal(genres.length - 1);
          expect(response.status).to.equal(200);
          expect(deletedGenre).to.equal(null);
          expect(existingRecord).to.not.equal(null);
          expect(response.body).to.haveOwnProperty('success');
        });

        it('returns a 404 if genre does not exist', async () => {
          const response = await request(app).delete('/genres/1234');
          const currentGenres = await Genre.findAll({
            raw: true,
            attributes: ['genre'],
          });

          expect(currentGenres.length).to.equal(genres.length);
          expect(response.status).to.eql(404);
          expect(response.body).to.haveOwnProperty('error');
        });

        it('returns a 400 if request is not of the correct type', async () => {
          const response = await request(app)
            .delete(`/genres/${genres[0].id}`)
            .send('badthing')
            .set('Content-Type', 'text/html');

          expect(response.status).to.eql(400);
          expect(response.body).to.haveOwnProperty('error');
        });
      });
    });
  });
});
