import { Reader, connection } from '../src/models/index.js';
import request from 'supertest';
import { expect } from 'chai';
import { describe, it, before, beforeEach } from 'mocha';
import { app } from '../src/app.js';

describe('/Readers', () => {
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

        // console.log(response.body.id);
        const newReader = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('Okori McCalla');
        expect(newReader.email).to.equal('okori@gmail.com');
        expect(newReader.name).to.equal('Okori McCalla');
      });
    });
  });
});
