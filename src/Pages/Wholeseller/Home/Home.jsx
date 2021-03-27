import { Redirect, Route } from "react-router";
import Navbar from "Components/Navbar";
import Sidebar from "Components/Sidebar";
import Dashboard from "Pages/Wholeseller/Dashboard/Dashboard";
import Orders from "Pages/Wholeseller/Orders/Orders";
import AddNewProduct from "Pages/Wholeseller/Products/AddNewProduct";
import Products from "Pages/Wholeseller/Products/ProductsPage";
import Shipment from "Pages/Wholeseller/Shipment/Shipment";
import Warehouses from "Pages/Wholeseller/Warehouses/Warehouses";
import { useContext } from "react";
import { AuthContext } from "Contexts/Auth";
import OrderDetails from "../Orders/OrderDetails";

const Home = () => {

  const auth = useContext(AuthContext)
  console.log(auth)

  return (
    <div className={"flex flex-col min-h-full"}>
      <div className={"flex flex-auto flex-row min-h-full min-w-full w-full"}>
        <Sidebar
          className={
            "hidden md:block shadow-2xl md:fixed top-0 left-0 bottom-0"
          }
        />
        <div
          className={"flex-auto flex-shrink-0 flex-grow md:ml-20"}
          style={{ background: "#f2f3f3" }}
        >
          <Navbar />
          <Route
            path={"/app"}
            exact
            component={() => <Redirect to={"/app/dashboard"} />}
          />
          <Route path={"/app/dashboard"} component={Dashboard} />
          <Route path={"/app/products"} component={Products} />
          <Route path={"/app/orders/:id"} exact component={OrderDetails} />
          <Route path={"/app/orders"} exact component={Orders} />
          <Route path={"/app/shipment"} component={Shipment} />
          <Route path={"/app/add-new-product"} component={AddNewProduct} />
          <Route path={"/app/warehouses"} component={Warehouses} />
        </div>
      </div>
    </div>
  );
};

export default Home;
