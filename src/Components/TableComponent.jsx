import React from "react";
import { Table, Input, Button, Space, Select, Collapse } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

// import "./ProductTable.css";

const { Panel } = Collapse;
const { Option } = Select;

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    searchText: "",
    // searchedColumn: "sku",
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

  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      searchedColumn: value,
    });
  };

  render() {
    console.log(this.props);
    const { heading, data, searchedColumn } = this.props;

    const columns = heading;
    const { selectedRowKeys } = this.state;

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
      <div className="w-full ">
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
                  //   defaultValue={searchedColumn[0]}
                  placeholder="Select Column"
                  style={{ width: 150 }}
                  onChange={this.handleChange}
                >
                  {searchedColumn.map((searchedColumn) => {
                    return (
                      <Option key={searchedColumn} value={searchedColumn}>
                        {searchedColumn}
                      </Option>
                    );
                  })}
                  {/* <Option value="sku">SKU</Option> */}
                  {/* <Option value="productInfo">Product Info</Option> */}
                  {/* <Option value="admin">Admin Status</Option>
                  <Option value="method">Payment Method</Option>
                  <Option value="carrier">Carrier</Option>
                  <Option value="awb">AWB Number</Option> */}
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

export default ProductTable;
