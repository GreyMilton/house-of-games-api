const db = require('../connection.js');
const format = require('pg-format');

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  return db.query(`DROP TABLE IF EXISTS comments;`).then(() => {
    return db.query(`DROP TABLE IF EXISTS reviews;`);
  })
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS users;`);
  })
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS categories;`);
  })
  .then(() => {
    const createCategories = `
      CREATE TABLE categories (
        slug VARCHAR(40) PRIMARY KEY,
        description VARCHAR(500) NOT NULL
      );`;
    return db.query(createCategories);
  })
  .then(() => {
    const createUsers = `
      CREATE TABLE users (
        username VARCHAR(30) PRIMARY KEY,
        name VARCHAR(40),
        avatar_url VARCHAR(300)
      );`;
    return db.query(createUsers)
  })
  .then(() => {
    const createReviews = `
      CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        designer VARCHAR(50),
        owner VARCHAR(30), FOREIGN KEY (owner) REFERENCES users(username),
        review_img_url VARCHAR(300) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        review_body VARCHAR(1500),
        category VARCHAR(40), FOREIGN KEY (category) REFERENCES categories(slug),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0
      );`;
    return db.query(createReviews)
  })
  .then(() => {
    const createComments = `
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      body VARCHAR(1000) NOT NULL,
      votes INT DEFAULT 0,
      author VARCHAR(30) NOT NULL,
      FOREIGN KEY (author) REFERENCES users(username),
      review_id INT NOT NULL,
      FOREIGN KEY (review_id) REFERENCES reviews(review_id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
  return db.query(createComments);
  })
  .then(() => {
    const insertIntoCategories = format (
      `INSERT INTO categories
        (slug,
        description)
      VALUES
        %L RETURNING *;
      `,
      categoryData.map((category) => {
        return [
          category.slug,
          category.description
        ]
      })
    )
    return db.query(insertIntoCategories);
  })
  // 2. insert data
  .then((response) => {
    const insertIntoUsers = format (
      `INSERT INTO users
        (username,
        name,
        avatar_url)
      VALUES
        %L RETURNING *;
      `,
      userData.map((user) => {
        return [
          user.username,
          user.name,
          user.avatar_url
        ]
      })
    )
    return db.query(insertIntoUsers);
  })
  .then((response) => {
    const insertIntoReviews = format (
      `INSERT INTO reviews
        (title,
        designer,
        owner,
        review_img_url,
        review_body,
        category,
        created_at,
        votes)
      VALUES
        %L RETURNING *;
      `,
      reviewData.map((review) => {
        return [
          review.title,
          review.designer,
          review.owner,
          review.review_img_url,
          review.review_body,
          review.category,
          review.created_at,
          review.votes
        ]
      })
    )
    return db.query(insertIntoReviews);
  })
  .then((response) => {
    const insertIntoComments = format (
      `INSERT INTO comments
        (body,
        votes,
        author,
        review_id,
        created_at)
      VALUES
        %L RETURNING *;
      `,
      commentData.map((comment) => {
        return [
          comment.body,
          comment.votes,
          comment.author,
          comment.review_id,
          comment.created_at,
        ]
      })
    )
    return db.query(insertIntoComments);

  })
  .then((response) => {
    console.log("seeding done, all tables created and data inserted");
  })
  .catch((err) => {
    console.log(err);
  })
};

module.exports = { seed };
