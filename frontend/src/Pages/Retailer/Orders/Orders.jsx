import React from "react";
import { Radio, message, Spin, Select } from "antd";
import OrderTableHeading from "./orderTableHeading";
import TableComponent from "../../../Components/TableComponent";
import { OrdersMenuButton } from "./OrdersMenuButton";
import Toolbar from "Components/Toolbar";
import "./Orders.css";
import { Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { AuthContext } from "Contexts/Auth";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { axiosInstance } from "Contexts/useAxios";
import { Option } from "antd/lib/mentions";

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
    orderFilter: "any",
    shopifyChannels: null,
    targetURL: "",
    orders: [],
    is_loading: true,
    searchText: "",
    searchedColumn: "",
    selectedChannelId: "",
  };

  async componentDidMount() {
    const {
      token,
      additionalInfo: { id },
    } = this.context;

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

  handleFilter = (e) => {
    this.setState({ orderFilter: e.target.value }, () => {
      this.handleChange(this.state.selectedChannelId);
    });
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
                  <Radio.Button value="open">Active (3)</Radio.Button>
                  <Radio.Button value="closed">Completed (0)</Radio.Button>
                  <Radio.Button value="cancelled">Cancelled (0)</Radio.Button>
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
              data={this.state.orders}
              size="middle"
              isActiveSearch={false}
              searchedColumn={""}
              defaultSearchColumn={""}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

Orders.contextType = AuthContext;
export default Orders;
