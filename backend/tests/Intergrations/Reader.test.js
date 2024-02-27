import { Reader } from '../../src/models/index.js';
import request from 'supertest';
import { expect, should, use } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { app } from '../../src/app.js';
import chaiThings from 'chai-things';
import { getPlainResponse } from '../test-helpers.js';
import { dummyReader } from '../../src/utils/fake-data.js';

should(use(chaiThings));

describe('/Readers', () => {
  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    let fakeReader = dummyReader();
    describe('POST /readers', () => {
      it('creates new records in the database', async () => {
        const response = await request(app).post('/readers').send(fakeReader);

        const newReader = await Reader.scope('withPassword').findByPk(
          response.body.id,
          {
            raw: true,
          }
        );

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal(fakeReader.name);
        expect(newReader.email).to.equal(fakeReader.email);
        expect(newReader.name).to.equal(fakeReader.name);
        expect(newReader.password).to.equal(fakeReader.password);
      });

      it('returns a 400 if the request body is empty', async () => {
        const response = await request(app).post('/readers').send({});

        expect(response.status).to.eql(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .post('/readers')
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.body).to.haveOwnProperty('error');
        expect(response.status).to.equal(400);
      });

      it('returns an  400 if the name does not exist', async () => {
        const response = await request(app)
          .post('/readers')
          .send(dummyReader({ name: null }));

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });
      it('returns an  400 if the name is an empty string', async () => {
        const response = await request(app)
          .post('/readers')
          .send(dummyReader({ name: '' }));

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });
      it('returns an  400 if the email does not exist', async () => {
        const response = await request(app)
          .post('/readers')
          .send(dummyReader({ email: null }));

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns an  400 if the email is not valid', async () => {
        const response = await request(app)
          .post('/readers')
          .send(dummyReader({ email: 'okorimail.com' }));

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns an  400 if the password does not exist', async () => {
        const response = await request(app)
          .post('/readers')
          .send(dummyReader({ password: null }));

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns an 400 if the password is NOT more than 8 chars', async () => {
        const response = await request(app)
          .post('/readers')
          .send(dummyReader({ password: 'thisis78' }));

        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('does not return password from API', async () => {
        const reader = dummyReader();
        const response = await request(app).post('/readers').send(reader);

        const checkPasswordInDb = await Reader.findOne({
          where: { password: reader.password },
        });
        expect(checkPasswordInDb.name).to.eql(reader.name);
        expect(response.status).to.equal(201);
        expect(response.body.password).to.equal(undefined);
      });
    });
  });

  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      readers = await Reader.bulkCreate([dummyReader(), dummyReader()]);
      readers = readers.map((record) => getPlainResponse(record));
    });

    describe('GET /readers', () => {
      it('gets all records in the database', async () => {
        const response = await request(app).get('/readers');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(2);
        response.body.should.all.not.have.property('createdAt' && 'updatedAt');
        response.body.forEach((record) => {
          const expected = readers.find((reader) => {
            return reader.id == record.id;
          });
          expect(expected.name).to.equal(record.name);
        });
      });

      it('does not return password from API', async () => {
        const response = await request(app).get('/readers');

        expect(response.status).to.equal(200);
        expect(response.body.password).to.equal(undefined);
      });

      it('returns a 404 if there are no users in the database', async () => {
        await Reader.destroy({ where: {} });
        const response = await request(app).get('/readers');

        expect(response.body).to.haveOwnProperty('error');
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

      it('does not return password from API', async () => {
        const idParam = readers[0].id;
        const response = await request(app).get(`/readers/${idParam}`);

        expect(response.status).to.equal(200);
        expect(response.body.password).to.equal(undefined);
      });

      it('returns a 404 if the user does not exist', async () => {
        const response = await request(app).get(`/readers/1234`);
        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('error');
      });
    });

    describe('PATCH /readers/:id', () => {
      it('updates an existing users name in the database', async () => {
        const idParam = readers[0].id;
        const existingRecord = readers[0];
        const response = await request(app)
          .patch(`/readers/${idParam}`)
          .send({ name: 'Martin' });

        const updatedRecord = await Reader.findByPk(idParam, { raw: true });
        expect(response.status).to.equal(200);
        expect(response.body).to.haveOwnProperty('success');
        expect(existingRecord.name).to.not.equal(updatedRecord.name);
        expect(updatedRecord.name).to.equal('Martin');
      });

      it('returns a 404 if user does not exist', async () => {
        const response = await request(app)
          .patch(`/readers/1234`)
          .set('Content-Type', 'application/json');

        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .patch(`/readers/${readers[0].id}`)
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.body).to.haveOwnProperty('error');
        expect(response.status).to.equal(400);
      });

      it('does not return password from API', async () => {
        const idParam = readers[0].id;
        const response = await request(app)
          .patch(`/readers/${idParam}`)
          .send({ name: 'Martin' });

        expect(response.status).to.equal(200);
        expect(response.body.password).to.equal(undefined);
      });
    });

    describe('DELETE /readers/:id', () => {
      it('deletes an existing user from the database', async () => {
        const idParam = readers[0].id;
        const existingRecord = readers[0];
        const response = await request(app).delete(`/readers/${idParam}`);
        const deletedReader = await Reader.findByPk(idParam, { raw: true });
        const currentReaders = await Reader.findAll({
          raw: true,
          attributes: ['name', 'email'],
        });

        expect(currentReaders.length).to.equal(readers.length - 1);
        expect(response.status).to.equal(200);
        expect(response.body).to.haveOwnProperty('success');
        expect(existingRecord).to.not.equal(null);
        expect(deletedReader).to.equal(null);
      });

      it('returns a 404 if user does not exist', async () => {
        const response = await request(app).delete(`/readers/1234`);

        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('error');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .delete(`/readers/${readers[0].id}`)
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.body).to.haveOwnProperty('error');
        expect(response.status).to.equal(400);
      });
    });
  });
});
