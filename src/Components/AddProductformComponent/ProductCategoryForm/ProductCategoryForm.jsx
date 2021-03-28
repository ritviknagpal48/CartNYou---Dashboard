import React, { Component } from "react";

import { Row, Form, Button, Select } from "antd";
import productCategory from "./productCategory";
import "./ProductCategoryForm.css";

import { RightOutlined } from "@ant-design/icons";

const { Option } = Select;
export class ProductCategoryForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevstep();
  };

  onChange(value) {
    console.log(`selected ${value}`);
  }

  onBlur() {
    console.log("blur");
  }

  onFocus() {
    console.log("focus");
  }

  onSearch(val) {
    console.log("search:", val);
  }
  render() {
    return (
      <div className="container">
        <Form
          //   onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >
          <div className="grid grid-cols-1  gap-6  md:grid-cols-1">
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">Select Product Category </label>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {productCategory.map((productCategory) => {
                  return (
                    <Option
                      key={productCategory.key}
                      value={productCategory.title}
                    >
                      {productCategory.title}
                    </Option>
                  );
                })}
                {/* <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option> */}
              </Select>
            </div>
            <br />

            <Row className="inline" style={{ justifyContent: "flex-end" }}>
              <Button className="continue" onClick={this.continue}>
                Continue
                <RightOutlined />
              </Button>
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}

export default ProductCategoryForm;
