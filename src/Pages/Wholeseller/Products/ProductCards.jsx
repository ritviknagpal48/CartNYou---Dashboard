import React from "react";
import { Input, Button, Select, Collapse, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Switch, Space, Checkbox } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import "./ProductCards.css";
const { Panel } = Collapse;
const { Option } = Select;

class ProductCards extends React.Component {
  state = {
    searchText: "",
    searchedColumn: this.props.searchedColumn[0],
    selectedRowKeys: [],
    filteredInfo: null,
    sortedInfo: null, // Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
    console.log(this.state.selectedRowKeys)
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

  handleChange = (value) => {
    this.setState({
      searchedColumn: value,
    });
    console.log(this.state.searchText);
  };

  // componentDidMount(props) {
  //   const { defaultSearchColumn } = this.props
  //   this.setState({ searchText: defaultSearchColumn })
  // }

  render() {
    const { data, defaultSearchColumn } = this.props;

    const dataSource = !!this.state.searchText
      ? data.filter((x) =>
        x[this.state.searchedColumn].toLowerCase().includes(
          this.state.searchText
          // lowerCaseSearchText
        )
      )
      : data;

    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    //   selections: [
    //     Table.SELECTION_ALL,
    //     Table.SELECTION_INVERT,
    //     Table.SELECTION_NONE,
    //     {
    //       key: "odd",
    //       text: "Select Odd Row",
    //       onSelect: (changableRowKeys) => {
    //         let newSelectedRowKeys = [];
    //         newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //           if (index % 2 !== 0) {
    //             return false;
    //           }
    //           return true;
    //         });
    //         this.setState({ selectedRowKeys: newSelectedRowKeys });
    //       },
    //     },
    //     {
    //       key: "even",
    //       text: "Select Even Row",
    //       onSelect: (changableRowKeys) => {
    //         let newSelectedRowKeys = [];
    //         newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //           if (index % 2 !== 0) {
    //             return true;
    //           }
    //           return false;
    //         });
    //         this.setState({ selectedRowKeys: newSelectedRowKeys });
    //       },
    //     },
    //   ],
    // };

    return (
      <div className="w-full ">
        <div className="mb-2">
          <Collapse
            bordered={false}
            defaultActiveKey={["0"]}
            expandIcon={({ isActive }) => (
              <SearchOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header="Search"
              key="1"
              className="site-collapse-custom-panel rounded-xl shadow-lg "
            >
              <div className="flex my-2">
                <Select
                  defaultValue={defaultSearchColumn}
                  placeholder="Select Column"
                  style={{ width: 150 }}
                  onChange={this.handleChange}
                >
                  {/* {searchedColumn.map((searchedColumn, index) => {
                    return (
                      <Option key={index} value={searchedColumn}>
                        {searchedColumn}
                      </Option>
                    );
                  })} */}
                  <Option value="sku">SKU</Option>
                  <Option value="productInfo">Product Info</Option>
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
        </div>

        {dataSource ? (
          dataSource.map((data, index) => {
            return (
              <div
                className="bg-white my-2 text-gray-700 font-medium text-base px-4 py-4 rounded-xl shadow-lg grid grid-cols-4 gap-2 items-center md:justify-between w-full text-left md:flex md:flex-row"
                style={{ color: "black" }}>
                <div className={'flex flex-row items-center'}>
                  <Checkbox onChange={this.onChange}></Checkbox>
                  <div
                    className="card-detail ml-2"
                    style={{ width: "50px" }}
                  >
                    <div className="head-title">SKU</div>
                    <div className="title-body">{data.sku}</div>
                  </div>
                </div>
                <div className="card-detail max-w-xs w-full md:w-4/12 col-start-2 col-span-3 md:flex-auto">
                  <div className="head-title">Product Info</div>
                  <div className="title-body">{data.productInfo}</div>
                </div>
                <div className="card-detail ml-6 md:ml-0">
                  <div className="head-title">MRP</div>
                  <div className="title-body">{data.mrp}</div>
                </div>
                <div className="card-detail">
                  <div className="head-title">MP</div>
                  <div className="title-body">{data.mp}</div>
                </div>
                <div className="card-detail">
                  <div className="head-title">B2B</div>
                  <div className="title-body"> {data.b2b}</div>
                </div>
                <div className="card-detail">
                  <div className="head-title">Quantity</div>
                  <div className="title-body">{data.quantity}</div>
                </div>
                <div className="card-detail w-1/2 md:w-auto ml-6 md:ml-0">
                  <div className="head-title">Status</div>
                  <Switch checked={data.status} />
                </div>
                <div className="card-detail">
                  <div className="head-title">Admin Status</div>
                  <div className={`{title-body ${data.admin}`}>
                    {data.admin}
                  </div>
                </div>
                <div className="action card-detail justify-self-center mx-auto md:mx-0 col-span-2">
                  <div className={"head-title"}>Actions</div>
                  <Space size="middle" className={'flex flex-row items-center'}>
                    <Tooltip placement="topLeft" title={"Edit Data"}>
                      <Button
                        shape="circle"
                        icon={<EditTwoTone twoToneColor="#b25000" />}
                        className={'flex items-center justify-center'}
                      />
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"Delete"}>
                      <Button
                        shape="circle"
                        icon={<DeleteTwoTone twoToneColor="#b25000" />}
                      />
                    </Tooltip>
                  </Space>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}

ProductCards.defaultProps = {
  heading: ["Col 1", "Col 2", "Col 3", "Col 4"],
  data: ["Item 1", "Item 2", "Item 3", "Item 4"],
  searchedColumn: "Col 1",
  defaultSearchColumn: "Col 1",
};

export default ProductCards;
