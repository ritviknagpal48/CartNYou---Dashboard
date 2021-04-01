import React from "react";
import { Table, Input, Button, Select, Collapse } from "antd";
// import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Option } = Select;

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    searchText: "",
    searchedColumn: this.props.searchedColumn[0],
    selectedRowKeys: [],
    filteredInfo: null,
    sortedInfo: null, // Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
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
    this.setState({
      searchedColumn: value,
    });
  };

  // componentDidMount(props) {
  //   const { defaultSearchColumn } = this.props
  //   this.setState({ searchText: defaultSearchColumn })
  // }

  render() {
    const {
      heading,
      data,
      searchedColumn,
      defaultSearchColumn,
      isActiveSearch,
    } = this.props;

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
          {isActiveSearch ? (
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
                    defaultValue={defaultSearchColumn}
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
                    {/* <Option value="sku">SKU</Option>
                  <Option value="productInfo">Product Info</Option> */}
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
                    }}
                    // onPressEnter={() =>
                    //   this.handleSearch(selectedKeys, confirm, dataIndex)
                    // }
                    value={this.state.searchText}
                    className="inputSearchBox"
                    style={{ marginLeft: "8px" }}
                  />

                  <Button
                    danger
                    style={{ marginLeft: "8px" }}
                    onClick={() => this.setState({ searchText: [] })}
                  >
                    Clear
                  </Button>
                </div>
              </Panel>
            </Collapse>
          ) : (
            <></>
          )}
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={
            !!this.state.searchText
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

ProductTable.defaultProps = {
  heading: ["Col 1", "Col 2", "Col 3", "Col 4"],
  data: ["Item 1", "Item 2", "Item 3", "Item 4"],
  searchedColumn: "Col 1",
  defaultSearchColumn: "Col 1",
};

export default ProductTable;
