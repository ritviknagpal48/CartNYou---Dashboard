// @ts-nocheck
import React, { Component } from "react";

import { Row, Form, Input, Button, InputNumber } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Steps } from "antd";

import "./variantsDetails.css";

const { Step } = Steps;

// const { Option } = Select;

export class variantsDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevstep();
  };
  render() {
    const { values, handlechange, handleNumberChange } = this.props;
    return (
      <div className="container varient-container">
        <Form
          onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >
          {/* <Row style={{ marginBottom: "30px" }}>
            <Steps size="small" current={1} responsive={true}>
              <Step title="General Details" />
              <Step title="Variants Details" />
              <Step title="Product Images" />
              <Step title="Shipping Details" />
              <Step title="Other Details" />
            </Steps>
          </Row> */}

          <div className="flex justify-center items-start">

          </div>

          <div className="grid grid-cols-1  gap-6  md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">

              <label className="pb-2">
                Product SKU <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <Input
                  placeholder="Enter Product SKU"
                  onChange={handlechange("sku")}
                  defaultValue={values.sku}
                />
              </Form.Item>
            </div>

            <div className="flex flex-col items-start justify-center w-full ">

              <label className="pb-2">
                Quantity <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <input type="number"
                  className="input-number"
                  min={1}
                  placeholder="Quantity"
                  defaultValue={values.qunatity}
                  onChange={handlechange("qunatity")}
                />
              </Form.Item>
            </div>
          </div>
          <div className="grid grid-cols-1  gap-6  md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">

              <label className="pb-2">
                Product MRP <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <input type="number"
                  className="input-number"

                  placeholder="MRP"
                  min={1}
                  defaultValue={values.product_mrp}
                  onChange={handlechange("product_mrp")}
                />
              </Form.Item>
            </div>

            <div className="flex flex-col items-start justify-center w-full ">

              <label className="pb-2">
                MP Price <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <input
                  className="input-number"

                  type="number"
                  placeholder="Product MP Price"
                  min={1}
                  defaultValue={values.product_mp}
                  onChange={handlechange("product_mp")}
                />
              </Form.Item>
            </div>
          </div>

          <div className="grid grid-cols-1  gap-6  md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">

            </div>

            {/* <div className="flex flex-col items-start justify-center w-full ">
              <Form.Item label="B2B Price" style={{ width: "100%" }}>
                <InputNumber
                  placeholder="B2B Price"
                  min={1}
                  defaultValue={values.B2BPrice}
                  onChange={handleNumberChange("qunatity")}
                />
              </Form.Item>
            </div> */}
          </div>

          <br />

        </Form>
      </div>
    );
  }
}

export default variantsDetails;
