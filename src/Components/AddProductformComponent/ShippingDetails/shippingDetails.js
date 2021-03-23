import React, { Component } from "react";

import { Row, Col, Form, Input, Button } from "antd";
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
        <Form onSubmit={this.continue} className="form container">
          <Row style={{ marginBottom: "30px" }}>
            <Steps size="small" current={3} responsive={true}>
              <Step title="General Details" />
              <Step title="Variants Details" />
              <Step title="Product Images" />
              <Step title="Shipping Details" />
              <Step title="Other Details" />
            </Steps>
          </Row>
          <Row className="inline" gutter={[32, 32]}>
            <Col md={12} offset={0}>
              <label>Shipping Charge</label>
              <Form.Item>
                <Input
                  placeholder="Shipping Charges"
                  min={1}
                  defaultValue={values.ShippingCharge}
                  onChange={handlechange("ShippingCharge (in Rs)")}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <label>Shipping Time (days)</label>
              <Form.Item>
                <Input
                  placeholder="Shipping Time (in days)"
                  onChange={handlechange("ShippingTime")}
                  defaultValue={values.ShippingTime}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="inline" gutter={[32, 32]}>
            <Col md={12}>
              <label>Product Weight</label>
              <Form.Item>
                <Input
                  placeholder="Product Weight (in grams)"
                  onChange={handlechange("Weight")}
                  defaultValue={values.Weight}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <label>Dimensions(in cm)</label>

              <Row className="inline">
                <Form.Item>
                  <Input
                    placeholder="L"
                    onChange={handlechange("DimensionLength")}
                    defaultValue={values.DimensionLength}
                  />
                </Form.Item>
                x
                <Form.Item>
                  <Input
                    placeholder="B"
                    onChange={handlechange("DimensionBreadth")}
                    defaultValue={values.DimensionBreadth}
                  />
                </Form.Item>
                x
                <Form.Item>
                  <Input
                    placeholder="H"
                    onChange={handlechange("DimensionHeight")}
                    defaultValue={values.DimensionHeight}
                  />
                </Form.Item>
              </Row>
            </Col>
          </Row>

          {/* <br />
                    <h2>Bank Details-</h2>
                    <Row className="inline">
                        <Col md={10} offset={0}>
                            <label>Loan UPC</label>
                            <Form.Item>
                                <Input
                                    placeholder=" enter loan UPC"
                                    onChange={handlechange('UPC')}
                                    defaultValue={values.UPC}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={5}>
                            <label>EAN</label>
                            <Form.Item>
                                <Input
                                    placeholder=""
                                    onChange={handlechange('EAN')}
                                    defaultValue={values.EAN}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={5}>
                            <label>HSN code</label>
                            <Form.Item>
                                <Input
                                    placeholder=""
                                    onChange={handlechange('HSNcode')}
                                    defaultValue={values.HSNcode}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
                    <Row className="inline">

                        <Col md={6}>
                            <label>Tax Rate (GST)</label>
                            <Form.Item>
                                <Input
                                    placeholder=""
                                    onChange={handlechange('TaxRate')}
                                    defaultValue={values.TaxRate}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={7}>
                            <label>PAN Card Number</label>
                            <Form.Item>
                                <Input
                                    placeholder="enter PAN number"
                                    onChange={handlechange('PAN')}
                                    defaultValue={values.PAN}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <br /> */}
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
          <br />
        </Form>
      </div>
    );
  }
}

export default shippingDetails;
