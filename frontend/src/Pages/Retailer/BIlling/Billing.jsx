import React from "react";
import {
  Button,
  Form,
  Input,
  Tabs,
  DatePicker,
  Select,
  Descriptions,
  Space,
  Spin,
  message
} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import CODTableHeading from "./CODRemittanceIDHeading";
import WalletTransactionHeading from "./WalletTransactionHeading";
import ShippingChargesHeading from "./ShippingChargesHeading";
import TableComponent from "../../../Components/TableComponent";
import moment from "moment";
import { axiosInstance } from 'Contexts/useAxios';
import { AuthContext } from 'Contexts/Auth'
import "./Billing.css";

const { TabPane } = Tabs;
const { Option } = Select;

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

// const onClick = ({ key }) => {
//   message.info(`Click on item ${key}`);
// };
const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";
// const monthFormat = "YYYY/MM";

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

// const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;

class Billing extends React.Component {
  state = {
    size: "all",
    allPayments: [],
    isLoading: true
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  async componentDidMount() {
    const { token, additionalInfo: { id } } = this.context;

    await axiosInstance.post('/payments/user', { id }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => this.setState({ allPayments: res.data.payments, isLoading: false }))
      .catch(() => {
        this.setState({ isLoading: false });
        message.error('Something went wrong.');
      })
  }

  render() {
    const { size, isLoading, allPayments } = this.state;

    return (
      <div className={`${classes.wrapper} retailer-billing-page`}>
        <div className={classes.header} style={{ background: "#fff" }}>
          <div className={classes.title}>Billing</div>
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Export
            </button>
          </div>
        </div>

        <div
          className="bg-white p-4 rounded-md shadow-xl"
          style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
        >
          <div className="tabs-group pb-5">
            <Tabs defaultActiveKey="3" type="card" size={size}>
              <TabPane
                tab={
                  <span className="flex  hover:text-red-400 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="md:-ml-1 md:mr-2 h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    Price Plan
                  </span>
                }
                key="1"
              >
                <div className="text-right lg:w-2/3 md:w-full">
                  <Descriptions
                    labelStyle={{ color: "black" }}
                    style={{
                      background: "white",
                      textAlign: "center",
                      padding: "10px",
                    }}
                    title="Shipment Charges"
                    bordered
                    column={{ md: 1, sm: 1, xs: 1 }}
                  // className=" "
                  >
                    <Descriptions.Item label="Shipment Charge (FWD)">
                      ₹ 0<br />
                      <span className="text-xs text-gray-400 ">
                        (per 500 gm)
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item label="COD Charge & Percent">
                      {" "}
                      ₹ 0.00 or 0%
                      <br />
                      <span className="text-xs text-gray-400 ">
                        (whichever is higher)
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                  <span
                    className="px-2.5 w-full text-xs text-gray-500"
                    style={{ textAlign: "right" }}
                  >
                    *GST inclusive
                  </span>
                </div>

                <div className="text-xs text-gray-500 p-3">
                  <span className="text-xs text-gray-500">Note:</span>
                  <br />
                  RTO will be the same as forward shipment charge. <br />
                  Processing and Packages fee will be applicable on all
                  dispatched shipments.
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span className="flex  hover:text-red-400 ">
                    <svg
                      className="md:-ml-1 md:mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    COD Remittance
                  </span>
                }
                key="2"
              >
                <div className="flex items-center bg-white text-gray-800">
                  <div className="p-4 w-full">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white  border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              ></path>
                            </svg>
                          </div>
                          <div className="flex flex-col flex-grow ml-4">
                            <div className="text-sm text-gray-500">
                              Remitted Till Date
                            </div>
                            <div className="font-bold text-lg">1259</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white  border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              ></path>
                            </svg>
                          </div>
                          <div className="flex flex-col flex-grow ml-4">
                            <div className="text-sm text-gray-500">
                              Last Remittance
                            </div>
                            <div className="font-bold text-lg">230</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white  border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-yellow-100 text-yellow-500">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              ></path>
                            </svg>
                          </div>
                          <div className="flex flex-col flex-grow ml-4">
                            <div className="text-sm text-gray-500">
                              Next Remittance
                              <span className="text-xs">(Expected)</span>
                            </div>
                            <div className="font-bold text-lg">190</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          </div>
                          <div className="flex flex-col flex-grow ml-4">
                            <div className="text-sm text-gray-500">
                              Total Remittance Due
                            </div>
                            <div className="font-bold text-lg">$ 32k</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr style={{ margin: "15px 10px" }} />

                <TableComponent
                  heading={CODTableHeading}
                  data={""}
                  isActiveSearch={false}
                  searchedColumn={""}
                  defaultSearchColumn={""}
                />
              </TabPane>
              <TabPane
                tab={
                  <span className="flex  hover:text-red-400 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="md:-ml-1 md:mr-2 h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Wallet Transactions
                  </span>
                }
                key="3"
              >
                <Spin spinning={isLoading} indicator={<LoadingOutlined color={'#ef4444'} spin />}>
                  <div className="flex  justify-between ">
                    <Space size={"middle"} style={{ padding: "25px 0px" }}>
                      <RangePicker
                        defaultValue={[
                          moment("2015/01/01", dateFormat),
                          moment("2015/01/01", dateFormat),
                        ]}
                        format={dateFormat}
                      />

                      <Select
                        defaultValue="all"
                        style={{ width: 250 }}
                        onChange={this.handleChange}
                      >
                        <Option value="all">All</Option>
                        <Option value="codAdjustments">COD Adjustments</Option>
                        <Option value="razorpay">Recharge - Razorpay</Option>
                        <Option value="neft">Recharge - NEFT</Option>
                        <Option value="forwardCharge">Forward Charge</Option>
                        <Option value="codCharge">COD Charge</Option>
                        <Option value="processingFee">Processing Fees</Option>
                      </Select>

                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          borderRadius: "4px",
                          background: "#ef4444",
                          border: "1px solid #ef4444",
                        }}
                      >
                        Apply
                      </Button>
                      <Button
                        htmlType="button"
                        onClick={this.onReset}
                        style={{ borderRadius: "4px" }}
                      >
                        Reset
                      </Button>
                    </Space>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row pr-20 bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">
                            Wallet Balance
                          </div>
                          <div className="font-bold text-lg"> &#8377; 3200</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr style={{ margin: "20px 0px" }} />
                  <TableComponent
                    heading={WalletTransactionHeading}
                    data={allPayments}
                    isActiveSearch={false}
                    searchedColumn={""}
                    defaultSearchColumn={""}
                  />
                </Spin>
              </TabPane>
              <TabPane
                tab={
                  <span className="flex  hover:text-red-400 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="md:-ml-1 md:mr-2 h-5 w-5"
                    >
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                      />
                    </svg>
                    Shipping Charges
                  </span>
                }
                key="4"
              >
                <Space size={"middle"} style={{ padding: "25px 0px" }}>
                  <RangePicker
                    defaultValue={[
                      moment("2015/01/01", dateFormat),
                      moment("2015/01/01", dateFormat),
                    ]}
                    format={dateFormat}
                  />

                  <Form.Item style={{ width: "100%", marginBottom: "0px" }}>
                    <Input
                      style={{ marginBottom: "0px", padding: "4px 11px" }}
                      placeholder="AWB seperated by coma"
                    // onChange={handlechange("ProductTags")}
                    // defaultValue={values.ProductTags}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      borderRadius: "4px",
                      background: "#ef4444",
                      border: "1px solid #ef4444",
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={this.onReset}
                    style={{ borderRadius: "4px" }}
                  >
                    Reset
                  </Button>
                </Space>
                <hr style={{ margin: "20px 0px" }} />
                <div className="shippingTable">
                  <TableComponent
                    heading={ShippingChargesHeading}
                    data={""}
                    isActiveSearch={false}
                    searchedColumn={""}
                    defaultSearchColumn={""}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
          <hr style={{ marginBottom: "20px" }} />
        </div>
      </div>
    );
  }
}

Billing.contextType = AuthContext;

export default Billing;
