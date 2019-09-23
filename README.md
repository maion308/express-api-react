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

A simple Home component:
src/components/routes/Home.jsx
```js
import React from 'react'
import Layout from '../shared/Layout'

const Home = () => (
  <Layout>
    <h4>Welcome to the items app!</h4>
  </Layout>
)

export default Home
```

Notice the Layout component. We are going to build the Layout component next. This is a shared component that we will re-use multiple times. Essentially, the Layout component is the shell of the web app we are building.

Let's create our "shared" components. The idea of shared components is that anytime we have code that we would repeat in several components (a footer, a navbar, etc), we can wrap that code inside a component and import it in whenever needed.

```sh
cd client/src/components
mkdir shared
touch Layout.jsx Footer.jsx Nav.jsx
```

Let's start with the Layout component:

components/shared/Layout.jsx
```js
import React from 'react'

import Nav from './Nav'
import Footer from './Footer'

const Layout = props => (
  <div>
    <h1>Items App</h1>
    <Nav />

    {props.children}

    <Footer />
  </div>
)

export default Layout
```

> Note: We are using `props.children` here. [React Children](https://reactjs.org/docs/react-api.html#reactchildren) is a placeholder for which ever component calls the component that `props.children` is in. You will see this in action in a minute.

Let's create our Nav component:

components/shared/Nav.jsx
```js
import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/items'>Items</NavLink>
    <NavLink to='/create-item'>Create Item</NavLink>
  </nav>
)

export default Nav
```

And the Footer component:

components/shared/Footer.jsx

```js
import React from 'react'

const Footer = () => (
  <p>© Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
)

export default Footer
```

Let's make sure the app is working.

```sh
cd express-api-react
npm start
```

Open a new tab in your terminal and run your client:

```sh
cd client
npm start
```

Open your browser and test the route http://localhost:3001/. The Home component should render but the outer links will not work yet because we haven't built them out yet.

Cool. We are done with shared components for now.

Now let's build the Items component.

We will be making an axios call in the Items component to fetch all the Items from the server. 

Let's start by installing [axios](https://www.npmjs.com/package/axios). Make sure you're in the client folder.

```sh
cd client
npm install axios
```

> When you run `npm install axios`, make sure you're inside the client folder where the package.json exists.

Now we can build the Items component:

```js
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Items extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: []
    }
  }

  async componentDidMount () {
    try {
      const response = await axios(`http://localhost:3000/api/items`)
      this.setState({ items: response.data.items })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const items = this.state.items.map(item => (
      <li key={item.id}>
        <Link to={`/items/${item.id}`}>{item.title}</Link>
      </li>
    ))

    return (
      <>
        <h4>Items</h4>
        <ul>
          {items}
        </ul>
      </>
    )
  }
}

export default Items
```

Test the http://localhost:3001/items route in your browser.

Good? Great. Let's move on to the Item component.

components/routes/Item.jsx
```js
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import Layout from '../shared/Layout'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: null,
      deleted: false
    }
  }

  async componentDidMount() {
    try {
      const response = await axios(`http://localhost:3000/api/items/${this.props.match.params.id}`)
      this.setState({ item: response.data.item })
    } catch (err) {
      console.error(err)
    }
  }

  destroy = () => {
    axios({
      url: `http://localhost:3000/api/items/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render() {
    const { item, deleted } = this.state

    if (!item) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Item succesfully deleted!' } }
      } />
    }

    return (
      <Layout>
        <h4>{item.title}</h4>
        <p>Link: {item.link}</p>
        <button onClick={this.destroy}>Delete Item</button>
        <Link to={`/items/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/items">Back to all items</Link>
      </Layout>
    )
  }
}

export default Item
```

We should now be able to see http://localhost:3001/items/1.

Next, we want to implement the ItemEdit and ItemCreate. Inside the ItemEdit component we will have a form to edit an item. And Inside the ItemCreate component we will have form to create an item. What if we could abstract those two forms into one? We can, so let's do that now by creating another shared component called ItemForm:

```sh
cd components/shared/
touch ItemForm.jsx
```

components/shared/ItemForm.jsx
```js
import React from 'react'
import { Link } from 'react-router-dom'

const ItemForm = ({ item, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="A vetted item."
      value={item.title}
      name="title"
      onChange={handleChange}
    />

    <label>Link</label>
    <input
      placeholder="http://acoolitem.com"
      value={item.link}
      name="link"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ItemForm
```

Awesome! Now let's build our ItemEdit component:

components/routes/ItemEdit.jsx
```js
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import ItemForm from '../shared/ItemForm'
import Layout from '../shared/Layout'

class ItemEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: {
                title: '',
                link: ''
            },
            updated: false
        }
    }

    async componentDidMount() {
        try {
            const response = await axios(`http://localhost:3000/api/items/${this.props.match.params.id}`)
            this.setState({ item: response.data.item })
        } catch (err) {
            console.error(err)
        }
    }

    handleChange = event => {
        const updatedField = { [event.target.name]: event.target.value }

        const editedItem = Object.assign(this.state.item, updatedField)

        this.setState({ item: editedItem })
    }

    handleSubmit = event => {
        event.preventDefault()

        axios({
            url: `http://localhost:3000/api/items/${this.props.match.params.id}`,
            method: 'PUT',
            data: { item: this.state.item }
        })
            .then(() => this.setState({ updated: true }))
            .catch(console.error)
    }

    render() {
        const { item, updated } = this.state
        const { handleChange, handleSubmit } = this

        if (updated) {
            return <Redirect to={`/items/${this.props.match.params.id}`} />
        }

        return (
            <Layout>
                <ItemForm
                    item={item}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelPath={`/items/${this.props.match.params.id}`}
                />
            </Layout>
        )
    }
}

export default ItemEdit
```

Let's test that. Open http://localhost:3001/items/1 and edit a field.

Nice! Now try delete. Bye.

Ok. We have one last CRUD action to complete in our react app - CREATE. Let's build the ItemCreat component and use our ItemForm shared component:

components/routes/ItemForm.jsx
```js
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import ItemForm from '../shared/ItemForm'
import Layout from '../shared/Layout'

class ItemCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: {
                title: '',
                link: ''
            },
            createdItemId: null
        }
    }

    handleChange = event => {
        const updatedField = { [event.target.name]: event.target.value }

        const editedItem = Object.assign(this.state.item, updatedField)

        this.setState({ item: editedItem })
    }

    handleSubmit = event => {
        event.preventDefault()

        axios({
            url: `http://localhost:3000/api/items`,
            method: 'POST',
            data: { item: this.state.item }
        })
            .then(res => this.setState({ createdItemId: res.data.item.id }))
            .catch(console.error)
    }

    render() {
        const { handleChange, handleSubmit } = this
        const { createdItemId, item } = this.state

        if (createdItemId) {
            return <Redirect to={`/items/${createdItemId}`} />
        }

        return (
            <Layout>
                <ItemForm
                    item={item}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelPath="/"
                />
            </Layout>
        )
    }
}

export default ItemCreate
```
