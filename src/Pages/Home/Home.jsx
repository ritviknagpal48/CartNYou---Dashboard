import { Route } from "react-router"
import Navbar from "../../Components/Navbar"
import Sidebar from "../../Components/Sidebar"
import Dashboard from "../Dashboard/Dashboard"
import Products from "../Products/Products"

const Home = () => {

  return (
    <div className={"flex flex-col min-h-full"}>
      <Navbar />
      <div className={'flex flex-auto flex-row min-h-full min-w-full w-full'}>
        <Sidebar className={'hidden md:block shadow-2xl'} />
        <div className={'flex-auto flex-shrink-0 flex-grow'}>
          <Route path={'/app/dashboard'} component={Dashboard} />
          <Route path={'/app/products'} component={Products} />
          <Route path={'/app/orders'} component={() => {
            return <div className="text-2xl text-white font-bold text-center">Orders</div>
          }} />
          <Route path={'/app/reports'} component={() => {
            return <div className="text-2xl text-white font-bold text-center">Reports</div>
          }} />
        </div>
      </div>
    </div>
  )
}

export default Home
