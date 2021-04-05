import React, { Component } from "react";

import { Row, Form, Button, Select } from "antd";
import productCategory from "../../productCategory";
import "./ProductCategoryForm.css";

import { RightOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
export class ProductCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:1337/product-categories").then((res) => {
      this.setState({
        categories: res.data,
      });
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

  onChange = (value) => {
    // console.log(`selected ${value}`);
    this.setState({
      selectedCategory: value,
    });
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
    const { categories, selectedCategory } = this.state;

    const { values, handleValueChange } = this.props;
    // console.log(this.props);

    return (
      <div className="container category-container">
        <Form
          onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >
          <Form.Item label="Select Product Category">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={handleValueChange("category")}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            >
              {categories ? (
                categories.map((productCategory, index) => {
                  if (
                    productCategory.categoryName != "All" &&
                    productCategory.categoryName != "Deals"
                  ) {
                    return (
                      <Option key={index} value={productCategory.categoryName}>
                        {productCategory.categoryName}
                      </Option>
                    );
                  }
                })
              ) : (
                <></>
              )}
            </Select>
            {/* </div> */}
          </Form.Item>
          <Form.Item shouldUpdate>
            <Button
              type="primary"
              className="continue-category-button"
              onClick={this.continue}
              disabled={values.category === ""}
            >
              Continue
              <RightOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ProductCategoryForm;
