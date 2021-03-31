import React from "react";
import { Link } from "react-router-dom";
import { Input, Button, Select, Collapse, Form } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons";
import ProductCategory from "./productSearchCategories";
import CategoryList from "../../../Components/productCategory";
import ProductCard from "../../../Components/Retailer/ProductCard";
import ProductData from "./productDataDetails";
import "./Product.css";

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
};

class Products extends React.Component {
  formRef = React.createRef();

  onChange = (value) => {
    this.formRef.current.setFieldsValue = value;
  };
  onFinish = (values) => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  render() {
    // const defaultSearchColumn = "Sun glases";
    return (
      <div className={classes.wrapper}>
        <div className={classes.header} style={{ background: "#edf2f9" }}>
          <div className={classes.title}>Products</div>
          <div className={classes.buttons}>
            <Link
              to="/retailer/products/producyId"
              className={`${classes.button_input} hover:text-red-400`}
            >
              <svg
                className={classes.action_icons}
                viewBox="0 0 20 20"
                stroke="currentColor"
              >
                <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
              </svg>
              <span className={classes.button_title}>Product Details</span>
            </Link>
          </div>
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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
                  ref={this.formRef}
                  name="control-ref"
                  onFinish={this.onFinish}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    columnGap: "8px",
                    rowGap: "8px",
                  }}
                >
                  <Form.Item name="productName" label="Product Name">
                    <Input
                      placeholder="Search by product name"
                      // onChange={(e) => {
                      //   this.setState({
                      //     searchText: e.target.value ? [e.target.value] : [],
                      //   });
                      // }}
                      // onPressEnter={() =>
                      //   this.handleSearch(selectedKeys, confirm, dataIndex)
                      // }
                      // value={this.state.searchText}
                      className="inputSearchBox"
                      //   style={{ marginLeft: "8px" }}
                    />
                  </Form.Item>

                  <Form.Item name="productSKU" label="Product SKU">
                    <Input
                      placeholder="Search by product SKU"
                      // onChange={(e) => {
                      //   this.setState({
                      //     searchText: e.target.value ? [e.target.value] : [],
                      //   });
                      // }}
                      // onPressEnter={() =>
                      //   this.handleSearch(selectedKeys, confirm, dataIndex)
                      // }
                      // value={this.state.searchText}
                      className="inputSearchBox"
                      //   style={{ marginLeft: "8px" }}
                    />
                  </Form.Item>

                  <Form.Item name="category" label="Category">
                    <Select
                      // defaultValue={defaultSearchColumn}
                      placeholder="Select Column"
                      // style={{ width: 150 }}
                      // onChange={this.handleChange}
                    >
                      {CategoryList.map((Category) => {
                        return (
                          <Option key={Category.key} value={Category.title}>
                            {Category.title}
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
                      // onChange={this.handleChange}
                    >
                      {CategoryList.map((Category) => {
                        return (
                          <Option key={Category.key} value={Category.title}>
                            {Category.title}
                          </Option>
                        );
                      })}
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
                      onClick={this.onReset}
                      style={{ marginLeft: "8px", borderRadius: "4px" }}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Form>
              </Panel>
            </Collapse>
          </div>
        </div>
        {/* <div className="category-box overflow-x-auto max-w-screen-xl"> */}
        <div className="product-category ">
          {ProductCategory ? (
            ProductCategory.map((category) => {
              console.log(category);
              return (
                <Link to="">
                  <div
                    key={category.id}
                    className=" single-category  bg-white text-gray-500  w-full overflow-hidden shadow-xl hover:bg-red-100 transition-all" // sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
                  >
                    <img width="60px" src={category.icon} alt="" />
                    {category.name}
                  </div>
                </Link>
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
          Most Popular
          <Button
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
          </Button>
        </div>

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
          {ProductData ? (
            ProductData.map((data) => {
              return <ProductCard key={data.id} ProductData={data} />;
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
          Featured Product
          <Button
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
          </Button>
        </div>

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
          {ProductData ? (
            ProductData.map((data) => {
              return (
                <ProductCard key={data.id} ProductData={data} className="" />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      //   </div>
    );
  }
}

export default Products;
