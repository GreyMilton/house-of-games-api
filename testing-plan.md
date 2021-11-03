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


    to test and implement:
  sad paths:
  - review_id a number that is not currently used: status404, { msg: "Review not found" }