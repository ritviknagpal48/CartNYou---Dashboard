// @ts-nocheck
import { Redirect, Route } from "react-router";
import Navbar from "Components/Navbar";
import Sidebar from "Components/Sidebar";
import Dashboard from "Pages/Wholeseller/Dashboard/Dashboard";
import Orders from "Pages/Wholeseller/Orders/Orders";
import AddNewProduct from "Pages/Wholeseller/Products/AddNewProduct";
import Products from "Pages/Wholeseller/Products/ProductsPage";
import Shipment from "Pages/Wholeseller/Shipment/Shipment";
import Warehouses from "Pages/Wholeseller/Warehouses/Warehouses";
import OrderDetails from "../Orders/OrderDetails";
import PrivateRoute from "Components/PrivateRoute";
import TrackOrder from "../TrackOrder/TrackOrder";

const Home = () => {
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
          style={{ background: "#edf2f9" }}
        >
          <Navbar />
          <Route
            path={"/app"}
            exact
            component={() => <Redirect to={"/app/dashboard"} />}
          />
          <PrivateRoute path={"/app/dashboard"} component={Dashboard} />
          <PrivateRoute path={"/app/products"} component={Products} />
          <PrivateRoute path={"/app/orders/:id"} exact component={OrderDetails} />
          <PrivateRoute path={"/app/track-order/:id"} exact component={TrackOrder} />
          <PrivateRoute path={"/app/orders"} exact component={Orders} />
          <PrivateRoute path={"/app/shipment"} component={Shipment} />
          <PrivateRoute path={"/app/add-new-product"} component={AddNewProduct} />
          <PrivateRoute path={"/app/warehouses"} component={Warehouses} />
        </div>
      </div>
    </div>
  );
};

export default Home;
