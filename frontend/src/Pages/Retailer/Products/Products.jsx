import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Select,
  Collapse,
  Form,
  Spin,
  message,
  Pagination,
  Empty,
  Tag,
} from "antd";
import { DownCircleTwoTone } from "@ant-design/icons";
import CategoryList from "Components/productCategory";
import ProductCard from "Components/Retailer/ProductCard";
import ProductCategory from "./productSearchCategories";
import { LoadingOutlined } from "@ant-design/icons";
import AllIcon from "../../../assets/RetailCategoryIcons/wireframe.png";
// import "./Product.css";
import "./productStyles.css";
import { axiosInstance as axios } from "../../../Contexts/useAxios";

const { Panel } = Collapse;
const { Option } = Select;

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
  header: "w-full  py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
  activeSearchBtn: "bg-red-500 text-white",
  single_category:
    " single-category  bg-white text-gray-500  w-full overflow-hidden shadow-xl hover:bg-red-100 transition-all",
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      categoryList: [],
      isfetching: true,
      searchText: "",
      searchedColumn: "product_main_sku",
      isSearchBtnActive: true,
      activeSearchBtnId: "",
      selectedCategory: "All Categories",
      currentPage: 1,
      pageSize: 20,
    };
  }

  async componentDidMount() {
    await Promise.all([
      axios.get("/product-categories"),
      axios.get("/product-details"),
    ])
      .then(([cate, products]) => {
        this.setState({
          categoryList: cate.data,
          productList: products.data,
          // subSubCategories: subsubcat.data,
          isfetching: false,
        });
      })
      .catch((err) => {
        message.error(err.message);
        this.setState({ isfetching: false });
      });
  }

  onFinish = (values) => {
    // console.log(values);
  };

  onChange = (value) => {
    // formRef.current.setFieldsValue = value;
  };
  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleChange = (value) => {
    this.setState({
      searchedColumn: value,
    });
  };

  onReset = () => {
    // this.formRef.current.resetFields();
  };

  axiosReturn = (option) => {
    try {
      if (!option) {
        axios.get(`/product-details`).then((res) =>
          this.setState({
            productList: res.data,
            isfetching: false,
          })
        );
      } else {
        axios.get(`/product-details?product_category=` + option).then((res) =>
          this.setState({
            productList: res.data,
            isfetching: false,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  handlePageChange = (page, pageSize) => {
    this.setState({
      currentPage: page,
      pageSize: pageSize,
    });
  };

  handleSelectCategory = (value) => {
    this.handleClickByCategory(value);
  };

  handleClickByCategory = (option) => {
    const proId = option && option.id ? option.id : option;
    // if (!option || proId) {
    if (!proId) {
      this.setState({
        currentPage: 1,
        isSearchBtnActive: true,
        activeSearchBtnId: "",
        searchText: "",
        selectedCategory: "All Categories",
      });
      this.setState(
        {
          productList: [],
          isfetching: true,
        },
        () => this.axiosReturn()
      );
    } else {
      this.setState({
        currentPage: 1,
        activeSearchBtnId: proId,
        isSearchBtnActive: false,
        searchText: "",
        selectedCategory: proId,
        // option && option.categoryName ? option.categoryName : option,
      });
      this.setState(
        {
          productList: [],
          isfetching: true,
        },
        () => this.axiosReturn(proId)
      );
    }
  };

  render() {
    const { isfetching, categoryList, productList } = this.state;
    // const { data } = this.state;
    const dataSource = !!this.state.searchText
      ? productList.filter((x) =>
          x[this.state.searchedColumn]
            .toString()
            .toLowerCase()
            .includes(this.state.searchText.toString().toLowerCase())
        )
      : productList;

    const {
      isSearchBtnActive,
      activeSearchBtnId,
      selectedCategory,
    } = this.state;

    // const filteredProductList =
    // dataSource &&
    // dataSource.length &&
    // dataSource.filter((e) => e.admin_status.published - e.admin_status.locked > 0);

    const productListLength = dataSource && dataSource.length;
    const index = (this.state.currentPage - 1) * this.state.pageSize;
    const totalPages = Math.ceil(productListLength / this.state.pageSize);

    return (
      <div className={classes.wrapper}>
        <div className={classes.header} style={{ background: "#edf2f9" }}>
          <div className={classes.title}>Products</div>
        </div>
        <div className="product-search bg-white rounded my-2 ml-1">
          <div className="mb-2">
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <DownCircleTwoTone
                  twoToneColor="#f87171"
                  style={{ fontSize: "20px" }}
                  rotate={isActive ? 180 : 0}
                />
              )}
              expandIconPosition="right"
              className="site-collapse-custom-collapse"
            >
              <Panel
                header={
                  <div className="flex text-gray-400">
                    <svg
                      className={"h-4 w-4 mr-2 text-gray-400"}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Search
                  </div>
                }
                key="1"
                className="site-collapse-custom-panel rounded-xl shadow-lg "
                // extra={({ isActive }) => (
                //   <DownOutlined rotate={isActive ? 180 : 0} />
                // )}
              >
                <Form
                  layout="vertical"
                  name="control-ref"
                  onFinish={this.onFinish}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    columnGap: "8px",
                    rowGap: "8px",
                  }}
                >
                  <Form.Item label="Select Type">
                    <Select
                      defaultValue={this.state.searchedColumn}
                      placeholder="Select Column"
                      // style={{ width: 150 }}
                      onChange={this.handleChange}
                    >
                      <Option value="product_main_sku">SKU</Option>
                      <Option value="product_name">Product name</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Search">
                    <Input
                      placeholder={
                        this.state.searchedColumn === "product_main_sku"
                          ? `Search by product SKU`
                          : "Search by product name"
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
                    />
                  </Form.Item>
                  {/* <Button
                    danger
                    style={{ marginLeft: "8px" }}
                    onClick={() => this.setState({ searchText: [] })}
                  >
                    Clear
                  </Button> */}
                  {/* </div> */}

                  <Form.Item shouldUpdate name="category" label="Category">
                    <Select
                      defaultValue={this.state.selectedCategory}
                      shouldUpdate
                      placeholder="Select Column"
                      onChange={this.handleSelectCategory}
                      // style={{ width: 150 }}
                      // onChange={this.handleCategoryChange}
                    >
                      <Option value="">All Categories</Option>
                      {categoryList.map((Category, index) => {
                        return (
                          <Option key={index} value={Category.id}>
                            {Category.categoryName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name="vendor" label="Vendor">
                    <Select
                      // defaultValue={defaultSearchColumn}
                      placeholder="Select Column"
                      // style={{ width: 150 }}
                      // onChange={this.handleCategoryChange}
                    >
                      <Option value="allCategory">All Vendor</Option>
                      <Option value="allCategory">Vendor 1</Option>
                      <Option value="allCategory">Vendor 2</Option>
                      <Option value="allCategory">Vendor 3</Option>
                      <Option value="allCategory">Vendor 4</Option>
                      <Option value="allCategory">Vendor 5</Option>
                      <Option value="allCategory">Vendor 6</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      //   background: "yellow",
                      height: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        borderRadius: "4px",
                        background: "#fc573b",
                        border: "1px solid #fc573b",
                      }}
                    >
                      Search
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={() => this.setState({ searchText: [] })}
                      // onClick={this.onReset}
                      style={{ marginLeft: "8px", borderRadius: "4px" }}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Form>
                {/* </div> */}
              </Panel>
            </Collapse>
          </div>
        </div>
        {/* <div className="category-box overflow-x-auto max-w-screen-xl"> */}
        <div className="product-category ">
          {/* <Link to=""> */}
          <div
            onClick={() => this.handleClickByCategory()}
            className={`single-category  ${
              isSearchBtnActive ? "activeSearchBtn" : ""
            }`}
          >
            <img
              width="60px"
              src={AllIcon}
              alt=""
              className={`${isSearchBtnActive ? `active-image` : ``}`}
            />
            All Categories
          </div>
          {/* </Link> */}
          {categoryList ? (
            categoryList.map((category, index) => {
              return (
                <div
                  key={index}
                  onClick={() => this.handleClickByCategory(category)}
                  className={`single-category ${
                    activeSearchBtnId === category.id ? "activeSearchBtn" : ""
                  }`}
                >
                  <img
                    className={`${
                      isSearchBtnActive === category.id ? `active-image` : ``
                    }`}
                    width="60px"
                    src={
                      category.CategoryImage && category.CategoryImage.url
                        ? `https://backend-cartnyou.herokuapp.com${category.CategoryImage.url}`
                        : ""
                    }
                    alt=""
                  />
                  {category.categoryName}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <hr />
        <div
          style={{
            margin: "50px 10px",
            fontSize: "20px",
            fontWeight: "600",
            color: "gray",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {productListLength} Products
          {/* <Button
            style={{
              border: "none",
              background: "none",
              fontWeight: "600",
              fontSize: "13px",
              color: "#fc573b",
            }}
          >
            {" "}
            View All
          </Button> */}
        </div>
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} spin />
          }
          spinning={isfetching}
        >
          {dataSource && dataSource.length ? (
            <div style={{ marginBottom: "50px" }}>
              <div
                className="product-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  justifySelf: "center",
                  columnGap: "8px",
                  rowGap: "8px",
                  color: "black",
                  borderRadius: "4px",
                  margin: "30px 0px",
                  marginLeft: "6px",
                }}
              >
                {dataSource
                  .slice(index, index + this.state.pageSize)
                  .map((data) => {
                    return <ProductCard key={data.id} ProductData={data} />;
                  })}
              </div>

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
                style={{ textAlign: "end" }}
                // showTotal={(total) => `Total ${total} products`}
              />
            </div>
          ) : (
            <div className="bg-white py-14 mb-8">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                  height: 80,
                }}
                description={<span>No product found</span>}
              />
            </div>
          )}
        </Spin>
      </div>
    );
  }
}

export default Products;
