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
    describe('POST /genre', () => {
      it('adds a genre into the database', async () => {
        const response = request(app).post('/genre').send({
          genre: 'Surreal',
        });

        let newGenre = await Genre.findOne({
          where: { genre: 'Surreal' },
        });

        newGenre = getPlainResponse(newGenre);

        expect(newGenre).to.not.eql(null);
        expect(newGenre.genre).to.eql('Surreal');
      });

      it('returns an 400 if no genre provided', async () => {
        const response = await request(app).post('genre/').send({});

        expect(response.status).to.equal(400);
      });
    });

    describe('with records in the database', () => {
      let genres;

      beforeEach(async () => {
        genres = await Genre.bulkCreate([
          { genre: 'Surreal' },
          { genre: 'Romance' },
        ]);
      });

      describe('GET /authors', () => {
        it('gets all genres in the database', async () => {
          const response = await request(app).get('genre/');

          expect(response.status).to.equal(200);
          expect(response.body[0]).to.eql(genres);
        });
        it('returns a 404 if no genres in the database', async () => {
          await Genre.destroy({ where: {} });
          const response = await request(app).get('genre/');

          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });

      describe('GET /genre/:id', () => {
        it('gets a single genre by id', async () => {
          const existing = genres[0];
          const response = await request(app).get(`genre/${existing.id}`);

          expect(response.status).to.equal(200);
          expect(response.body.genre).to.equal(existing.genre);
        });

        it('returns 404 if the genre does not exist', async () => {
          const response = await request(app).get(`genre/1234`);

          expect(response.status).toString.equal(404);
          expect(response.body).to.haveOwnProperty('error');
        });
      });
    });
  });
});
