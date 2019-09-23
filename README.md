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
DEV_DATABASE=items_app_development
DEV_HOST=127.0.0.1
TEST_DATABASE=items_app_test
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
psql items_app_development
SELECT * FROM "Items";
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

- http://localhost:3000/api/items
- http://localhost:3000/api/items/3

Now open a new tab in the terminal. Make sure you're inside the repo.

Let's create our React app.

```sh
cd express-api-react
npx create-react-app client
```

Let's start by adding [react router]():

```sh
cd client
npm install react-router-dom
```
> Important: Notice how there are two package.json's one in the root of the repo for the server, and the other inside the client folder. Make sure you're inside the client folder. We want to install the react router package so we can use it for the react app.

And now let's setup our app to use react router:

client/index.js
```js
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```

Cool. Now let's setup our routes.  A route will render an associated component. Below is the list:

`/` - the homepage, just display a welcome screen. It will render a Home component.
`/items` - the ability to see all items. It will render an Items component.
`/create-item` - the ability to create a new item. It will render an ItemCreate component.
`/items/:id` - the ability to see a specific item. It will render an Item component.
`/items/:id/edit` - the ability to edit an item. It will render an ItemEdit component.

Let's start by creating our empty components:

```sh
cd src
mkdir components
cd components
mkdir routes
touch Home.jsx Item.jsx ItemCreate.jsx ItemEdit.jsx Items.jsx
```

Now let's create our routes:

client/App.js
```js
import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import Items from './components/routes/Items'
import Item from './components/routes/Item'
import ItemEdit from './components/routes/ItemEdit'
import ItemCreate from './components/routes/ItemCreate'
import Home from './components/routes/Home'

const App = props => (
  <React.Fragment>
    <h3>{props.location.state ? props.location.state.msg : null}</h3>
    <Route exact path='/' component={Home} />
    <Route exact path='/items' component={Items} />
    <Route exact path='/create-item' component={ItemCreate} />
    <Route exact path='/items/:id' component={Item} />
    <Route exact path='/items/:id/edit' component={ItemEdit} />
  </React.Fragment>
)

export default withRouter(App)
```

