import React from "react";
import { Radio } from "antd";
import OrderTableHeading from "./orderTableHeading";
import TableComponent from "../../../Components/TableComponent";
import { OrdersMenuButton } from "./OrdersMenuButton";
import { message } from "antd";
import Toolbar from "Components/Toolbar";
import "./Orders.css";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4",
  header: "w-full  py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 shadow-lg bg-white hover:text-red-400  focus:outline-none ",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
};

const ImportListActions = OrdersMenuButton;

class Orders extends React.Component {
  state = {
    size: "all",
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
    console.log(this.state.size);
  };

  render() {
    const { size } = this.state;

    return (
      <div className={`${classes.wrapper} retailer-order-page`}>
        <Toolbar title={"Orders"} actions={ImportListActions} />
        <div className="bg-white px-4 py-6  rounded-md shadow-xl">
          <div className="tabs-group pb-5">
            <Radio.Group value={size} onChange={this.handleSizeChange}>
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="new">New (0)</Radio.Button>
              <Radio.Button value="booked">Booked (0)</Radio.Button>
              <Radio.Button value="cancelled">Cancelled (0)</Radio.Button>
              <Radio.Button value="missingSKU">Missing SKU (0)</Radio.Button>
            </Radio.Group>
          </div>
          <hr style={{ marginBottom: "20px" }} />
          <TableComponent
            heading={OrderTableHeading}
            data={""}
            isActiveSearch={false}
            searchedColumn={""}
            defaultSearchColumn={""}
          />
        </div>
      </div>
    );
  }
}
export default Orders;
