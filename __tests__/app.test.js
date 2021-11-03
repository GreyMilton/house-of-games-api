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
  test('responds with status:200 and sends the correct review object', () => {
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
          created_at: new Date(1610964101251).toISOString(),
          votes: 5,
          comment_count: 3 
        });
      });
  });
  test('status:400 with body { msg: "Invalid query" } when review_id in path is not a number (as it should be)', () => {
    const reviewId = "not a number oops";
    return request(app)
      .get(`/api/reviews/${reviewId}`)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid query" });
      });
  });
  test('status:404 with body { msg: "Review not found" } when review_id in path is correctly a number, but the number is not found as a review_id in the reviews table', () => {
    const reviewId = 999;
    return request(app)
      .get(`/api/reviews/${reviewId}`)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Review not found" });
      });
  });
});

describe('PATCH /api/reviews/:review_id', () => {
  test('', () => {
    const reviewId = 2;
    const newValue = 5;
    return request(app)
      .patch('/api/reviews/:review_id')
      .send({ inc_votes: newValue })
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
          created_at: new Date(1610964101251).toISOString(),
          votes: 10,
          comment_count: 3 
        });
      });
  });
});