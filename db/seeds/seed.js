const db = require('../connection.js');

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
    const createTableStr = `
      CREATE TABLE categories (
        slug VARCHAR(40) PRIMARY KEY,
        description VARCHAR(500) NOT NULL
      );`;
    return db.query(createTableStr);
  })
  .then(() => {
    console.log("created categories table");
    const createTableStr = `
      CREATE TABLE users (
        username VARCHAR(30) PRIMARY KEY,
        name VARCHAR(40),
        avatar_url VARCHAR(300)
      );`;
    return db.query(createTableStr)
  })
  .then(() => {
    console.log("created users table");
    const createTableStr = `
      CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        designer VARCHAR(50),
        owner VARCHAR(30),
        FOREIGN KEY (owner) REFERENCES users(username),
        review_img_url VARCHAR(300) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        review_body VARCHAR(1500),
        category VARCHAR(40),
        FOREIGN KEY (category) REFERENCES categories(slug),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0
      );`;
    return db.query(createTableStr)
  })
  .then(() => {
    console.log("created reviews table");
    const createTableStr = `
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
  return db.query(createTableStr);
  })
  .then(() => {
    console.log("created comments table");
  })
  .catch((err) => {
    console.log(err);
  })
  // 2. insert data
};

module.exports = seed;

//        created_at TIMESTAMP DEFAULT CURRENT TIMESTAMP,