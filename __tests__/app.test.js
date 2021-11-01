const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');

const app = require('../app.js');
const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('app', () => {
  describe('/api/categories', () => {
    describe('GET', () => {
      it('responds with status:200 and sends array of category objects', () => {
        return request(app)
          .get('/api/categories')
          .expect(200)
          .then((response) => {
            console.log(response);
          })
      });
    });
  });
});

