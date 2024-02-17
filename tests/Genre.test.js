import request from 'supertest';
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
    describe('POST /books', () => {
      it('add a genre into the genre table', async () => {
        const response = request(app).post('books/').send({
          title: 'The Trial',
          author: 'Franz Kafka',
          genre: 'Surreal',
          ISBN: 'GB29 NWBK 6016 1331 9268 19',
        });

        let newGenre = await Genre.findOne({
          where: { genre: 'Surreal' },
        });

        newGenre ? (newGenre = newGenre.get({ plain: true })) : '';
        console.log(newGenre);

        expect(newGenre).to.not.eql(null);
        expect(newGenre.genre).to.eql('Surreal');
      });
    });
  });
});
