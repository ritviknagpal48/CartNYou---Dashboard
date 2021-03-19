import { Route } from "react-router"
import Navbar from "../../Components/Navbar"
import Products from "../Products/Products"

const classes = {
  wrapper: ""
}

const Home = () => {

  return (
    <div className={classes.wrapper}>
      <Navbar />
      <Route path={'/app/dashboard'} component={() => {
        return <div className="text-2xl text-white font-bold text-center">Dashboard</div>
      }} />
      <Route path={'/app/products'} component={Products} />
      <Route path={'/app/orders'} component={() => {
        return <div className="text-2xl text-white font-bold text-center">Orders</div>
      }} />
      <Route path={'/app/reports'} component={() => {
        return <div className="text-2xl text-white font-bold text-center">Reports</div>
      }} />
    </div>
  )
}

export default Home
