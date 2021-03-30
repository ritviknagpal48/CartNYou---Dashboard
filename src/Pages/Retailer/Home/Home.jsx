// @ts-nocheck
import { Redirect, Route } from "react-router";
import Navbar from "Components/Navbar";
import Sidebar from "Components/Sidebar";
import PrivateRoute from "Components/PrivateRoute";
import Dashboard from "Pages/Retailer/Dashboard/Dashboard";

import { MenuItems } from "Components/menuItemsRetailer";
import Products from "Pages/Retailer/Products/Products";

const DummyComponent = () => {
  return <h1>Dummy Component for Route Handling</h1>;
};

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
          className={"flex-auto flex-shrink-0 flex-grow md:ml-20"}
          style={{ background: "#edf2f9" }}
        >
          <Navbar />
          <Route
            path={["/retailer", "/retailer/"]}
            exact
            component={() => <Redirect to={"/retailer/dashboard"} />}
          />

          <PrivateRoute path={"/retailer/dashboard"} component={Dashboard} />
          <PrivateRoute path={"/retailer/products"} component={Products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
