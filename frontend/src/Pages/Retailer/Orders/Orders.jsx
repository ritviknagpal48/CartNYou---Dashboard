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
    targetURL:
      "https://4b3b6a49510835bfd05cc1751d7766a3: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@vastra-onlines.myshopify.com/admin/api/2021-04/orders.json?status=any",
    orders: [],
    is_loading: true,
    searchText: "",
    searchedColumn: "",
  };

  async componentDidMount() {
    await axiosInstance
      .post(
        "/getOrders",
        {
          targetURL: this.state.targetURL,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjhiYzFkMzYxNTY4MTI4Y2YxMmU2MyIsImlhdCI6MTYxODMzMDA5NiwiZXhwIjoxNjIwOTIyMDk2fQ.wCd0ZnRg78Fm9Gz8YtVtcXx48_SOPNMn7wgkqAtNyiE`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.orders);
        this.setState({
          orders:
            response.data && response.data.orders ? response.data.orders : [],
          is_loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleFilter = (e) => {
    this.setState({ orderFilter: e.target.value }, () => {
      console.log(this.state.orderFilter);
    });
  };

  handleChange = (value) => {
    console.log(value);
  };

  render() {
    const { orderFilter } = this.state;

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
                  defaultValue="jack"
                  style={{ width: 250 }}
                  onChange={this.handleChange}
                >
                  <Option value="jack">CartNYou</Option>
                  <Option value="lucy">Channel 2</Option>
                  <Option value="Yiminghe">Channel 3</Option>
                </Select>
              </div>
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
export default Orders;
