import React from "react";
import {
  Input,
  Button,
  Select,
  Collapse,
  Tooltip,
  Spin,
  Modal,
  Switch,
  Space,
  Checkbox,
  message,
  Pagination,
  Empty,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { axiosInstance } from "../../../Contexts/useAxios";
import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { AuthContext } from "Contexts/Auth";

// import "./ProductCards.css";

const { Panel } = Collapse;
const { Option } = Select;

class ProductCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // product_status: false,
      isLoading: true,
      statusChange: false,
      deleteProductModal: false,
      deleteProductID: "",
      data: [],
      searchText: "",
      searchedColumn: "product_main_sku",
      selectedRowKeys: [],
      filteredInfo: null,
      sortedInfo: null,
      currentPage: 1,
      pageSize: 5,
    };
  }

  async componentDidMount() {
    await axiosInstance
      .get(`/product-details?users_detail=${this.context.additionalInfo.id}`)
      .then((res) => {
        this.setState({
          data: res.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        // message.error(err.message);
      });
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
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
  };

  showModal = (data) => {
    this.setState({
      deleteProductModal: true,
      deleteProductID: data,
    });
  };

  handleOk = () => {
    this.setState({
      deleteProductModal: false,
    });
  };

  handleCancel = () => {
    this.setState({
      deleteProductModal: false,
    });
  };

  confirmDelete = () => {
    this.setState({
      isLoading: true,
    });
    if (this.state.deleteProductID !== "") {
      axiosInstance
        .delete(`/product-details/${this.state.deleteProductID}`)
        .then((res) => {
          this.setState({
            isLoading: false,
            deleteProductID: "",
            deleteProductModal: false,
          });
          message.success("Product deleted successfully");
          this.componentDidMount();
        })
        .catch((err) => {
          // message.error(err.message);
        });
    }
  };

  handleStatus = (id) => (value) => {
    // console.log(id, "==", value);
    const change = { product_status: value };
    this.setState({
      statusChange: true,
    });
    if (id) {
      axiosInstance
        .put(`/product-details/${id}`, change)
        .then((res) => {
          if (value) {
            message.success("Product published successfully", 2);
          } else {
            message.warning("Product Unpublished successfully", 2);
          }
          this.componentDidMount();
          this.setState({
            statusChange: false,
          });
        })
        .catch((err) => {
          // message.error(err.message);
        });
    } else {
      message.error("Something went Wrong");
    }
  };

  handlePageChange = (page, pageSize) => {
    this.setState({
      currentPage: page,
      pageSize: pageSize,
    });
  };

  render() {
    // const { defaultSearchColumn } = this.props;
    const { data } = this.state;
    const dataSource = !!this.state.searchText
      ? data.filter((x) =>
          x[this.state.searchedColumn].toString().toLowerCase().includes(
            this.state.searchText.toString().toLowerCase()
            // lowerCaseSearchText
          )
        )
      : data;

    dataSource.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const productListLength = dataSource && dataSource.length;
    const index = (this.state.currentPage - 1) * this.state.pageSize;

    return (
      <div className="w-full product-card-page">
        <Spin
          spinning={this.state.isLoading}
          indicator={
            <LoadingOutlined style={{ fontSize: 24, color: "#ef4444" }} />
          }
        >
          <div className="mb-2 border border-gray-200 rounded-xl">
            <Collapse
              bordered={false}
              defaultActiveKey={["0"]}
              expandIcon={({ isActive }) => (
                <SearchOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse rounded-xl "
            >
              <Panel
                header="Search"
                key="1"
                className="site-collapse-custom-panel rounded-xl shadow-lg"
              >
                <div className="flex my-2">
                  <Select
                    defaultValue={this.state.searchedColumn}
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
                    <Option value="product_main_sku">SKU</Option>
                    <Option value="product_name">Product Info</Option>
                  </Select>

                  <Input
                    placeholder={
                      this.state.searchedColumn === "product_main_sku"
                        ? `Search by product SKU`
                        : "Search by product info"
                    }
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

          {dataSource && dataSource.length ? (
            <div style={{ marginBottom: "50px" }}>
              <div>
                {dataSource
                  .slice(index, index + this.state.pageSize)
                  .map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-white my-2 border border-gray-200  text-gray-700 font-medium text-base px-4 py-3 rounded-xl shadow-lg grid grid-cols-4 gap-2 items-center md:justify-between w-full text-left md:flex md:flex-row"
                        style={{ color: "black" }}
                      >
                        <div className={"flex flex-row items-center"}>
                          <Checkbox onChange={this.onChange}></Checkbox>
                          <div
                            className="card-detail ml-2"
                            style={{ width: "150px", paddingLeft: "6px" }}
                          >
                            <div className="head-title">SKU</div>
                            <div className="title-body">
                              {data.product_main_sku}
                            </div>
                          </div>
                        </div>
                        <div className="card-detail max-w-xs w-full md:w-4/12 col-start-2 col-span-3 md:flex-auto">
                          <div className="head-title">Product Info</div>
                          <div className="title-body">{data.product_name}</div>
                        </div>
                        <div className="card-detail ml-6 md:ml-0">
                          <div className="head-title">MRP</div>
                          <div className="title-body">{data.product_mrp}</div>
                        </div>
                        <div className="card-detail">
                          <div className="head-title">Quantity</div>
                          <div className="title-body">{data.qunatity}</div>
                        </div>

                        <div className="card-detail w-1/2 md:w-auto ml-6 md:ml-0">
                          <div className="head-title">Status</div>
                          <Tooltip
                            title={
                              !data.product_status ? "Publish" : "Unpublish"
                            }
                            color={!data.product_status ? "#87d068" : "#f50"}
                            overlayStyle={{ borderRadius: "10px" }}
                            className="rounded-2xl"
                          >
                            <Switch
                              checked={data.product_status}
                              loading={this.state.statusChange}
                              defaultChecked
                              onChange={this.handleStatus(data.id)}
                            />
                          </Tooltip>
                        </div>
                        <div className="card-detail">
                          <div className="head-title">Admin Status</div>
                          <div className={`title-body ${data.admin_status}`}>
                            {data.admin_status}
                            {/* Approved */}
                          </div>
                        </div>
                        <div className="action card-detail justify-self-center mx-auto md:mx-0 col-span-2">
                          <div className={"head-title"}>Actions</div>
                          <Space size="small">
                            <Tooltip placement="topLeft" title={"Edit Data"}>
                              <Link
                                to={{
                                  pathname: `/wholeseller/edit-product/${data.id}`,
                                  // search: `?id=${data.id}`,
                                  state: { edit: true },
                                }}
                              >
                                <Button
                                  type="link"
                                  icon={
                                    <EditTwoTone
                                      twoToneColor="#ef4444"
                                      size={"large"}
                                    />
                                  }
                                />
                              </Link>
                            </Tooltip>
                            <Tooltip placement="topLeft" title={"Delete"}>
                              <Button
                                type="link"
                                onClick={() => this.showModal(data.id)}
                                icon={<DeleteTwoTone twoToneColor="#ef4444" />}
                              />
                            </Tooltip>
                          </Space>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr style={{ margin: "25px 10px" }} />
              <Pagination
                total={productListLength}
                defaultCurrent={1}
                pageSizeOptions={[1, 5, 50, 100]}
                pageSize={this.state.pageSize}
                current={this.state.currentPage}
                onChange={this.handlePageChange}
                showSizeChanger
                showQuickJumper
                responsive
                style={{ textAlign: "center" }}
                // showTotal={(total) => `Total ${total} products`}
              />
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{
                height: 80,
              }}
              description={<span>No products found</span>}
            ></Empty>
          )}

          <Modal
            title={
              <div className="flex gap-x-2">
                <ExclamationCircleOutlined
                  size={"large"}
                  style={{
                    color: "red",
                  }}
                />{" "}
                Confirm Delete
              </div>
            }
            visible={this.state.deleteProductModal}
            onOk={this.confirmDelete}
            onCancel={() => this.setState({ deleteProductModal: false })}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "none",
              maxWidth: "460px",
              paddingBottom: "0px",
            }}
            bodyStyle={{
              boxShadow: "none",
              height: "100%",
            }}
            maskStyle={{ background: "#00000034" }}
          >
            <p>Product once deleted can not be recovered again.</p>
          </Modal>
        </Spin>
      </div>
    );
  }
}

ProductCards.contextType = AuthContext;
export default withRouter(ProductCards);
