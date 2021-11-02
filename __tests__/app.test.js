const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');

const app = require('../app.js');
const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('bad path', () => {
  test('responds with status 404, msg: "Path not found"', () => {
    return request(app)
      .get('/bad path')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Path not found");
      });
  });
});

describe('GET /api/categories', () => {
  test('responds with status:200 and sends array of category objects', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        expect(response.body.categories).toHaveLength(4);
        response.body.categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String)
          });
        });
      });
  });
});

describe('GET /api/reviews/:review_id', () => {
  test('response with status:200 and sends the correct review object', () => {
    const reviewId = 2;
    return request(app)
      .get(`/api/reviews/${reviewId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.review).toEqual({
          review_id: 2,
          title: 'Jenga',
          designer: 'Leslie Scott',
          owner: 'philippaclaire9',
          review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          review_body: 'Fiddly fun for all the family',
          category: 'dexterity',
          created_at: new Date(1610964101251).toString(),
          votes: 5,
          comment_count: 3 
        });
      });
  });
});

