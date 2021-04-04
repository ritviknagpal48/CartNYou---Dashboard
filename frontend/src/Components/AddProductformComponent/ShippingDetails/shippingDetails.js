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
      <div className="container">
        <Form
          onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >
          <Row style={{ marginBottom: "30px" }}>
            <Steps size="small" current={3} responsive={true}>
              <Step title="General Details" />
              <Step title="Variants Details" />
              <Step title="Product Images" />
              <Step title="Shipping Details" />
              <Step title="Other Details" />
            </Steps>
          </Row>

          <div
            // @ts-ignore
            class="grid grid-cols-1  gap-6  md:grid-cols-2"
          >
            <div
              // @ts-ignore
              class="flex flex-col items-start justify-center w-full "
            >
              <Form.Item label="Shipping Charge (Rs)" style={{ width: "100%" }}>
                <Input
                  placeholder="Shipping Charges"
                  min={1}
                  defaultValue={values.ShippingCharge}
                  onChange={handlechange("ShippingCharge (in Rs)")}
                />
              </Form.Item>
            </div>

            <div
              // @ts-ignore
              class="flex flex-col items-start justify-center w-full "
            >
              <Form.Item label="Shipping Time (Days)" style={{ width: "100%" }}>
                <Input
                  placeholder="Shipping Time (in days)"
                  onChange={handlechange("ShippingTime")}
                  defaultValue={values.ShippingTime}
                />
              </Form.Item>
            </div>
          </div>

          <div
            // @ts-ignore
            class="grid grid-cols-1  gap-6  md:grid-cols-2"
          >
            <div
              // @ts-ignore
              class="flex flex-col items-start justify-center w-full "
            >
              <Form.Item
                label="Product Weight (grams)"
                style={{ width: "100%" }}
              >
                <Input
                  placeholder="Product Weight (in grams)"
                  onChange={handlechange("Weight")}
                  defaultValue={values.Weight}
                />
              </Form.Item>
            </div>

            <div
              // @ts-ignore
              class="flex flex-col items-start justify-center w-full "
            >
              <label
                // @ts-ignore
                class="pb-2"
              >
                Dimensions (in cm)
              </label>

              <div
                // @ts-ignore
                class="flex flex-row"
              >
                <Form.Item style={{ maxWidth: "140px" }}>
                  <Input
                    placeholder="L"
                    onChange={handlechange("DimensionLength")}
                    defaultValue={values.DimensionLength}
                  />
                </Form.Item>

                <Form.Item style={{ maxWidth: "140px", margin: "0px 2px" }}>
                  <Input
                    placeholder="B"
                    onChange={handlechange("DimensionBreadth")}
                    defaultValue={values.DimensionBreadth}
                  />
                </Form.Item>
                <Form.Item style={{ maxWidth: "140px" }}>
                  <Input
                    placeholder="H"
                    onChange={handlechange("DimensionHeight")}
                    defaultValue={values.DimensionHeight}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <br />

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
          </Row>
        </Form>
      </div>
    );
  }
}

export default shippingDetails;
