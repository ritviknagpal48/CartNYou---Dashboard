import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Modal,
  notification,
  Radio,
  Select,
  Spin,
} from "antd";
import { calculateCommissions } from "Components/adminUtils";
import Toolbar from "Components/Toolbar";
import { AuthContext, AUTH_ACTIONS } from "Contexts/Auth";
import { axiosInstance } from "Contexts/useAxios";
import React from "react";
import TableComponent from "../../../Components/TableComponent";
import "./Orders.css";
import { OrdersMenuButton } from "./OrdersMenuButton";
import OrderTableHeading from "./orderTableHeading";

// Quantity: 3
// Published amount : 2500
// Order amount : 2500 * 3 (Published X Qunatity)
// Product Mrp : 1500 (wholesaler + cOmmission)
// Settlement amount : 1500 * 3 (Product Mrp [wholesaler price + commission] X Quantity)

// Total Amount : Selltement + commission + delivery

// const PICKRR_AUTH_TOKEN = "480054b2d5b28e22c91a52faaa23ee2c130720";

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

class Orders extends React.Component {
  state = {
    orderFilter: "any",
    retailer_shopify_channels: null,
    targetURL: "",
    orders: [],
    is_loading: true,
    searchText: "",
    searchedColumn: "",
    selectedChannelId: "",
    selectedChannel: "",
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
        settlement: 0, // Amount to settle
        order: 0, // Order Price (price * quantity) [Shopify]
        total: 0, // Total Amount (mrp * quantity)
        delivery: 0, // TODO: Delivery Charges (To be Removed)
        mrp: 0, // MRP + commission
        quantity: 0, // Quantity
        published: 0, // Shopify Price
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

    if (this.state.retailer_shopify_channels === null)
      await axiosInstance
        .get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const firstChannel =
            response.data && response.data.retailer_shopify_channels[0]
              ? response.data.retailer_shopify_channels[0]
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
            retailer_shopify_channels:
              response.data && response.data.retailer_shopify_channels
                ? response.data.retailer_shopify_channels
                : [],
            selectedChannelId:
              response.data && response.data.retailer_shopify_channels[0]
                ? response.data.retailer_shopify_channels[0].id
                : "",
            selectedChannel:
              response.data && response.data.retailer_shopify_channels
                ? response.data.retailer_shopify_channels[0]
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
  handleInvoiceModalOK = async () => {
    const { wallet, id: retailer_id } = this.context.additionalInfo;
    const { settlement, quantity } = this.state.invoice_info.amounts;
    if (wallet < settlement)
      return notification.open({
        message: `Insufficient Balance ${wallet}`,
        type: "error",
        description: "Please recharge before settling further orders.",
        placement: "topRight",
        duration: 1.5,
      });
    this.setState({ is_loading: true });

    // Process Order here
    const shipping_address =
      this.state.invoice_info.order_info.shipping_address;
    const product_id =
      this.state.product_info && this.state.product_info.id
        ? this.state.product_info.id
        : null;
    const settlement_amount = this.state.invoice_info.amounts.total;
    const client_order_id = this.state.invoice_info.order_info.id;

    if (
      !shipping_address ||
      !product_id ||
      !retailer_id ||
      !quantity ||
      !client_order_id ||
      !settlement_amount
    ) {
      console.log({
        shipping_address,
        product_id,
        retailer_id,
        quantity,
        settlement_amount,
      });
      this.setState({ is_loading: false, invoiceModalVisible: false }, () => {
        return notification.error({
          message: "Incomplete Information Provided.",
          description:
            "Please go through the process again and validate all the details.",
          duration: 1.5,
        });
      });
    }

    const body = {
      product_id,
      shipping_address,
      retailer_id,
      product_quantity: quantity,
      settlement_amount: this.state.invoice_info.amounts.total,
      client_order_id,
    };

    const settle_response = await axiosInstance.post(
      "/others/settleOrder",
      body
    );

    this.setState({ is_loading: false, invoiceModalVisible: false }, () => {
      if (settle_response.data.status === "error") {
        return notification.error({
          message:
            settle_response.data.error || "Invalid Information Provided.",
          description: "Please go through the details again and try again.",
          duration: 1.5,
        });
      }
      this.context.setAuth(AUTH_ACTIONS.UPDATE, {
        wallet: settle_response.data.retailer_wallet,
      });
      this.componentDidMount();
      return notification.success({
        message: `Order Settled.`,
        description: `Current Balance ${wallet - settlement}`,
        duration: 1.5,
      });
    });
  };

  handleFilter = (e) => {
    const { selectedChannelId } = this.state;
    this.setState({ orderFilter: e.target.value }, () => {
      this.handleChange(selectedChannelId);
    });
  };

  handleRadioChange = (event) => {
    if (event.target.checked)
      this.setState({
        [event.target.name]: event.target.value,
      });
  };

  // loadDeliveryServices = async (options) => {
  //   const response = await axiosInstance.get(
  //     "https://pickrr.com/api-v2/client/fetch-price-calculator-generic/",
  //     {
  //       params: {
  //         auth_token: PICKRR_AUTH_TOKEN,
  //         shipment_type: "forward",
  //         pickup_pincode: this.state.pickup_pincode,
  //         drop_pincode: this.state.drop_pincode,
  //         delivery_mode: "express",
  //         ...options,
  //       },
  //     }
  //   );

  //   if (response.data) {
  //     const { billing_zone, rate_list } = response.data;
  //     this.setState({
  //       billing_zone,
  //       rate_list,
  //     });
  //   } else {
  //     message.error("Error Loading Delivery Services. Please try again.");
  //   }
  // };

  handleChange = async (value) => {
    this.setState({ is_loading: true });
    const { token } = this.context;

    const selectedChannel = this.state.retailer_shopify_channels.find(
      (channel) => channel.id === value
    );

    if (!selectedChannel) return message.error("Something went wrong.");

    const username = selectedChannel.api_key ? selectedChannel.api_key : "";
    const password = selectedChannel.key ? selectedChannel.key : "";
    const storeurl = selectedChannel.store_url ? selectedChannel.store_url : "";

    const targetURL = `https://${username}:${password}@${storeurl}/admin/api/2021-04/orders.json?status=${this.state.orderFilter}`;
    this.setState({
      targetURL,
      selectedChannel,
      selectedChannelId: value,
    });

    await axiosInstance
      .post(
        "/getOrders",
        {
          targetURL,
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
      .catch(() => {});
  };

  handleOrderClick = async (order) => {
    // FIXME: hatana h isko
    // await this.loadDeliveryServices({
    //   length: 1,
    //   breadth: 1,
    //   height: 1,
    //   weight: 1,
    //   payment_mode: "prepaid",
    //   drop_pincode: order.shipping_address.zip,
    // });
    this.setState({ delivery_service: "Automatic", is_loading: true });
    const invoice_info = this.state.invoice_info;
    const resp = await axiosInstance.get(`/product-details/${order.sku}`, {
      headers: { Authorization: `Bearer ${this.context.token}` },
    });

    const product_info = resp.data;
    const commission = calculateCommissions(product_info);
    const quantity = parseInt(order.quantity);
    const settlement =
      (parseInt(product_info.product_mrp) + commission) * quantity;

    const new_state = {
      invoice_info: {
        ...invoice_info,
        order_info: order,
        amounts: {
          ...invoice_info.amounts,
          quantity,
          published: parseInt(order.price),
          mrp: parseInt(product_info.product_mrp) + commission,
          order: parseInt(order.price) * quantity,
          settlement: settlement,
          delivery: 0,
          total: settlement,
        },
      },
      drop_pincode: order.shipping_address.zip,
      pickup_pincode: 201313,
      is_loading: false,
      product_info,
      invoiceModalVisible: true,
    };

    console.log({ new_state });
    this.setState(new_state);
  };

  handleModalCancel = (e) => {
    this.setState({ modalVisible: false });
  };

  handleInvoiceModalCancel = (e) => {
    this.setState({ invoiceModalVisible: false });
  };

  handleModalOk = () => {
    // this.setState({ modalLoading: false, modalVisible: false });
    // const dpart = this.state.rate_list.find(
    //   (x) => "" + x.courier_id === "" + this.state.delivery_service
    // );
    // if (!dpart) return message.error(`Could Not find Delivery Partner`);
    // const { invoice_info, product_info } = this.state;
    // console.log({ invoice_info, product_info });
    // const commission = calculateCommissions(product_info);
    // const quantity = parseInt(invoice_info.order_info.quantity);
    // const settlement =
    //   (parseInt(product_info.product_mrp) + commission) * quantity;
    // const amounts = {
    //   quantity,
    //   published: parseInt(invoice_info.order_info.price),
    //   mrp: parseInt(product_info.product_mrp) + commission,
    //   order: parseInt(invoice_info.order_info.price) * quantity,
    //   settlement: settlement,
    //   // delivery: parseInt(dpart.delivered_charges),
    // };
    // this.setState({
    //   invoice_info: {
    //     ...invoice_info,
    //     // courier_info: dpart,
    //     amounts: {
    //       ...amounts,
    //       total: amounts.settlement + amounts.delivery,
    //     },
    //   },
    //   invoiceModalVisible: true,
    // });
  };

  render() {
    const { orderFilter, retailer_shopify_channels } = this.state;

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

              {retailer_shopify_channels &&
              retailer_shopify_channels.length > 0 ? (
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
                    {retailer_shopify_channels.map((channel, index) => {
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
                    style={{
                      color: "#ef4444",
                      border: "1px solid #ef4444",
                      borderRadius: "6px",
                    }}
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

        {/* <Modal
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
        </Modal> */}

        <Modal
          title={<div className="flex gap-x-2">Finalize Delivery</div>}
          width={"100%"}
          visible={
            this.state.invoiceModalVisible && this.state.invoice_info.order_info
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
            <div className="text-sm text-gray-600 font-medium">Quantity</div>
            <div className="text-sm text-gray-700 font-medium">
              {this.state.invoice_info.amounts.quantity}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Published Amount
            </div>
            <div className="text-sm text-gray-700 font-medium">
              ₹ {parseInt(this.state.invoice_info.amounts.published)}
            </div>
            <div className="text-sm text-gray-600 font-medium">Product MRP</div>
            <div className="text-sm text-gray-700 font-medium">
              ₹ {parseFloat(this.state.invoice_info.amounts.mrp).toFixed(2)}
              <span className={"font-semibold text-xs text-green-400 mx-1"}>
                (+
                {(
                  parseFloat(this.state.invoice_info.amounts.published) -
                  parseFloat(this.state.invoice_info.amounts.mrp)
                ).toFixed(2)}
                )
              </span>
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Settlement Amount
            </div>
            <div className="text-sm text-gray-700 font-medium">
              ₹ {parseFloat(this.state.invoice_info.amounts.settlement)}
            </div>
            <hr className={"col-span-2"} />
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
