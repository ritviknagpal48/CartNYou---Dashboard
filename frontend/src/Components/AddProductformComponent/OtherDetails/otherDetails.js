// @ts-nocheck
import React, { Component } from "react";

import { Row, Form, Input, Button } from "antd";
import "./otherDetails.css";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { Steps } from "antd";

const { Step } = Steps;

// const { Option } = Select;

export class otherDetails extends Component {
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
            <Steps size="small" current={4} responsive={true}>
              <Step title="General Details" />
              <Step title="Variants Details" />
              <Step title="Product Images" />
              <Step title="Shipping Details" />
              <Step title="Other Details" />
            </Steps>
          </Row>

          <div class="grid grid-cols-1  gap-6  md:grid-cols-2">
            <div class="flex flex-col items-start justify-center w-full ">
              <Form.Item label="UPC" style={{ width: "100%" }}>
                <Input
                  placeholder="UPC"
                  onChange={handlechange("UPC")}
                  defaultValue={values.UPC}
                />
              </Form.Item>
            </div>

            <div class="flex flex-col items-start justify-center w-full ">
              <Form.Item label="EAN" style={{ width: "100%" }}>
                <Input
                  placeholder="EAN"
                  onChange={handlechange("EAN")}
                  defaultValue={values.EAN}
                />
              </Form.Item>
            </div>
          </div>

          <div class="grid grid-cols-1  gap-6  md:grid-cols-2">
            <div class="flex flex-col items-start justify-center w-full ">
              <Form.Item label="HSN Code" style={{ width: "100%" }}>
                <Input
                  placeholder="HSN"
                  onChange={handlechange("HSNcode")}
                  defaultValue={values.HSNcode}
                />
              </Form.Item>
            </div>

            <div class="flex flex-col items-start justify-center w-full ">
              <Form.Item label="Tax Rates" style={{ width: "100%" }}>
                <Input
                  placeholder="Tax Rate (GST)"
                  onChange={handlechange("TaxRate")}
                  defaultValue={values.TaxRate}
                />
              </Form.Item>
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
              Continue
              <RightOutlined />
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

export default otherDetails;
