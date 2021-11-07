# Grey's House of Games API

## What is this repo?

This is the repo (repository) of a *portfolio project* by me, Grey Milton. It was created in November 2021 while undertaking a Full-Stack JavaScript Bootcamp with Northcoders.

The project is an API that mimicks a real world backend service (such as reddit). It is constructed in such a way that it could hypothetically be used to provide information for further front end architecture at a later date.
<br>
<br>

>## Link to the hosted API:

I have hosted a version of the API on Heroku. You can [access it here]()
<br>
<br>

## What does the API do?

The API interacts with and presents data relating to an online board games review site.  

It accesses four tables of data: `categories`, `users`, `reviews` and `comments`.

### *`Categories`*

The categories table lists different categories of board game.

### *`Users`*

The users table lists all users who have interacted with the (imaginary) website.

### *`Reviews`*

The reviews table lists all reviews that have been made by users regarding different board games.

### *`Comments`*

The comments table lists all comments that have been made on the reviews from the site.
<br>
<br>

## How can I interact with the API?

All interactions with the API are done with the http methods:
* *`GET`* (for 'getting' data)
* *`POST`* (for creating new data entries)
* *`PUT/PATCH`* (for updating pre-existing entries)
* *`DELETE`* (for removing data entries)

>The following endpoints are currently online and functional:
>* (`GET`) **/api/categories**
>* (`GET` or `PUT/PATCH`) **/api/reviews/:review_id**
>* (`GET`) **/api/reviews**
>* (`GET` or `POST`) **/api/reviews/:review_id/comments**
>* (`DELETE`) **/api/comments/:comment_id**
>* (`GET`) **/api**

These endpoints are yet to be implemented:
* (`GET`) **/api/users**
* (`GET`) **/api/users/:username**
* (`PUT/PATCH`) **/api/comments/:comment_id**

To have a play with the API, go to [this link]().

If you're unsure where to start, try `/api` as your first endpoint to `GET`. You can do this by simply navigating to *insert link*/api with you browser. In simply doing just this, you will be `GET`-ing data from the endpoint.

>The data that you will '`GET`' from navigating to `/api` will describe each further endpoint that can be accessed at the API, what methods they use, and how they work.
<br>
<br>

------------------------------------------------------
<br>

# How can I use this repo?

If you'd like to install and run this git repository on your own machine, rather than viewing it at the address you are at now, or by accessing the hosted version of the API at the [link above](), you will need to:

1. Install Node.js and Postgres.
2. Fork and clone this repo.
3. Install npm dependencies.
4. Create two simple `.env` files.
5. Create local databases and seed.
6. Run the provided tests.

>***Please note*** All the steps in this README assume you are using a relatively up-to-date `apple mac computer`. Additional steps may be required to get this repo running correctly on a windows or linux based operating system.
<br>
<br>

## 1. Install Node.js and Postgres

If you do not already have Node.js and Postgres installed on your machine, you will need to install them in order to run this repo correctly.

You can download Node.js at `insert link`.

You can download Postgres at `insert link`.
<br>
<br>

## 2. Fork and clone this repo

Provided you have a GitHub account (free), you can `fork` this repo (optional) by clicking the `fork` in the top right of your window at `insert github link`. This will copy all of the repo information into a new repo attached to your own GitHub account.

To then `clone` (copy) this Forked version, or the original repo if you prefer, to your own machine, click on the big green button `Code` also towards the top right of your screen (but further down and in), and copy the link found there. (Or you could simply copy the url in the address bar).

Type `git clone` into your terminal, and paste the copied url next to it. Then press enter:
`````
git clone "https://github.com/..."
`````

Now open the repo with your coding program of choice (VSCode is a good one).
<br>
<br>

## 3. Install npm dependencies.

The following npm infrastructure will need to be installed for the repo to run correctly. Each is listed with the terminal command used to install them. Run each line of code in your terminal, making sure you are in the repo's root directory.

### *npm*
`````
npm init
`````

### *express*
`````
npm install express
`````

### *dotenv*
`````
npm install dotenv
`````

### *pg*
`````
npm install pg
`````

### *pg-format*
`````
npm install pg-format
`````

### *jest*
`````
npm install jest -D
`````

### *supertest*
`````
npm install supertest -D
`````

### *jest-sorted*
`````
npm install jest-sorted -D
`````

Jest-sorted also requires the following piece of code to be inserted into the package.json file at root level:

`````
  "jest": {
    "setupFilesAfterEnv": ["jest-sorted"]
  }
`````
<br>
<br>

## 4. Create two `.env` files

In order for this repo to function correctly, two new files need to be created in the repo's root directory. They must have these exact names and contents:

### *.env.development*
`````
PGDATABASE=nc_games
`````

### *.env.test*
`````
PGDATABASE=nc_games_test
`````
<br>
<br>

## 5. Create local databases and seed

You can now create the repo's two local databases. They are a *'development'* database, and a *'test'* database.

In order to create the two databases, run this code in your terminal:
`````
npm run setup-dbs
`````

Next, you can fill the *'development'* database with data (tables and their contents). To do so, run this code in your terminal:
`````
npm run seed
`````

You won't need to fill the *'test'* database with data right now. This will be done automatically when you run your tests below.
<br>
<br>

## 6. Run the provided tests.

Final step! You can test the code, and make sure the API will function as intended by running the provided tests. In order to do so, write this into your terminal and press enter:

`````
npm test
`````

You should now see a satisying list of tests with green ticks next to them. Hooray!