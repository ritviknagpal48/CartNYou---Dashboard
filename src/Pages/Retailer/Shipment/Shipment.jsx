import React from "react";
import { Button, Radio, Menu, Dropdown, message } from "antd";
import shipmentTableHeading from "./shipmentTableHeading";
import { MoreOutlined } from "@ant-design/icons";
import TableComponent from "../../../Components/TableComponent";
import "./Shipment";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4",
  header: "w-full  py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 shadow-lg bg-white hover:text-red-400 hover:border hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
};

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const menu = (
  <Menu onClick={onClick} style={{ border: "1px solid #ebebeb" }}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

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
        <div className={classes.header} style={{ background: "#edf2f9" }}>
          <div className={classes.title}>Shipments</div>
          <div className={classes.buttons}>
            <button button type="button" className={classes.button_input}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={classes.action_icons}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Bulk Cancel
            </button>
            <button button type="button" className={classes.button_input}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={classes.action_icons}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Export
            </button>
            <button button type="button" className={classes.button_input}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={classes.action_icons}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Bulk Label
            </button>
            <button button type="button" className={classes.button_input}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={classes.action_icons}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>

        <div className="bg-white  px-4 py-6  rounded-md shadow-xl">
          <div className="tabs-group pb-5">
            <Radio.Group value={size} onChange={this.handleSizeChange}>
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="booked">Booked (0)</Radio.Button>
              <Radio.Button value="pendingPickup">
                Pending Pickup (0)
              </Radio.Button>
              <Radio.Button value="transit">In Transit (0)</Radio.Button>
              <Radio.Button value="outForDelivery">
                Out For Delivery (0)
              </Radio.Button>
              <Radio.Button value="delivered">Delivered (0)</Radio.Button>
              <Radio.Button value="cancelled">Cancelled (0)</Radio.Button>
              <Radio.Button value="dropdown">
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link hover:text-white"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    More <MoreOutlined />
                  </a>
                </Dropdown>
              </Radio.Button>
            </Radio.Group>
          </div>
          <hr style={{ marginBottom: "20px" }} />
          <TableComponent
            heading={shipmentTableHeading}
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
