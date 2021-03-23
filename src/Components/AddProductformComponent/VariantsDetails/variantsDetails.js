import React, { Component } from "react";

import { Row, Col, Form, Input, Button, InputNumber } from "antd";
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
      <div className="container">
        <Form onSubmit={this.continue} className="form container">
          <Row style={{ marginBottom: "30px" }}>
            <Steps size="small" current={1} responsive={true}>
              <Step title="General Details" />
              <Step title="Variants Details" />
              <Step title="Product Images" />
              <Step title="Shipping Details" />
              <Step title="Other Details" />
            </Steps>
          </Row>

          <Col md={24}>
            <label>ProductSKU</label>
            <Form.Item>
              <Input
                placeholder="Enter Product SKU"
                onChange={handlechange("ProductSKU")}
                defaultValue={values.ProductSKU}
              />
            </Form.Item>
          </Col>

          <Row className="inline" gutter={[32, 32]}>
            <Col md={12} offset={0}>
              <label>Quantity</label>
              <Form.Item>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  onChange={handleNumberChange("Quantity")}
                />
                {/* <Input
                                    placeholder="16-digit number"
                                    onChange={handlechange('Quantity')}
                                    defaultValue={values.Quantity}
                                /> */}
              </Form.Item>
            </Col>
            <Col md={12}>
              <label>Product MRP</label>
              <Form.Item>
                <InputNumber
                  placeholder="MRP"
                  min={1}
                  defaultValue={values.ProductMrp}
                  onChange={handleNumberChange("Quantity")}
                />

                {/* <Input
                                    placeholder="(91+) "
                                    onChange={handlechange('ProductMrp')}
                                    defaultValue={values.ProductMrp}
                                /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row className="inline" gutter={[32, 32]}>
            <Col md={12}>
              <label>MP Price</label>
              <Form.Item>
                <InputNumber
                  placeholder="Product MP Price"
                  min={1}
                  defaultValue={values.MPPrice}
                  onChange={handleNumberChange("Quantity")}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <label>B2B Price</label>
              <Form.Item>
                <InputNumber
                  placeholder="B2B Price"
                  min={1}
                  defaultValue={values.B2BPrice}
                  onChange={handleNumberChange("Quantity")}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* <Row className="inline">
                        <Col md={6} offset={0}>
                            <label>Total Shipping Time</label>
                            <Form.Item>
                                <Input
                                    placeholder="enter Shipping Time"
                                    onChange={handlechange('ShippingTime')}
                                    defaultValue={values.Investedammount}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={7}>
                            <label>Sanctioned Weight</label>
                            <Form.Item>
                                <Input
                                    placeholder="enter amount of loan"
                                    onChange={handlechange('Weight')}
                                    defaultValue={values.ProductTags}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={7}>
                            <label>Total Dimension Length</label>
                            <Form.Item>
                                <Input
                                    placeholder="Dimension Length under project"
                                    onChange={handlechange('DimensionLength')}
                                    defaultValue={values.DimensionLength}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={20} offset={1}>
                            <label>Dimension Breadth-</label>
                            <Form.Item>
                                <Input
                                    placeholder="if any additional information available"
                                    onChange={handlechange('DimensionBreadth')}
                                    defaultValue={values.DimensionBreadth}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
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
                        <Col md={7} offset={0}>
                            <label>Loan Acount Number</label>
                            <Form.Item>
                                <Input
                                    placeholder=" enter Dimension height"
                                    onChange={handlechange('DimensionHeight')}
                                    defaultValue={values.DimensionHeight}
                                />
                            </Form.Item>
                        </Col>
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
                    <br />
                   */}
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

export default variantsDetails;
