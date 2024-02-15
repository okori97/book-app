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
          password: 'password123',
        });

        const newReader = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('Okori McCalla');
        expect(newReader.email).to.equal('okori@gmail.com');
        expect(newReader.name).to.equal('Okori McCalla');
        expect(newReader.password).to.equal('password123');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .post('/readers')
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.body.error).to.eql('Bad request');
        expect(response.status).to.equal(400);
      });

      it('returns an error message if the password does not exist', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Okori McCalla',
          email: 'okori@gmail.com',
        });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Please add a password');
      });

      it('returns an error message if the password is NOT more than 8 chars', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Okori McCalla',
          email: 'okori@gmail.com',
          password: 'thisis78',
        });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(
          'Password must be more than 8 characters'
        );
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
          password: 'password123',
        },
        {
          name: 'Patrick Batemen',
          email: 'patrick@gmail.com',
          password: 'password321',
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

      it('returns a 404 if there are no users in the database', async () => {
        await Reader.destroy({ truncate: true });
        const response = await request(app).get('/readers');

        expect(response.body.error).to.equal('No records available');
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

      it('returns a 404 if the user does not exist', async () => {
        const response = await request(app).get(`/readers/1234`);
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('User does not exist');
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
        expect(response.body).to.eql({ success: 'User updated' });
        expect(existingRecord.name).to.not.equal(updatedRecord.name);
        expect(updatedRecord.name).to.equal('Martin');
      });

      it('returns a 404 if user does not exist', async () => {
        const response = await request(app)
          .patch(`/readers/1234`)
          .set('Content-Type', 'application/json');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('User does not exist');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .patch(`/readers/${readers[0].id}`)
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.body.error).to.eql('Bad request');
        expect(response.status).to.equal(400);
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
          attributes: ['name', 'email', 'password'],
        });

        expect(currentReaders.length).to.equal(readers.length - 1);
        expect(response.status).to.equal(200);
        expect(response.body).to.eql({ success: 'User deleted' });
        expect(existingRecord).to.not.equal(null);
        expect(deletedReader).to.equal(null);
      });

      it('returns a 404 if user does not exist', async () => {
        const response = await request(app).delete(`/readers/1234`);

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('User does not exist');
      });

      it('returns a 400 if request is not of the correct type', async () => {
        const response = await request(app)
          .delete(`/readers/${readers[0].id}`)
          .send('badthing')
          .set('Content-Type', 'text/html');

        expect(response.body.error).to.eql('Bad request');
        expect(response.status).to.equal(400);
      });
    });
  });
});
