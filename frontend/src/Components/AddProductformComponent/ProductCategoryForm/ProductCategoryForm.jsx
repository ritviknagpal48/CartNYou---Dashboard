import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Form, message, Popover, Select, Spin } from "antd";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import warehouseImage from "../../../assets/warehouse.svg";
import { axiosInstance } from "../../../Contexts/useAxios";
import "./ProductCategoryForm.css";

const { Option } = Select;

const title = (
  <div style={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
    <ExclamationCircleOutlined
      style={{ fontSize: 16, marginRight: "6px", color: "#ef4444" }}
    />
    Why add warehouse?
  </div>
);
const content = (
  <div>
    <p
      style={{
        marginBottom: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          height: "4px",
          width: "4px",
          borderRadius: "50px",
          marginRight: "5px",
          background: "#ff4444",
        }}
      />
      Each product is linked to a warehouse.
    </p>
    <p
      style={{
        marginBottom: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          height: "4px",
          width: "4px",
          borderRadius: "50px",
          marginRight: "5px",
          background: "#ff4444",
        }}
      />
      Warehouse is required for pickup and delivery purpose of product.
    </p>
    <p
      style={{
        marginBottom: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          height: "4px",
          width: "4px",
          borderRadius: "50px",
          marginRight: "5px",
          background: "#ff4444",
        }}
      />
      Once added to product, it can not be changed.
    </p>
  </div>
);

export class ProductCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: "",
      isLoading: this.props.loading || true,
    };
  }

  async componentDidMount() {
    console.log(this.props);
    // await Promise.all([
    //   axiosInstance.get("/product-categories"),

    //   // getCategories(),
    //   // getSubCategories(),
    //   // getSubSubCategories(),
    // ]).then(([cate, subcat, subsubcat]) => {
    //   this.setState({
    //     categories: cate.data,
    //     subCategories: subcat.data,
    //     subSubCategories: subsubcat.data,
    //     isLoading: false,
    //   });
    // });
    await axiosInstance
      .get("/product-categories")
      .then((res) => {
        this.setState({
          categories: res.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        message.error(err.message);
        this.setState({ isLoading: false });
      });
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevstep();
  };

  onBlur() {
    // console.log("blur");
  }

  onFocus() {
    // console.log("focus");
  }

  onSearch(val) {
    // console.log("search:", val);
  }

  render() {
    const { categories } = this.state;
    const {
      values,
      handleValueChange,
      loading,
      haveCategory,
      haveWarehouse,
      warehouseList,
      warehouseSelected,
    } = this.props;
    console.log(this.props);

    if (loading) {
      return (
        <div style={{ textAlign: "center", width: "100%", padding: "40px" }}>
          <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined
                style={{ fontSize: 30, color: "#ef4444" }}
                spin
              />
            }
          />
        </div>
      );
    }
    return (
      <div className="container category-container">
        <Spin
          spinning={this.state.isLoading}
          indicator={
            <LoadingOutlined style={{ fontSize: 30, color: "#ef4444" }} spin />
          }
        >
          {!haveWarehouse ? (
            <div className="flex my-2 py-2 flex-col text-center space-y-3 text-gray-400 text-base items-center justify-center ">
              <img
                width={"250px"}
                style={{ marginBottom: "15px" }}
                src={warehouseImage}
                alt="Warehouse Image"
              />
              You don't have any warehouse linked to add a product.
              <br />
              Please add a warehouse to continue.
              <Link to="/wholesaler/warehouses">
                <Button className="continue-form-button"> Add Warehouse</Button>
              </Link>
            </div>
          ) : (
            <Form.Item required>
              <label
                className="pb-2"
                style={{ display: "flex", alignItems: "center" }}
              >
                Select WareHouse <span className="text-red-400 mr-1 ">*</span>
                <Popover
                  content={content}
                  title={title}
                  placement="rightTop"
                  trigger="hover"
                >
                  <InfoCircleOutlined />
                </Popover>
              </label>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={handleValueChange("warehouse")}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear
              >
                {warehouseList ? (
                  warehouseList.map((warehouse, index) => {
                    return (
                      <Option key={index} value={warehouse.id}>
                        {warehouse.name}
                      </Option>
                    );
                  })
                ) : (
                  <Option value={"no"}>No Warehouse Found</Option>
                )}
              </Select>
              {/* </div> */}
            </Form.Item>
          )}
          <Form
            onSubmit={this.continue}
            className="form container"
            layout="vertical"
          >
            {warehouseSelected ? (
              <Form.Item required>
                <label className="pb-2">
                  Select Product Category{" "}
                  <span className="text-red-400">*</span>
                </label>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onChange={handleValueChange("product_category")}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {categories ? (
                    categories.map((productCategory, index) => {
                      return (
                        <Option key={index} value={productCategory.id}>
                          {productCategory.categoryName}
                        </Option>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
              </Form.Item>
            ) : (
              <></>
            )}
            {haveCategory ? (
              <Form.Item>
                <label className="pb-2">Select Sub Category</label>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onChange={handleValueChange("sub_category")}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {values.subCatArray ? (
                    values.subCatArray.map((productCategory, index) => {
                      return (
                        <Option key={index} value={productCategory.id}>
                          {productCategory.name}
                        </Option>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
                {/* </div> */}
              </Form.Item>
            ) : (
              <></>
            )}
            {values.sub_category === "" ? (
              <></>
            ) : (
              <Form.Item>
                <label className="pb-2">Select Detailed Category</label>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onChange={handleValueChange("sub_sub_category")}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {values.subSubCatArray ? (
                    values.subSubCatArray.map((productCategory, index) => {
                      return (
                        <Option key={index} value={productCategory.id}>
                          {productCategory.name}
                        </Option>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
                {/* </div> */}
              </Form.Item>
            )}
            {haveWarehouse ? (
              <Form.Item shouldUpdate>
                <Button
                  type="primary"
                  className="continue-category-button"
                  onClick={this.continue}
                  disabled={!haveCategory}
                >
                  Continue
                  <RightOutlined />
                </Button>
              </Form.Item>
            ) : (
              <></>
            )}
          </Form>
        </Spin>
      </div>
    );
  }
}

export default withRouter(ProductCategoryForm);
