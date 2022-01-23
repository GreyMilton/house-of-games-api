const express = require('express');
const app = require('../app.js');
const apiRouter = express.Router();

const categoryRouter = require('./categories-routes.js');
const commentsRouter = require('./comments-routes.js');
const reviewsRouter = require('./reviews-routes.js');
const usersRouter = require('./users-routes.js');


apiRouter.get('/', (req, res, next) => {
  res.status(200).send({
    msg: "Hello, this is your API router. Here are all currently available endpoints!",
    endpoints: [
      { endpoint: '/api/categories',
        methods: ['GET'],
        description: 'Serves up an array of all categories.'
      },
      { endpoint: '/api/reviews/:review_id',
        methods: ['GET', 'PATCH'],
        description: 'Get method will serve up the data of the review matching the supplied review id. Patch method will update the votes count of the matching review, and respond with the newly updated review.'
      },
      { endpoint: '/api/reviews',
        methods: ['GET'],
        description: 'Serves an array of all reviews, or a selection when using queries. Available queries are "category", "sort_by", and "order" ("asc" or "desc").'
      },
      { endpoint: '/api/reviews/:review_id/comments',
        methods: ['GET', 'POST'],
        description: 'Get method will serve up an array of the data of all comments relating to the review that matches the supplied review id. Post method will post a new comment onto the matching review, and respond with the new comment.'
      },
      { endpoint: '/api/comments/:comment_id',
        methods: ['DELETE'],
        description: 'Deletes comment that matches the supplied comment id.'
      },
      { endpoint: '/api',
        methods: ['GET'],
        description: 'Serves up a json representation of all the available endpoints of the api. This is where you are now!'
      }
    ]
  });
})


apiRouter.use('/categories', categoryRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;