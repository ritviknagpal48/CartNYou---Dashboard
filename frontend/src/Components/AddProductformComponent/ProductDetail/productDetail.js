// @ts-nocheck
import React, { Component } from "react";
import { Row, Form, Input, Button, Select } from "antd";
import RichTextEditor from "../../RichTextEdition";

import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import "./productDetail.css";

import { Steps } from "antd";

const { Step } = Steps;

const { Option } = Select;

export class ProductDetailForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevstep();
  };
  render() {
    const { values, handlechange, handleValueChange } = this.props;
    return (
      <div className="container">
        <Form
          // onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >


          <div className="grid grid-cols-1  gap-6 mt-4 md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Product Name <span className="text-red-400">*</span>
              </label>

              <Form.Item style={{ width: "100%" }}
                required
                requiredMark="optional"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product name',
                  },
                ]}>
                <Input
                  placeholder="Product Name"
                  onChange={handlechange("product_name")}
                  defaultValue={values.product_name}
                />
              </Form.Item>
            </div>

            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Product Brand <span className="text-red-400">*</span>
              </label>

              <Form.Item style={{ width: "100%" }} required requiredMark="optional" rules={[
                {
                  required: true,
                  message: 'Please enter product brand',
                },
              ]}>
                <Input
                  placeholder="Product product_brand"
                  onChange={handlechange("product_brand")}
                  defaultValue={values.product_brand}
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex  items-start flex-col mb-6">
            <label className="pb-2">
              Description <span className="text-red-400">*</span>
            </label>

            <RichTextEditor
              handleValueChange={handleValueChange}
              values={values}
              defaultValue={values.product_description} />
            {/* <Form.Item label="Description" style={{ width: '100%' }}>
                            <Input.TextArea
                                placeholder="Product Description (max:500 words)"
                                onChange={handlechange('product_description')}
                                defaultValue={values.product_description}
                            />
                        </Form.Item> */}
          </div>

          <div className="grid grid-cols-1  gap-6  md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Product Main SKU <span className="text-red-400">*</span>
              </label>

              <Form.Item style={{ width: "100%" }} required requiredMark="optional">
                <Input
                  placeholder="Product Main SKU"
                  onChange={handlechange("product_main_sku")}
                  defaultValue={values.product_main_sku}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Country Of Origin <span className="text-red-400">*</span>
              </label>
              <Form.Item required requiredMark="optional" style={{ width: "100%" }}>
                <Select
                  placeholder="Select Counrty of Origin"
                  onChange={handleValueChange("counrty_origin")}

                  allowClear
                >
                  <Option value="india">India</Option>
                  <Option value="china">China</Option>
                  <Option value="usa">USA</Option>
                  <Option value="japan">Japan</Option>
                  <Option value="korea">Korea</Option>
                  <Option value="nepal">Nepal</Option>
                </Select>

              </Form.Item>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start">
            <label className="pb-2">
              Product Tags <span className="text-red-400">*</span>
            </label>
            <Form.Item style={{ width: "100%" }} required requiredMark="optional">
              <Input
                placeholder="Product tags (seperated by coma)"
                onChange={handlechange("product_tags")}
                defaultValue={values.product_tags}
              />
            </Form.Item>
          </div>

          <br />

        </Form>
      </div>
    );
  }
}

export default ProductDetailForm;
