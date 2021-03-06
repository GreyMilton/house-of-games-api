# Grey's House of Games API

## What is this?

This is the git repository (repo) of a *portfolio project* by me, Grey Milton. It was created in early November 2021 while undertaking a Full-Stack JavaScript Bootcamp with [Northcoders](https://northcoders.com) (UK).

*The project is an API* that mimicks a real world backend service (such as reddit). It was constructed in such a way that it could hypothetically be used to provide information for further front end architecture at a later date.

It was in fact used in another project of mine three weeks later - a frontend web app.
<br>
<br>

>## Link to the hosted API:

I have hosted a version of the API on Heroku. You can [access it here](https://house-of-games-api.herokuapp.com)
<br>
<br>

## Links to the frontend web app that uses this API:

As mentioned above, this API is used by a web app I created for a later project. You can find [the web app's repo on GitHub here](https://github.com/GreyMilton/house-of-games-frontend), and you can find the [live deployed web app here](https://house-of-games-frontend.netlify.app/).

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

To have a play with the API, go to [this link](https://house-of-games-api.herokuapp.com).

If you're unsure where to start, try `/api` as your first endpoint to `GET`. You can do this by simply navigating to https://house-of-games-api.herokuapp.com/api with you browser. In doing just this, you will be `GET`-ing data from the endpoint.

>The data that you will '`GET`' from navigating to `/api` will describe each further endpoint that can be accessed at the API, what methods they use, and how they work.
<br>
<br>

------------------------------------------------------
<br>

# How can I use this repo?

If you'd like to install and run this git repository on your own machine, rather than only viewing the repo on GitHub, or than by accessing the hosted version of the API at the [link above](https://house-of-games-api.herokuapp.com), you will need to:

1. Install Node.js and Postgres on your computer.
2. Fork and clone this repo to your computer.
3. Install npm dependencies.
4. Create two simple `.env` files.
5. Create local databases and seed.
6. Run the provided tests.

>***Please note*** All the steps in this README assume you are using a relatively up-to-date `apple mac computer`. Additional steps may be required to get this repo running correctly on a windows, linux, or other operating system.
<br>
<br>

## 1. Install Node.js and Postgres

If you do not already have Node.js and Postgres installed on your machine, you will need to install them in order to run this repo correctly.

You can [download Node.js here](https://nodejs.org/en/download/).

You can [download Postgres here](https://www.postgresql.org/download/).
<br>
<br>

## 2. Fork and clone this repo

Provided you have a GitHub account (free), you can `fork` this repo (optional) by clicking the `fork` button in the top right of your window [where you are now](https://github.com/GreyMilton/house-of-games-api). This will copy all of the repo information into a new repo attached to your own GitHub account.

To then `clone` this Forked version (copy to your own machine), click on the big green button `Code` also towards the top right of your screen (but further down and in), and copy the link found there. (Or you could simply copy the current url in the address bar).

Type `git clone` into your computer's terminal, and paste the copied url next to it. Then press enter:
`````
git clone https://github.com/GreyMilton/house-of-games-api
`````

Now open the repo with your coding program of choice ([VSCode](https://code.visualstudio.com/) is a good one).
<br>
<br>

## 3. Install npm dependencies.

The following npm infrastructure will need to be installed for the repo to run correctly. Each package is listed with the terminal command used to install it.

You can either run each line of code in your terminal, or just two: `npm init` and `npm install`. Make sure you are in the repo's root directory when you run each command.

### *npm*
`````
npm init
`````
<br>

>### install all dependencies
>Run this command to install all dependencies listed below.
>`````
>npm install
>`````
> You can now move on to step 4.
><br>
><br>

<br>

### *express*
`````
npm install express
`````

### *dotenv*
`````
npm install dotenv
`````

### *cors*
`````
npm install cors
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