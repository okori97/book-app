import { Reader } from '../src/models/index.js';
import request from 'supertest';
import { expect, should, use } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { app } from '../src/app.js';
import chaiThings from 'chai-things';
should(use(chaiThings));

describe('/Readers', () => {
  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /readers', () => {
      it('creates new records in the database', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Okori McCalla',
          email: 'okori@gmail.com',
        });

        const newReader = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('Okori McCalla');
        expect(newReader.email).to.equal('okori@gmail.com');
        expect(newReader.name).to.equal('Okori McCalla');
      });
    });
  });

  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      readers = await Reader.bulkCreate([
        {
          name: 'Okori McCalla',
          email: 'okori@gmail.com',
        },
        {
          name: 'Patrick Batemen',
          email: 'patrick@gmail.com',
        },
      ]);
      readers = readers.map((record) => record.get({ plain: true }));
    });

    describe('GET /readers', () => {
      it('gets all records in the database', async () => {
        const response = await request(app).get('/readers');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(2);
        response.body.should.all.not.have.property('createdAt');
        response.body.should.all.not.have.property('updatedAt');
        response.body.forEach((record) => {
          const expected = readers.find((reader) => {
            return reader.id == record.id;
          });
          expect(expected.name).to.equal(record.name);
        });
      });

      it('returns an error message if there are no users in the database', async () => {
        await Reader.destroy({ truncate: true });
        const response = await request(app).get('/readers');

        expect(response.body).to.equal('No records available');
        expect(response.status).to.equal(404);
      });
    });

    describe('GET /readers/:id', () => {
      it('gets a single reader by id', async () => {
        const idParam = readers[0].id;
        const response = await request(app).get(`/readers/${idParam}`);
        const expected = readers.find((reader) => reader.id == idParam);
        expect(response.status).to.equal(200);
        expect(expected.name).to.equal(response.body.name);
        expect(expected.email).to.equal(response.body.email);
      });

      it('returns an error message if the user does not exist', async () => {
        const response = await request(app).get(`/readers/1234`);

        expect(response.status).to.equal(404);
        expect(response.body).to.equal('Reader not found');
      });
    });
  });
});
