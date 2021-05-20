// @ts-nocheck
import { Redirect, Route } from "react-router";
import Navbar from "Components/Navbar";
import Sidebar from "Components/Sidebar";
import Dashboard from "Pages/Wholesaler/Dashboard/Dashboard";
import Orders from "Pages/Wholesaler/Orders/Orders";
import AddNewProduct from "Pages/Wholesaler/Products/AddNewProduct";
import Products from "Pages/Wholesaler/Products/ProductsPage";
import Shipment from "Pages/Wholesaler/Shipment/Shipment";
import Warehouses from "Pages/Wholesaler/Warehouses/Warehouses";
import AddWarehouse from "Pages/Wholesaler/Warehouses/AddWarehouse";
import OrderDetails from "Pages/Wholesaler/Orders/OrderDetails";
import TrackOrder from "Pages/Wholesaler/TrackOrder/TrackOrder";
import PrivateRoute from "Components/PrivateRoute";
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
            path={"/wholesaler"}
            exact
            component={() => <Redirect to={"/wholesaler/dashboard"} />}
          />
          <PrivateRoute path={"/wholesaler/dashboard"} component={Dashboard} />
          <PrivateRoute path={"/wholesaler/products"} component={Products} />
          <PrivateRoute
            path={"/wholesaler/orders/:id"}
            exact
            component={OrderDetails}
          />
          <PrivateRoute
            path={"/wholesaler/track-order/:id"}
            exact
            component={TrackOrder}
          />
          <PrivateRoute path={"/wholesaler/orders"} exact component={Orders} />
          <PrivateRoute path={"/wholesaler/shipment"} component={Shipment} />
          <PrivateRoute
            path={"/wholesaler/add-new-product"}
            component={AddNewProduct}
          />
          <PrivateRoute
            path={"/wholesaler/edit-product/:productID"}
            component={AddNewProduct}
          />
          P
          <PrivateRoute
            path={"/wholesaler/warehouses"}
            component={Warehouses}
          />
          <PrivateRoute
            path={"/wholesaler/add-warehouse"}
            component={AddWarehouse}
          />
          <PrivateRoute
            path={"/wholesaler/update-warehouse"}
            component={AddWarehouse}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
