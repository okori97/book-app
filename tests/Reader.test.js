import setupDatabase from '../src/models/index.js';
import request from 'supertest';
import { expect } from 'chai';
import { describe, it, before, beforeEach } from 'mocha';
import { app } from '../src/app.js';

describe('/Readers', () => {
  let Reader;

  before(async () => {
    const db = await setupDatabase();
    Reader = db.Reader;
    await db.connection.sync({ force: true });
  });
  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('/POST', () => {
      it('creates new records in the database', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Okori McCalla',
          email: 'okori@gmail.com',
        });

        expect(response.status).to.equal(200);
      });
    });
  });
});
