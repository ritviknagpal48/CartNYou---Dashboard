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
import { MenuItems } from "Components/menuItems";

const Home = () => {
  return (
    <div className={"flex flex-col min-h-full max-w-full"}>
      <div className={"flex flex-auto flex-row min-h-full min-w-full w-full"}>
        <Sidebar
          menuList={MenuItems}
          className={
            "hidden md:block shadow-2xl md:fixed top-0 left-0 bottom-0"
          }
        />
        <div
          className={"flex-auto flex-shrink-0 flex-grow md:pl-20"}
          style={{ background: "#fff" }}
        >
          <Navbar menuList={MenuItems} />
          <Route
            path={"/wholeseller"}
            exact
            component={() => <Redirect to={"/wholeseller/dashboard"} />}
          />
          <PrivateRoute path={"/wholeseller/dashboard"} component={Dashboard} />
          <PrivateRoute path={"/wholeseller/products"} component={Products} />
          <PrivateRoute
            path={"/wholeseller/orders/:id"}
            exact
            component={OrderDetails}
          />
          <PrivateRoute
            path={"/wholeseller/track-order/:id"}
            exact
            component={TrackOrder}
          />
          <PrivateRoute path={"/wholeseller/orders"} exact component={Orders} />
          <PrivateRoute path={"/wholeseller/shipment"} component={Shipment} />
          <PrivateRoute
            path={"/wholeseller/add-new-product"}
            component={AddNewProduct}
          />
          <PrivateRoute
            path={"/wholeseller/edit-product/:productID"}
            component={AddNewProduct}
          />
          P
          <PrivateRoute path={"/retailer/warehouses"} component={Warehouses} />
          <PrivateRoute
            path={"/retailer/add-warehouse"}
            component={AddWarehouse}
          />
          <PrivateRoute
            path={"/retailer/update-warehouse"}
            component={AddWarehouse}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
