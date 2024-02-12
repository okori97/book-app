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

  describe('with records in the database', () => {
    const records = [
      {
        name: 'Okori McCalla',
        email: 'okori@gmail.com',
      },
      {
        name: 'Patrick Batemen',
        email: 'patrick@gmail.com',
      },
    ];

    describe('/GET', () => {
      it('returns all readers in the database', async () => {
        records.map(async (record) => {
          await Reader.create({
            name: `${record.name}`,
            email: `${record.email}`,
          });
        });

        const response = await request(app).get('/readers');

        response.body.should.all.not.have.property('createdAt');
        response.body.should.all.not.have.property('updatedAt');
        expect(response.body).to.eql(records);
        expect(response.status).to.equal(200);
      });
    });
  });
});
