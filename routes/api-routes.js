const express = require('express');
const app = require('../app.js');
const apiRouter = express.Router();

const categoryRouter = require('./categories-routes.js');
const commentsRouter = require('./comments-routes.js');
const reviewsRouter = require('./reviews-routes.js');
const usersRouter = require('./users-routes.js');


apiRouter.get('/', (req, res, next) => {
  res.status(200).send({
    msg: "Hello, this is your API router, all good here!",
    endpoints: [
      { endpoint: '/api/categories',
        methods: ['GET'],
        description: ''
      },
      { endpoint: '/api/reviews/:review_id',
        methods: ['GET', 'PATCH'],
        description: ''
      },
      { endpoint: '/api/reviews',
        methods: ['GET'],
        description: ''
      },
      { endpoint: '/api/reviews/:review_id/comments',
        methods: ['GET', 'POST'],
        description: ''
      },
      { endpoint: '/api/comments/:comment_id',
        methods: ['DELETE'],
        description: ''
      },
      { endpoint: '/api',
        methods: ['GET'],
        description: ''
      }
    ]
  });
})


apiRouter.use('/categories', categoryRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;