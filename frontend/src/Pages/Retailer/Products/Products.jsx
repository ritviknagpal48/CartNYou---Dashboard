import React from "react";
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
} from "antd";
import { DownCircleTwoTone, UpOutlined } from "@ant-design/icons";
import ProductCard from "Components/Retailer/ProductCard";
import { LoadingOutlined } from "@ant-design/icons";
import AllIcon from "../../../assets/RetailCategoryIcons/wireframe.png";
// import "./Product.css";
import { BackTop } from "antd";
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

const style = {
  height: 38,
  width: 38,
  lineHeight: "35px",
  borderRadius: 100,
  backgroundColor: "#ef4444",
  color: "#fff",
  textAlign: "center",
  fontSize: 22,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "rgb(0 0 0 / 24%) 3px 5px 10px 1px",
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      categoryList: [],
      isfetching: true,
      searchText: "",
      searchedColumn: "product_name",
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
      axios.get("/product-details?admin_status=Approved&product_status=true"),
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
        axios
          .get(`/product-details?admin_status=Approved&product_status=true`)
          .then((res) =>
            this.setState({
              productList: res.data,
              isfetching: false,
            })
          );
      } else {
        axios
          .get(
            `product-details?admin_status=Approved&product_status=true&product_category=` +
              option
          )
          .then((res) =>
            this.setState({
              productList: res.data,
              isfetching: false,
            })
          );
      }
    } catch (e) {
      // console.log(e);
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

    dataSource.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      // moment(b.createdAt).format("YYYY-MM-DD") -
      // moment(a.createdAt).format("YYYY-MM-DD")
    );
    console.log(dataSource);

    const { isSearchBtnActive, activeSearchBtnId, selectedCategory } =
      this.state;

    const productListLength = dataSource && dataSource.length;
    const index = (this.state.currentPage - 1) * this.state.pageSize;

    return (
      <div className={classes.wrapper}>
        {/* <div className={classes.header} style={{ background: "#fff" }}>
          <div className={classes.title}>Products</div>
        </div>
     */}

        <div
          style={{
            border: "1px solid #dfdfdf",
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          <div className="product-search bg-white rounded-xl my-2 ml-1">
            <div>
              <Collapse
                bordered={false}
                defaultActiveKey={["0"]}
                expandIcon={({ isActive }) => (
                  <DownCircleTwoTone
                    twoToneColor="#f87171"
                    style={{ fontSize: "20px" }}
                    rotate={isActive ? 180 : 0}
                  />
                )}
                expandIconPosition="right"
                className="site-collapse-custom-collapse"
                style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
              >
                <Panel
                  header={
                    <div
                      className="flex text-gray-400 rounded-xl "
                      style={{ borderRadius: "8px" }}
                    >
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
                  style={{ borderRadius: "8px" }}
                  className="site-collapse-custom-panel rounded-xl  bg-gray-50"
                >
                  <Form
                    layout="vertical"
                    name="control-ref"
                    onFinish={this.onFinish}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
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
                          !this.state.searchedColumn === "product_main_sku"
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

                    <Form.Item
                      // initialValue={selectedCategory}
                      name="category"
                      label="Category"
                    >
                      <Select
                        // defaultValue={selectedCategory}

                        value={selectedCategory}
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
                          background: "#ef4444",
                          border: "1px solid #ef4444",
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
                          ? `${category.CategoryImage.url}`
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
        </div>
        {/* <hr
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            borderColor: "#dfdfdf",
          }}
        /> */}
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
              color: "#ef4444",
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
          {dataSource && dataSource.length > 0 ? (
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
                  // margin: "30px 0px",
                  marginLeft: "6px",
                }}
              >
                {dataSource
                  .slice(index, index + this.state.pageSize)
                  .map((data) => {
                    return <ProductCard key={data.id} ProductData={data} />;
                  })}
              </div>
              <hr style={{ margin: "25px 10px" }} />
              <Pagination
                total={productListLength}
                defaultCurrent={1}
                pageSizeOptions={[10, 20, 50, 100]}
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
            <div
              className="bg-white"
              style={{ padding: "50px 0px", marginBottom: "30px" }}
            >
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
        <BackTop>
          <div style={style} height={1000}>
            <UpOutlined />
          </div>
        </BackTop>
      </div>
    );
  }
}

export default Products;
