import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { List, Typography, Divider } from "antd";
import AddShopifyForm from "./AddShopifyForm";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
  header:
    "w-full  pt-3 pb-2 md:pr-14 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-white  shadow-lg bg-white hover:text-red-500 hover:border hover:border-red-400 bg-red-500 hover:bg-red-100 hover:border hover:border-red-300",
  action_icons: "md:-ml-1 md:mr-2 h-6 w-6",
  // button_title: ":block",
};

const data = [
  "1. Login to shopify admin panel",
  "2. Go to apps",
  "3. Click on private apps button",
  "4. Click on create a private app button",
  "5. Enter title under the description tab and click on save",
  "6. Click on title, as you entered earlier",
  "7. Here you will find Shopify Key, Passowrd, Shared Secret",
  "8. Copy the identifiers and integrate the channel",
];

export class AddNewChannel extends Component {
  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.header} style={{ background: "#edf2f9" }}>
          <div className={classes.title}>Add New Channel</div>
          <div className={classes.buttons}>
            <button
              onClick={() => this.props.history.goBack()}
              className={`${classes.button_input}`}
            >
              <span className={classes.button_title}>Cancel</span>
            </button>
          </div>
        </div>
        <div className="body  pr-4 md:pr-14 pl-4">
          <hr style={{ margin: "8px 10px 16px", borderColor: "#dfdfdf" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4 md:pr-14 pl-4 mb-6">
          <div className=" bg-white w-full rounded-lg shadow-xl pl-3 pt-2">
            <List
              style={{ border: "1 solid transparent" }}
              header={
                <div
                  className="text-lg text-gray-600"
                  style={{ fontWeight: "bold" }}
                >
                  Steps to link shopify account
                </div>
              }
              // footer={<div>Footer</div>}
              bordered
              size={"small"}
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            {/* <div className="title">
              Steps to link shopify account
            </div>
            <div className="steps">

            </div> */}
          </div>
          <div className=" bg-white w-full rounded-lg shadow-xl px-6 pb-6 pt-4">
            <AddShopifyForm />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddNewChannel);
