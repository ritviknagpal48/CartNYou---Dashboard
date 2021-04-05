// @ts-nocheck
import React, { Component } from "react";

import { Row, Form, Input, Button } from "antd";
import "./shippingDetails.css";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { Steps } from "antd";

const { Step } = Steps;

// const { Option } = Select;

export class shippingDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevstep();
  };
  render() {
    const { values, handlechange } = this.props;
    return (
      <div className="container shipping-charge-container">
        <Form
          onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >

          <div
            // @ts-ignore
            className="grid grid-cols-1  gap-6  md:grid-cols-2"
          >
            <div
              // @ts-ignore
              className="flex flex-col items-start justify-center w-full "
            >
              <label className="pb-2">
                Shipping Charge (Rs) <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <input
                  className="input-number"

                  type="number"
                  placeholder="Shipping Charges"
                  min={1}
                  defaultValue={values.shipping_charge}
                  onChange={handlechange("shipping_charge (in Rs)")}
                />
              </Form.Item>
            </div>

            <div
              // @ts-ignore
              className="flex flex-col items-start justify-center w-full "
            >
              <label className="pb-2">
                Shipping Time (Days) <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <input
                  className="input-number"
                  min={1}
                  type="number"
                  placeholder="Shipping Time (in days)"
                  onChange={handlechange("shipping_time")}
                  defaultValue={values.shipping_time}
                />
              </Form.Item>
            </div>
          </div>

          <div
            // @ts-ignore
            className="grid grid-cols-1  gap-6  md:grid-cols-2"
          >
            <div
              // @ts-ignore
              className="flex flex-col items-start justify-center w-full "
            > <label className="pb-2">
                Product Weight (grams) <span className="text-red-400">*</span>
              </label>
              <Form.Item

                style={{ width: "100%" }}
              >
                <input
                  className="input-number"
                  type="number"
                  min={1}
                  placeholder="Product Weight (in grams)"
                  onChange={handlechange("weight")}
                  defaultValue={values.weight}
                />
              </Form.Item>
            </div>

            <div
              // @ts-ignore
              className="flex flex-col items-start justify-center w-full "
            >
              <label
                // @ts-ignore
                className="pb-2"
              >
                Dimensions (in cm) <span className="text-red-400">*</span>
              </label>

              <div
                // @ts-ignore
                className="flex flex-row"
              >
                <Form.Item style={{ maxWidth: "140px" }}>
                  <input
                    className="input-number"
                    min={1}
                    type="number"
                    placeholder="L"
                    onChange={handlechange("dem_length")}
                    defaultValue={values.dem_length}
                  />
                </Form.Item>

                <Form.Item style={{ maxWidth: "140px", margin: "0px 2px" }}>
                  <input
                    className="input-number"
                    min={1}
                    type="number"
                    placeholder="B"
                    onChange={handlechange("dem_breadth")}
                    defaultValue={values.dem_breadth}
                  />
                </Form.Item>
                <Form.Item style={{ maxWidth: "140px" }}>
                  <input
                    className="input-number"
                    min={1}
                    type="number"
                    placeholder="H"
                    onChange={handlechange("dem_height")}
                    defaultValue={values.dem_height}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <br />
          {/* 
          <Row className="inline" style={{ justifyContent: "flex-end" }}>
            <Button
              className="back"
              style={{ marginRight: "10px" }}
              onClick={this.back}
            >
              <LeftOutlined />
              Back
            </Button>
            <Button className="continue" onClick={this.continue}>
              Next
              <RightOutlined />
            </Button>
          </Row> */}
        </Form>
      </div>
    );
  }
}

export default shippingDetails;
