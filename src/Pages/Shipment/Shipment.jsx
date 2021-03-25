import React from "react";
import { Table, Input, Button, Space, Select, Collapse } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import tableColummns from "./TableColumns";
import tableData from "./TableData";
import "./Shipment.css";

const data = tableData;
const { Panel } = Collapse;
const { Option } = Select;

class Shipment extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "order",
    selectedRowKeys: [],
    filteredInfo: null,
    sortedInfo: null, // Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  // onSearch = (value) =>{
  //   this.setState({
  //     searchText: selectedKeys[0],
  //     searchedColumn: dataIndex,
  //   });
  //   console.log(value);
  // }

  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      searchedColumn: value,
    });
  };

  render() {
    const columns = tableColummns;

    const { selectedRowKeys } = this.state;
    // const lowerCaseSearchText = this.state.searchText.toLowerCase();

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };

    return (
      <div className="w-full pr-14 pl-4 ">
        <div
          className="w-full  py-3 flex flex-row items-center justify-between"
          style={{ background: "#f2f3f3" }}
        >
          <div className="text-2xl text-gray-600  hidden md:block font-sans-apple-system">
            Shipments
          </div>
        </div>
        <div className="mb-2">
          <Collapse
            bordered={false}
            defaultActiveKey={["0"]}
            expandIcon={({ isActive }) => (
              <SearchOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse "
          >
            <Panel
              header="Search"
              key="1"
              className="site-collapse-custom-panel"
            >
              <div className="flex my-2">
                <Select
                  defaultValue="order"
                  // placeholder="Select Column"
                  style={{ width: 150 }}
                  onChange={this.handleChange}
                >
                  <Option value="order">Order ID</Option>
                  <Option value="product">Product Name</Option>
                  <Option value="customer">Customer Name</Option>
                  <Option value="method">Payment Method</Option>
                  <Option value="carrier">Carrier</Option>
                  <Option value="awb">AWB Number</Option>
                </Select>

                <Input
                  placeholder={`Search by ${this.state.searchedColumn}`}
                  onChange={(e) => {
                    this.setState({
                      searchText: e.target.value ? [e.target.value] : [],
                    });
                    console.log(this.state.searchText);
                  }}
                  // onPressEnter={() =>
                  //   this.handleSearch(selectedKeys, confirm, dataIndex)
                  // }
                  value={this.state.searchText}
                  className="inputSearchBox"
                  style={{ marginLeft: "8px" }}
                />
              </div>
            </Panel>
          </Collapse>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={
            this.state.searchText
              ? data.filter((x) =>
                  x[this.state.searchedColumn].toLowerCase().includes(
                    this.state.searchText
                    // lowerCaseSearchText
                  )
                )
              : data
          }
          size="small"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Shipment;
