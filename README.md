## Wordlynx

It's a word game!

You need to create a word from letters in one minute.
The longer the word, the better.
You earn points for each letter.

## Stack:

TypeScript, Canvas API, React, Redux, nginx, Git, GitHub Actions, Docker, Vite, HTML5, SASS, Express, Node.JS, Postgresql, Sequelize, jest

## Main functions:

- Word game
- Authorization/registration (using login/password and oAuth)
- Editing profile data
- Creating forum topics
- Creating messages, replies, and adding reactions in the forum
- Saving results to the Leaderboard
- Switching themes

## Basic commands

Before the first run:
```
yarn install
node init.js
```

### How do I start developing in hot-reload mode with a DB in Docker?

By default, the server starts on localhost:3001. In separate terminals:
```
yarn docker:db
```
```
yarn dev
```

### How do I build and run the Server and DB in Docker?

```
yarn docker:build
```

### How to build a Client with nginx and a Server in production?

```
yarn docker:prod
```

### Tests

Used for the client [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)
```
yarn test
```

### Linting

```
yarn lint
```

### Prettier formatting

```
yarn format
```

### Production environment in Docker

Start three services:
1. nginx, which serves client statics (client)
2. node, your server (server)
3. postgres, your data stores (postgres)
```
docker compose up
```

If you only need one service, just specify which one:
```
docker Compose Up {sevice_name}
```

for example 
```
Docker Compose Up Server
```
