// @ts-nocheck
import { Redirect, Route, Switch } from "react-router";
import Navbar from "Components/Navbar";
import Sidebar from "Components/Sidebar";
import PrivateRoute from "Components/PrivateRoute";
import { MenuItems } from "Components/menuItemsRetailer";

import Dashboard from "Pages/Retailer/Dashboard/Dashboard";
import Products from "Pages/Retailer/Products/Products";
import ProductDetails from "Pages/Retailer/Products/ProductDetails.new";
import ImportList from "Pages/Retailer/ImportList/ImportList";
import LiveList from "Pages/Retailer/LiveList/LiveList";
import Shipment from "Pages/Retailer/Shipment/Shipment";
import Orders from "Pages/Retailer/Orders/Orders";
import Billing from "Pages/Retailer/BIlling/Billing";
import Settings from "Pages/Retailer/Settings/Settings";
import Support from "Pages/Retailer/Support/Support";
import AddNewChannel from "Pages/Retailer/ChannelList/AddNewChannel";
import ChannelList from "Pages/Retailer/ChannelList/ChannelList";
import Warehouses from "../Warehouses/Warehouses";
import AddWarehouse from "../Warehouses/AddWarehouse";

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
          style={{ background: "#fff" }}
        >
          <Navbar menuList={MenuItems} />
          <Switch>
            <Route
              path={["/retailer", "/retailer/"]}
              exact
              component={() => <Redirect to={"/retailer/dashboard"} />}
            />
            <PrivateRoute path={"/retailer/dashboard"} component={Dashboard} />
            <PrivateRoute
              path={"/retailer/products"}
              exact
              component={Products}
            />
            <PrivateRoute
              path={"/retailer/products/:id"}
              component={ProductDetails}
            />
            <PrivateRoute path={"/retailer/orders"} component={Orders} />
            <PrivateRoute path={"/retailer/shipments"} component={Shipment} />
            <PrivateRoute path={"/retailer/shipments"} component={Shipment} />
            <PrivateRoute path={"/retailer/billing"} component={Billing} />
            <PrivateRoute
              path={"/retailer/import-list"}
              component={ImportList}
            />
            <PrivateRoute path={"/retailer/live-list"} component={LiveList} />
            <PrivateRoute path={"/retailer/setting"} component={Settings} />
            <PrivateRoute path={"/retailer/support"} component={Support} />
            <PrivateRoute
              path={"/retailer/channel-list"}
              component={ChannelList}
            />
            <PrivateRoute
              path={"/retailer/add-new-channel/:name"}
              component={AddNewChannel}
            />
            <PrivateRoute
              path={"/retailer/edit-channel/:id"}
              component={AddNewChannel}
            />
            <PrivateRoute
              path={"/retailer/warehouses"}
              component={Warehouses}
            />
            <PrivateRoute
              path={"/retailer/add-warehouse"}
              component={AddWarehouse}
            />
            <PrivateRoute
              path={"/retailer/update-warehouse"}
              component={AddWarehouse}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Home;
