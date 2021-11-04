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

  
    to test and implement:

  - sad path: request body is not in correct format with a key typo like "inc_otes" instead of "inc_votes. status:400 { msg: "Invalid request body"}
  - sad path: request body is not in correct format with object being too large: more than one key. status:400 { msg: "Invalid request body"}
  - sad path: request body is not in correct format as in it is not an object. status:400 { msg: "Invalid request body"}
  - sad path: request body value is not a number, e.g. a string of characters, undefined, or something else status:400 { msg: "Invalid request body - invalid value"}
  - sad path: request body missing,  status:400 { msg: "Incomplete request"}
  
