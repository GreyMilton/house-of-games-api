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
  describe('Happy path', () => {
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
  });
  describe('Sad paths', () => {
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
});

describe('PATCH /api/reviews/:review_id', () => {
  describe('Happy path', () => {
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
  });
  describe('Sad paths', () => {
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
});

describe('GET /api/reviews', () => {
  describe('Happy paths', () => {
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
    test('returns results filtered by category when using default sorting and ordering, responds with status:200', () => {
      return request(app)
        .get('/api/reviews?category=social%20deduction')
        .expect(200)
        .then((response) => {
          expect(response.body.reviews).toHaveLength(11);
          expect(response.body.reviews).toBeSortedBy("category", { descending: true });
        });
    });
    test('returns results filtered by category when ascending by a valid column is specified, responds with status:200', () => {
      return request(app)
        .get('/api/reviews?sort_by=review_id&order=asc&category=social%20deduction')
        .expect(200)
        .then((response) => {
          expect(response.body.reviews).toHaveLength(11);
          expect(response.body.reviews).toBeSortedBy("review_id", { ascending: true });
        });
    });
  })
  describe('Sad paths', () => {
    test('status:400 { msg: "Invalid query" } one of the queries columns has a typo', () => {
      return request(app)
        .get('/api/reviews?sor_by=review_id&order=asc&category=social%20deduction')
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Invalid query" });
        });
    });

    test('status:400 { msg: "Invalid query" } query keys or syntax written badly in some other way', () => {
      return request(app)
        .get('/api/reviews?bad-query')
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Invalid query" });
        });
    });
    test('status:400 { msg: "Invalid sort_by query" } if sort_by query is not a valid column', () => {
      return request(app)
        .get('/api/reviews?sort_by=WRONG&order=asc&category=social%20deduction')
        .expect(400)
        .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid sort_by query" });
        });
    });
    test('status:400 { msg: "Invalid order query" } if order is neither "asc" nor "desc"', () => {
      return request(app)
      .get('/api/reviews?sort_by=review_id&order=WRONG&category=social%20deduction')
      .expect(400)
      .then((response) => {
      expect(response.body).toEqual({ msg: "Invalid order query" });
      });
    });
    test('status:400 { msg: "Invalid category query" } if category query is not a current category in the categories table', () => {
      return request(app)
      .get('/api/reviews?sort_by=review_id&order=asc&category=WRONG')
      .expect(400)
      .then((response) => {
      expect(response.body).toEqual({ msg: "Invalid category query" });
      });
    });
    test('status:404 { msg: "Reviews not found" } if that category is not currently found on a review in the reviews table', () => {
      return request(app)
      .get('/api/reviews?sort_by=review_id&order=asc&category=children\'s%20games')
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Reviews not found" });
        });
    });
  });
});

describe('GET /api/reviews/:review_id/comments', () => {
  describe('Happy path', () => {
    test('responds with status:200 and sends array of category objects', () => {
      const review_Id = 2;
      return request(app)
        .get(`/api/reviews/${review_Id}/comments`)
        .expect(200)
        .then((response) => {
          expect(response.body.comments).toHaveLength(3);
          response.body.comments.forEach((comment) => {
            expect(comment).toMatchObject({
              review_id: expect.any(Number),
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String)
            });
          });
        });
    });
  })
  describe('Sad paths', () => {
    test('status:400 with body { msg: "Invalid query" } when review_id in path is not a number (as it should be)', () => {
      const reviewId = "not a number oops";
      return request(app)
        .get(`/api/reviews/${reviewId}/comments`)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Invalid query" });
        });
    });
    test('status:404 with body { msg: "Review not found" } when review_id in path is correctly a number, but the number is not found as a review_id in the reviews table', () => {
      const reviewId = 999;
      return request(app)
        .get(`/api/reviews/${reviewId}/comments`)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Review not found" });
        });
    });
    test('no comments found relating to given review_id, status404, { msg: "No comments found" }', () => {
      const reviewId = 4;
      return request(app)
        .get(`/api/reviews/${reviewId}/comments`)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "No comments found" });
        });
    });
  })
})

describe('POST /api/reviews/:review_id/comments', () => {
  describe('Happy path', () => {
    test('status:201 response.body.comment is a valid comment object with keys: comment_id, body, votes, author, review_id, created_at', () => {
      const requestBody = {
        username: 'philippaclaire9',
        body: 'blah blah blah blah. Here is some content!'
      };
      const reviewId = 1
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(requestBody)
        .expect(201)
        .then((response) => {
          expect(response.body.comment).toMatchObject({
            comment_id: 7,
            body: 'blah blah blah blah. Here is some content!',
            votes: 0,
            author: 'philippaclaire9',
            review_id: 1,
            created_at: expect.any(String)
          });
        }); 
    });
  });
  describe('Sad paths', () => {
    test('status:400 with body { msg: "Invalid query" } when review_id in path is not a number (as it should be)', () => {
      const reviewId = "not a number oops";
      const requestBody = {
        username: 'philippaclaire9',
        body: 'blah blah blah blah. Here is some content!'
      };
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(requestBody)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Invalid query" });
        });
    });
    test('status:404 with body { msg: "Review not found" } when review_id in path is correctly a number, but the number is not found as a review_id in the reviews table', () => {
      const reviewId = 999;
      const requestBody = {
        username: 'philippaclaire9',
        body: 'blah blah blah blah. Here is some content!'
      };
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(requestBody)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Review not found" });
        });
    });
    test('status:400 with body { msg: "Invalid request body" } requestbody contains more keys than just username and body', () => {
      const reviewId = 1;
      const requestBody = {
        username: 'philippaclaire9',
        body: 'blah blah blah blah. Here is some content!',
        bad_key: "voila!"
      };
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(requestBody)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Invalid request body" });
        });
    });
    test('status:400 with body { msg: "Invalid request body" }  requestbody has a typo on the username or body key', () => {
      const reviewId = 1;
      const requestBody = {
        userame: 'philippaclaire9',
        body: 'blah blah blah blah. Here is some content!'
      };
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(requestBody)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Invalid request body" });
        });
    });
    test('status:400 with body { msg: "Invalid request body" }  requestbody is missing either username or body', () => {
      const reviewId = 1;
      const requestBody = {
        body: 'blah blah blah blah. Here is some content!'
      };
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(requestBody)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Invalid request body" });
        });
    });
    test('status:400 with body { msg: "Invalid request body" } requestbody is not an object', () => {
      const reviewId = 1;
      const requestBody = ["username", "body"];
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(requestBody)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Invalid request body" });
        });
    });
    test('sad path: request body missing, status:400 { msg: "Incomplete request"}', () => {
      const reviewId = 1;
      return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        // NOTE: there is intentionally no .send
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Incomplete request" });
        });
    });
  })
});

describe.only('DELETE /api/comments/:comment_id', () => {
  describe('happy path', () => {
    test('status:204, no content returned, while chosen comment has certainly been removed from database', () => {
      const commentId = 1
      const reviewId = 2
      return request(app)
      .delete(`/api/comments/${commentId}`)
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({})
      })
      .then(() => {
        return request(app)
        .get(`/api/reviews/${reviewId}/comments`)
        .expect(200)
      })
      .then((response) => {
        expect(response.body.comments).toHaveLength(2);
      });  
    });
  });
});