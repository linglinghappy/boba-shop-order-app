import { useRoutes, Link } from 'react-router-dom'
import DrinkList from './pages/DrinkList'
import CreateDrink from './pages/CreateDrink'
import DrinkDetail from './pages/DrinkDetail'
import EditDrink from './pages/EditDrink'
import './App.css'

const App = () => {

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <DrinkList />
    },
    {
      path: "/new",
      element: <CreateDrink />
    },
    {
      path: "/drink/:id",
      element: <DrinkDetail />
    },
    {
      path: "/edit/:id",
      element: <EditDrink />
    }
  ])

  return (
    <div className="App">

      <div className="header">
        <h1>🧋 Boba Shop</h1>
        <Link to="/"><button className="headerBtn">All Orders</button></Link>
        <Link to="/new"><button className="headerBtn">Order a Drink</button></Link>
      </div>

      {element}
    </div>
  )
}

export default App
