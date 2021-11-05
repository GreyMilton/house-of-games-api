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
  test('status:200 receiving correctly updated review_id', () => {
    const reviewId = 2;
    const newValue = 5;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
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
          votes: 10
        });
      });
  });
  test('status:400 { msg: "Invalid query" } on receiving a request with a review_id that is not a number', () => {
    const reviewId = "not a number";
    const newValue = 5;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newValue })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid query" });
      });
  });
  test('status:404 with body { msg: "Review not found" } when review_id in path is correctly a number, but the number is not found as a review_id in the reviews table', () => {
    const reviewId = 999;
    const newValue = 5;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newValue })
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Review not found" });
      });
  });
  test('status:400 { msg: "Invalid request body"} on receiving a request with a body is not in correct format with a key typo like "inc_otes" instead of "inc_votes"', () => {
    const reviewId = 2;
    const newValue = 5;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_otes: newValue })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid request body" });
      });
  });
  test('status:400 { msg: "Invalid request body" } on receiving a request with a body that is not in correct format with object being too large: more than one key.', () => {
    const reviewId = 2;
    const newValue = 5;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newValue, bad_key: "voila!" })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid request body" });
      });
  });
  test('status:400 { msg: "Invalid request body" } on receiving a request with an inc_votes value that is not a number, but a string of characters', () => {
    const reviewId = 2;
    const newValue = "oops";
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newValue })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid request body" });
      });
  });
  test('status:400 { msg: "Invalid request body" } on receiving a request with an inc_votes value that is not a number, but is null', () => {
    const reviewId = 2;
    const newValue = null;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newValue })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid request body" });
      });
  });
  test('status:400 { msg: "Invalid request body" } on receiving a request with an inc_votes value that is not a number, but a boolean', () => {
    const reviewId = 2;
    const newValue = true;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newValue })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid request body" });
      });
  });
  test('status:400 { msg: "Incomplete request" } on receiving a request with no body content attached', () => {
    const reviewId = 2;
    const newValue = true;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Incomplete request" });
      });
  });
});

describe.only('GET /api/reviews', () => {
  test('returns all reviews with no query being supplied: responds with status:200 and sends array of review objects', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toHaveLength(13);
        response.body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            review_id: expect.any(Number),
            title: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            review_body: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number)
          });
        });
      });
  });
  test('returns all reviews sorted (default sorted: by the date column, descending) with no query being supplied: responds with status:200', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toHaveLength(13);
        for (let i = 0; i < response.body.reviews.length - 1; i++) {
          const currentReviewDate = response.body.reviews[i].created_at;
          const nextReviewDate = response.body.reviews[i + 1].created_at;
          expect(Date.parse(currentReviewDate)).toBeGreaterThanOrEqual(Date.parse(nextReviewDate));
        }
      });
  });
  test('returns all reviews sorted (default sorted: by the date column, descending), when request specifies to be sorted by the date column: responds with status:200', () => {
    return request(app)
      .get('/api/reviews?sort_by=created_at')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toHaveLength(13);
        for (let i = 0; i < response.body.reviews.length - 1; i++) {
          const currentReviewDate = response.body.reviews[i].created_at;
          const nextReviewDate = response.body.reviews[i + 1].created_at;
          expect(Date.parse(currentReviewDate)).toBeGreaterThanOrEqual(Date.parse(nextReviewDate));
        }
      });
  });
  test('returns all reviews sorted by another valid column when queried (other than the date column), defaulting to descending: responds with status:200', () => {
    return request(app)
      .get('/api/reviews?sort_by=votes')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toHaveLength(13);
        for (let i = 0; i < response.body.reviews.length - 1; i++) {
          const currentReviewVotes = response.body.reviews[i].votes;
          const nextReviewVotes = response.body.reviews[i + 1].votes;
          expect(currentReviewVotes).toBeGreaterThanOrEqual(nextReviewVotes);
        }
      });
  });
  test('returns all reviews sorted by another valid column WITHOUT number values when queried (e.g. a string), defaulting to descending responds with status:200', () => {
    return request(app)
      .get('/api/reviews?sort_by=designer')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toHaveLength(13);
        expect(response.body.reviews).toBeSortedBy("designer", { descending: true });
      });
  });
  test('returns all reviews sorted by a valid column when queried (other than the date column), with descending specified, responds with status:200', () => {
    return request(app)
      .get('/api/reviews?sort_by=title&order=desc')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toHaveLength(13);
        expect(response.body.reviews).toBeSortedBy("title", { descending: true });
      });
  });
  test('returns all reviews sorted in ascending order by a valid column when queried (other than the date column) with ascending specified, responds with status:200', () => {
    return request(app)
      .get('/api/reviews?sort_by=owner&order=asc')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toHaveLength(13);
        expect(response.body.reviews).toBeSortedBy("owner", { ascending: true });
      });
  });
  test('returns all reviews sorted (default sorted: by the date column), but listed in ascending order as specified, responds with status:200', () => {
    return request(app)
      .get('/api/reviews?order=asc')
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toHaveLength(13);
        expect(response.body.reviews).toBeSortedBy("created_at", { ascending: true });
      });
  });
});