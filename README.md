# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting Started

1. Fork
2. Clone

# Express API - React CRUD

```sh
cd express-api-react
npm install
```

Create a .env file with the database credentials:

```sh
cat - <<EOF >> .env
DEV_DATABASE=wishlist_app_development
DEV_HOST=127.0.0.1
TEST_DATABASE=wishlist_app_test
TEST_HOST=127.0.0.1
EOF
```

> Note: We could have created that file using VS Code, but instead we used a quick bash shortcut.

```sh
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Make sure the data exists:

```sh
psql wishlist_app_development
SELECT * FROM "Users" JOIN "Items" ON "Users".id = "Items"."userId";
```

Make sure the tests pass:

```sh
npx sequelize-cli db:create --env test
npm test
```

Run the server:

```sh
npm start
```

Test the following routes in your browser:

- http://localhost:3000/api/users
- http://localhost:3000/api/users/3
- http://localhost:3000/api/items/1

Now open a new tab in the terminal. Make sure you're inside the repo.

Let's create our React app.

```sh
cd express-api-react
npx create-react-app client
```

