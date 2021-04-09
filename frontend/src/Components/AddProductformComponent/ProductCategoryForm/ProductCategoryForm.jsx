import React, { Component } from "react";

import { Spin, Form, Button, Select, message } from "antd";
import "./ProductCategoryForm.css";
import { axiosInstance } from "../../../Contexts/useAxios";
import { RightOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;
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
    const { values, handleValueChange, loading } = this.props;

    return (
      <div className="container category-container">
        <Spin
          spinning={this.state.isLoading}
          indicator={
            <LoadingOutlined style={{ fontSize: 30, color: "#ef4444" }} spin />
          }
        >
          <Form
            onSubmit={this.continue}
            className="form container"
            layout="vertical"
          >
            <Form.Item required>
              <label className="pb-2">
                Select Product Category <span className="text-red-400">*</span>
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
              {/* </div> */}
            </Form.Item>
            {values.product_category === "" ? (
              <></>
            ) : (
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
            <Form.Item shouldUpdate>
              <Button
                type="primary"
                className="continue-category-button"
                onClick={this.continue}
                disabled={values.product_category === ""}
              >
                Continue
                <RightOutlined />
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default ProductCategoryForm;
