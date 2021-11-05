## GET /api/categories

  I have tested and implemented the happy path:
- status:200 response.body.categories is an array of objects
  
  and sad path:
- a bad url (will cover all paths)
  status:404, msg: "Path not found"

  and I have implemented but not tested:
- a server error
  status:500, msg: "Server error"

## GET /api/reviews/:review_id

    tested and implemented:

  - happy path: status200, response.body { review: {} }

  - sad path: review_id not a number: status400, { msg: "Invalid query" }
  - sad path: review_id a number that is not currently used: status404, { msg: "Review not found" }

## PATCH /api/reviews/:review_id

  patch request with path and body { inc_votes: newVote } where inc_votes means votes to increment, and newVote is the amount to do so. Allow for negative number to then decrement instead of increment.

    already tested and implemented:
  
  - happy path: status 200, response.body { review: {} }

  - sad path: review_id not a number: status400, { msg: "Invalid query" }

  - sad path: review_id a number that is not currently used: status404, { msg: "Review not found" }

  - sad path: request body is not in correct format with a key typo like "inc_otes" instead of "inc_votes". status:400 { msg: "Invalid request body"}

  - sad path: request body is not in correct format with object being too large: more than one key. status:400 { msg: "Invalid request body" }

  - sad path: request body value is not a number, e.g. a string of characters, undefined, or something else status:400 { msg: "Invalid request body"}

  - sad path: request body missing,  status:400 { msg: "Incomplete request"}

## GET /api/reviews

  responds with all the reviews as they are in the database, each with an additional key-value pair: comment_count, just as was with GET /api/reviews/:review_id

  the twist: it should accept queries:
  1. `sort_by`, which sorts the reviews by any valid column (defaults to date)
  2. `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
  3. `category`, which filters the reviews by the category value specified in the query

  tested and implemented:

  - happy paths:  status200, response.body { reviews: [{},{},{}] }
  1. returns all reviews with no query being supplied

  2. returns all reviews sorted (default sorted: by the date column, descending)

  3. returns all reviews sorted by the date column when specified, defaulting to descending order.

  4. returns all reviews sorted by another valid column with number values when queried (other than the date column), defaulting to descending

  5. returns all reviews sorted by another valid column WITHOUT number values when queried (e.g. a string), defaulting to descending

  6. returns all reviews sorted by a valid column when queried (other than the date column), with descending specified

  to test and implement:

  - happy paths: status200, response.body { reviews: [{},{},{}] }

  ## NOTE: to help write these tests, remember to look through the lecture slides and NCNotes relating to tests for endpoints with queries


  7. returns all reviews sorted in ascending order by a valid column when queried (other than the date column) with ascending specified
  8. returns all reviews sorted (default sorted: by the date column), but listed in ascending order
  9. returns results filtered by category when using default sorting and ordering
  10. returns results filtered by category when ascending by a valid column is specified

  sad paths:
  - sort_by query is not a valid column
  - order is not a valid string ('asc' or 'desc')
  - category is not a valid category