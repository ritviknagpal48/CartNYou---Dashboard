import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Radio,
  Select,
  Spin,
  Modal,
  message,
  Empty,
  notification,
} from "antd";
import Toolbar from "Components/Toolbar";
import { AuthContext } from "Contexts/Auth";
import { axiosInstance } from "Contexts/useAxios";
import React from "react";
import TableComponent from "../../../Components/TableComponent";
import "./Orders.css";
import { OrdersMenuButton } from "./OrdersMenuButton";
import OrderTableHeading from "./orderTableHeading";

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

let ImportListActions = OrdersMenuButton;

const sample_rate_list = [
  {
    courier_id: 2,
    delivered_charges: 66.3,
    courier: "Bluedart Air",
    returned_charges: 132.6,
  },
  {
    courier_id: 30,
    delivered_charges: 51.0,
    courier: "xpressbees",
    returned_charges: 102.0,
  },
  {
    courier_id: 102,
    delivered_charges: 66.3,
    courier: "Ecom Express",
    returned_charges: 132.6,
  },
  {
    courier_id: 1,
    delivered_charges: 53.0,
    courier: "Delhivery Express",
    returned_charges: 104.0,
  },
];

class Orders extends React.Component {
  state = {
    orderFilter: "any",
    shopifyChannels: null,
    targetURL: "",
    orders: [],
    is_loading: true,
    searchText: "",
    searchedColumn: "",
    selectedChannelId: "",
    modalVisible: false,
    modalID: "",
    delivery_service: "",
    billing_zone: "A",
    rate_list: [],
    pickup_pincode: 201313,
    drop_pincode: 0,
    invoiceModalVisible: false,
    invoice_info: {
      courier_info: null,
      order_info: null,
      amounts: {
        order: 0,
        total: 0,
        delivery: 0,
      },
    },
    product_info: null,
  };

  async componentDidMount() {
    const {
      token,
      additionalInfo: { id },
    } = this.context;

    // ImportListActions[0].onClick = () => {
    //   this.handleOrderClick("02938402938dhfksjdf");
    // };

    if (this.state.shopifyChannels === null)
      await axiosInstance
        .get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const firstChannel =
            response.data && response.data.shopifychannels[0]
              ? response.data.shopifychannels[0]
              : null;
          const username =
            firstChannel && firstChannel.api_key ? firstChannel.api_key : "";
          const password =
            firstChannel && firstChannel.key ? firstChannel.key : "";
          const storeurl =
            firstChannel && firstChannel.store_url
              ? firstChannel.store_url
              : "";

          this.setState({
            shopifyChannels:
              response.data && response.data.shopifychannels
                ? response.data.shopifychannels
                : [],
            selectedChannelId:
              response.data && response.data.shopifychannels[0]
                ? response.data.shopifychannels[0].id
                : "",
            targetURL: `https://${username}:${password}@${storeurl}/admin/api/2021-04/orders.json?status=any"`,

            is_loading: false,
          });
        })
        .catch((error) => {});

    await axiosInstance
      .post(
        "/getOrders",
        {
          targetURL: this.state.targetURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        this.setState({
          orders:
            response.data && response.data.orders ? response.data.orders : [],
          is_loading: false,
        });
      })
      .catch((error) => {});
  }

  // settle order here
  handleInvoiceModalOK = () => {
    const { wallet } = this.context.additionalInfo;
    const { total } = this.state.invoice_info.amounts;
    if (wallet < total)
      return notification.open({
        message: `Insufficient Balance ${wallet}`,
        type: "error",
        description: "Please recharge before settling further orders.",
        placement: "topRight",
        duration: 1.5,
      });
    this.setState({ is_loading: true });

    // Process Order here
    setTimeout(() => {
      this.setState({ is_loading: false, invoiceModalVisible: false }, () => {
        return notification.open({
          message: `Order Settled.`,
          type: "success",
          description: `Current Balance ${wallet - total}`,
          placement: "topRight",
          duration: 1.5,
        });
      });
    }, 3000);
  };

  handleFilter = (e) => {
    this.setState({ orderFilter: e.target.value }, () => {
      this.handleChange(this.state.selectedChannelId);
    });
  };

  handleRadioChange = (event) => {
    if (event.target.checked)
      this.setState({
        [event.target.name]: event.target.value,
      });
  };

  loadDeliveryServices = async (options) => {
    const response = await axiosInstance.get(
      "https://pickrr.com/api-v2/client/fetch-price-calculator-generic/",
      {
        params: {
          auth_token: "480054b2d5b28e22c91a52faaa23ee2c130720",
          shipment_type: "forward",
          pickup_pincode: this.state.pickup_pincode,
          drop_pincode: this.state.drop_pincode,
          delivery_mode: "express",
          ...options,
        },
      }
    );

    if (response.data) {
      const { billing_zone, rate_list } = response.data;
      this.setState({
        billing_zone,
        rate_list,
      });
    } else {
      message.error("Error Loading Delivery Services. Please try again.");
    }
  };

  handleChange = async (value) => {
    this.setState({ is_loading: true });
    const { token } = this.context;

    const selectedChannel = this.state.shopifyChannels.find(
      (channel) => channel.id === value
    );

    const username =
      selectedChannel && selectedChannel.api_key ? selectedChannel.api_key : "";
    const password =
      selectedChannel && selectedChannel.key ? selectedChannel.key : "";
    const storeurl =
      selectedChannel && selectedChannel.store_url
        ? selectedChannel.store_url
        : "";

    const targetURL = `https://${username}:${password}@${storeurl}/admin/api/2021-04/orders.json?status=${this.state.orderFilter}`;
    this.setState({
      targetURL,
    });

    await axiosInstance
      .post(
        "/getOrders",
        {
          targetURL: targetURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        this.setState({
          orders:
            response.data && response.data.orders ? response.data.orders : [],
          is_loading: false,
        });
      })
      .catch((error) => {});
  };

  handleOrderClick = async (order) => {
    this.setState({ is_loading: true, delivery_service: "" });
    await this.loadDeliveryServices({
      length: 1,
      breadth: 1,
      height: 1,
      weight: 1,
      payment_mode: "prepaid",
      drop_pincode: order.shipping_address.zip,
    });
    let inv_info = this.state.invoice_info;
    const resp = await axiosInstance.get(`/product-details/${order.sku}`, {
      headers: { Authorization: `Bearer ${this.context.token}` },
    });

    const prod = resp.data;
    this.setState({
      invoice_info: {
        ...inv_info,
        order_info: order,
        amounts: { order: parseFloat(prod.product_mrp), total: 0, delivery: 0 },
      },
      drop_pincode: order.shipping_address.zip,
      pickup_pincode: 201313,
      is_loading: false,
      modalVisible: true,
      product_info: prod,
    });
  };

  handleModalCancel = (e) => {
    this.setState({ modalVisible: false });
  };

  handleInvoiceModalCancel = (e) => {
    this.setState({ invoiceModalVisible: false });
  };

  handleModalOk = (e) => {
    this.setState({ modalLoading: false, modalVisible: false });
    const dpart = this.state.rate_list.find(
      (x) => x.courier_id == this.state.delivery_service
    );
    if (!dpart) return message.error(`Could Not find Delivery Partner`);
    const { invoice_info, product_info } = this.state;
    this.setState({
      invoice_info: {
        ...invoice_info,
        courier_info: dpart,
        amounts: {
          order: product_info.product_mrp,
          delivery: dpart.delivered_charges,
          total:
            parseFloat(dpart.delivered_charges) +
            parseFloat(product_info.product_mrp),
        },
      },
      invoiceModalVisible: true,
    });
  };

  render() {
    const { orderFilter, shopifyChannels } = this.state;

    return (
      <div className={`${classes.wrapper} retailer-order-page`}>
        <Toolbar title={"Orders"} actions={ImportListActions} />
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} />
          }
          spinning={this.state.is_loading}
        >
          <div
            className="bg-white px-4 py-6  rounded-md shadow-xl"
            style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="tabs-group pb-5">
                <Radio.Group value={orderFilter} onChange={this.handleFilter}>
                  <Radio.Button value="any">All</Radio.Button>
                  <Radio.Button value="open">Active</Radio.Button>
                  <Radio.Button value="closed">Completed</Radio.Button>
                  <Radio.Button value="cancelled">Cancelled</Radio.Button>
                </Radio.Group>
              </div>

              {shopifyChannels && shopifyChannels.length > 0 ? (
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="pb-5"
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#676767",
                      marginRight: "8px",
                      fontWeight: 600,
                    }}
                  >
                    Channel:
                  </span>

                  <Select
                    defaultValue={this.state.selectedChannelId}
                    style={{ width: 250 }}
                    onChange={this.handleChange}
                  >
                    {shopifyChannels.map((channel, index) => {
                      return (
                        <Select.Option key={index} value={channel.id}>
                          {channel.channel_name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              ) : (
                <></>
              )}
            </div>
            <hr style={{ margin: "5px 0px 20px" }} />
            <TableComponent
              heading={OrderTableHeading}
              data={this.state.orders.map((order) => ({
                ...order,
                callStatus: (
                  <Button
                    type={"outlined"}
                    color={"#ef4444"}
                    onClick={() => this.handleOrderClick(order)}
                  >
                    Settle
                  </Button>
                ),
              }))}
              size="middle"
              isActiveSearch={false}
              searchedColumn={""}
              defaultSearchColumn={""}
            />
          </div>
        </Spin>

        <Modal
          title={<div className="flex gap-x-2">Select Delivery Partner</div>}
          width={"100%"}
          visible={
            this.state.modalVisible && !!this.state.invoice_info.order_info
          }
          confirmLoading={this.state.is_loading}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
            boxShadow: "none",
            maxWidth: "520px",
            paddingBottom: "0px",
          }}
          bodyStyle={{
            boxShadow: "none",
            height: "100%",
          }}
          maskStyle={{ background: "#00000034" }}
        >
          <div className="grid grid-cols-2 w-10/12 mx-auto">
            <div className="flex flex-col items-start justify-start">
              <span className="text-xs font-semibold text-gray-400">
                Pickup Pincode
              </span>
              <p className="text-sm font-medium text-gray-700">
                {this.state.pickup_pincode}
              </p>
            </div>
            <div className="flex flex-col items-end justify-start">
              <span className="text-xs font-semibold text-gray-400">
                Drop Pincode
              </span>
              <p className="text-sm font-medium text-gray-700">
                {this.state.drop_pincode}
              </p>
            </div>
          </div>

          {this.state.rate_list && this.state.rate_list.length > 0 ? (
            <ul className="w-10/12 mx-auto grid grid-cols-2 gap-y-3 gap-x-4 place-items-center">
              {this.state.rate_list.map((item) => {
                return (
                  <li className="flex flex-col items-start justify-start w-full py-4 pl-10 pr-3 border border-gray-300 rounded-md shadow-md relative">
                    <input
                      type="radio"
                      name="delivery_service"
                      value={item.courier_id}
                      className="m-3 p-0 text-red-500 focus:ring-transparent absolute left-0 top-0.5"
                      onChange={this.handleRadioChange}
                    />
                    <h3
                      className="m-0 p-0 leading-none pb-2 pt-0 text-gray-300 w-full"
                      style={{ borderBottom: "1px solid currentColor" }}
                    >
                      <p className="m-0 p-0 text-gray-700">{item.courier}</p>
                    </h3>
                    <div className="w-full flex flex-row items-center justify-between">
                      <span className="font-bold text-red-500 pt-2">
                        <p className="block font-thin w-auto text-xs text-gray-400 my-0 mb-1">
                          Delivery
                        </p>
                        ₹ {item.delivered_charges}
                      </span>
                      <span className="font-bold text-gray-600 pt-2 ">
                        <p className="block font-thin w-auto text-xs text-gray-400 my-0 mb-1">
                          Returns
                        </p>
                        ₹ {item.returned_charges}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Modal>

        <Modal
          title={<div className="flex gap-x-2">Finalize Delivery</div>}
          width={"100%"}
          visible={
            this.state.invoiceModalVisible &&
            this.state.invoice_info.courier_info &&
            this.state.invoice_info.order_info
          }
          confirmLoading={this.state.is_loading}
          okText={"Proceed"}
          onOk={this.handleInvoiceModalOK}
          onCancel={this.handleInvoiceModalCancel}
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
            boxShadow: "none",
            maxWidth: "520px",
            paddingBottom: "0px",
          }}
          bodyStyle={{
            boxShadow: "none",
            height: "100%",
          }}
          maskStyle={{ background: "#00000034" }}
        >
          <div className="grid grid-cols-2 items-start w-4/5 mx-auto gap-y-2">
            <div className="text-sm text-gray-600 font-medium">Order ID</div>
            <div className="text-sm text-gray-700 font-medium">
              {!!this.state.invoice_info.order_info
                ? this.state.invoice_info.order_info.id
                : null}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Customer Name
            </div>
            <div className="text-sm text-gray-700 font-medium">
              {!!this.state.invoice_info.order_info
                ? this.state.invoice_info.order_info.shipping_address.name
                : ""}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Pickup Pincode
            </div>
            <div className="text-sm text-gray-700 font-medium">
              {this.state.pickup_pincode}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Delivery Pincode
            </div>
            <div className="text-sm text-gray-700 font-medium">
              {this.state.drop_pincode}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Order Amount
            </div>
            <div className="text-sm text-gray-700 font-medium">
              ₹ {parseFloat(this.state.invoice_info.amounts.order).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Delivery Partner
            </div>
            <div className="text-sm text-gray-700 font-medium">
              {this.state.invoice_info.courier_info
                ? this.state.invoice_info.courier_info.courier
                : ""}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Delivery Charges
            </div>
            <div className="text-sm text-gray-700 font-medium">
              ₹{" "}
              {parseFloat(this.state.invoice_info.amounts.delivery).toFixed(2)}
            </div>
            <div className="text-sm text-gray-800 font-bold">Total Amount</div>
            <div className="text-sm text-red-500 font-bold">
              ₹ {this.state.invoice_info.amounts.total.toFixed(2)}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Orders.contextType = AuthContext;
export default Orders;
