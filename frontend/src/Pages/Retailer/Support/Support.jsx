import React from "react";
import { message, Form, Input, Button, Select } from "antd";
import Toolbar from "Components/Toolbar";
import "./Support.css";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
  header: "w-full  py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 shadow-lg bg-white hover:text-red-400 hover:border hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
};

const ImportListActions = [
  {
    onClick: () => {
      message.success("Check TIckets", 1);
    },
    icon: (
      <svg
        className={classes.action_icons}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
        />
      </svg>
    ),
    name: "View All Tickets",
  },
];

class Support extends React.Component {
  render() {
    return (
      <div className={`${classes.wrapper} retailer-support-page`}>
        <Toolbar title={"Having an issue?"} actions={ImportListActions} />

        <div className="flex  md:flex-row sm:flex-col flex-col">
          <div
            className="md:w-1/2 w-full text-gray-500 bg-white shadow-xl rounded-md max-h-full "
            style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
          >
            <div className="text-lg flex font-semibold items-center p-3 pt-5">
              <svg
                className="h-5 w-5 mr-2 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ef4444"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Select Escalation Type
            </div>
            <div className="flex flex-col w-full p-3">
              <div className="flex  flex-row w-full py-2 space-x-4">
                <div className=" bg-white  border border-gray-200 rounded-lg p-4 w-1/2 h-48 hover:shadow-xl cursor-pointer transition-all hover:bg-gray-50">
                  <div className=" mb-4 flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 text-blue-500">
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow ">
                    <div className="md:text-lg text-sm font-semibold mb-2 text-gray-500">
                      Shipments related issue
                    </div>
                    <div className="ffont md:text-sm text-xs text-gray-400">
                      Escalate Here
                    </div>
                  </div>
                </div>
                <div className=" bg-white  border border-gray-200 rounded-lg p-4 w-1/2 h-48 hover:shadow-xl cursor-pointer transition-all hover:bg-gray-50">
                  <div className=" mb-4 flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-full bg-green-100 text-green-500">
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow ">
                    <div className="md:text-lg text-sm font-semibold mb-2 text-gray-500">
                      Billing & Remittance
                    </div>
                    <div className="font text-xs md:text-sm text-gray-400">
                      Escalate Here
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex  flex-row w-full py-2 space-x-4">
                <div className=" border border-gray-200 rounded-lg p-4 w-1/2 h-48 hover:shadow-xl cursor-pointer transition-all hover:bg-gray-50">
                  <div className=" mb-4 flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-full bg-yellow-100 text-yellow-500">
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="md:text-lg text-sm font-semibold text-gray-500 mb-2">
                      Product related issue
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Escalate Here
                    </div>
                  </div>
                </div>
                <div className=" bg-white border border-gray-200 rounded-lg p-4 w-1/2 h-48 hover:shadow-xl cursor-pointer transition-all hover:bg-gray-50">
                  <div className="flex mb-4 items-center justify-center flex-shrink-0 h-12 w-12 rounded-full bg-red-100 text-red-500">
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow ">
                    <div className="md:text-lg text-sm font-semibold text-gray-500 mb-2">
                      Tech Related Issues
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Escalate Here
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-10 h-5" />
          <div
            className="md:w-1/2 w-full bg-white text-gray-500 shadow-xl rounded-md "
            style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
          >
            <div className="text-lg  flex font-semibold items-center p-3 pt-5">
              <svg
                className="h-5 w-5 mr-2 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ef4444"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                />
              </svg>
              <div>Request a Callback</div>
            </div>
            <div className="p-3 w-full">
              <Form
                // labelCol={{ span: 4 }}
                label={{ color: "red" }}
                // wrapperCol={{ span: 14 }}
                layout="vertical"
                // initialValues={{ size: componentSize }}
                // onValuesChange={onFormLayoutChange}
              >
                <Form.Item label="Input">
                  <Input placeholder="Mobile Number" />
                </Form.Item>
                <Form.Item label="Select Category">
                  <Select placeholder="Select Category">
                    <Select.Option value="shipment">Shipment</Select.Option>
                    <Select.Option value="billingRemittance">
                      Billing & Remittance
                    </Select.Option>
                    <Select.Option value="technical">
                      Technical Issue
                    </Select.Option>
                    <Select.Option value="product">
                      Product Related
                    </Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Add Your Message">
                  <Input.TextArea
                    rows={4}
                    placeholder="Please explain your issue in detail"
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: "end" }}>
                  <Button
                    className="w-3/12"
                    type="primary"
                    style={{
                      color: "white",
                      border: "none",
                      background: "#ef4444",
                      borderRadius: "4px",
                      padding: "4px 30px",
                    }}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Support;
