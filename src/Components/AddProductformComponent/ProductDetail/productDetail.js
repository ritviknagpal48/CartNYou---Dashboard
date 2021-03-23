import React, { Component } from "react";

import { Row, Col, Form, Input, Button, Select } from "antd";

import { RightOutlined } from "@ant-design/icons";

import "./productDetail.css";

import { Steps } from "antd";

const { Step } = Steps;

const { Option } = Select;

export class ProductDetailForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  render() {
    const { values, handlechange, handleCountryChange } = this.props;
    return (
      <div className="container">
        <Form onSubmit={this.continue} className="form container">
          <Row style={{ marginBottom: "30px" }}>
            <Steps size="small" current={0} responsive={true}>
              <Step title="General Details" />
              <Step title="Variants Details" />
              <Step title="Product Images" />
              <Step title="Shipping Details" />
              <Step title="Other Details" />
            </Steps>
          </Row>

          <Row className="inline" gutter={[32, 32]}>
            <Col span={12} offset={0}>
              <label>Product Name</label>
              <Form.Item>
                <Input
                  placeholder="Product Name"
                  onChange={handlechange("ProductName")}
                  defaultValue={values.ProductName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label>Brand</label>
              <Form.Item>
                <Input
                  placeholder="Product Brand"
                  onChange={handlechange("Brand")}
                  defaultValue={values.Brand}
                />
              </Form.Item>
            </Col>
          </Row>
          <Col>
            <label>Description</label>
            <Form.Item>
              <Input.TextArea
                placeholder="Product Description (max:500 words)"
                onChange={handlechange("Description")}
                defaultValue={values.Description}
              />
            </Form.Item>
          </Col>

          <Row className="inline" gutter={[32, 32]}>
            <Col md={12} offset={0}>
              <label>Product Main SKU</label>
              <Form.Item>
                <Input
                  placeholder="Product Main SKU"
                  onChange={handlechange("ProductMainSKU")}
                  defaultValue={values.ProductMainSKU}
                />
              </Form.Item>
            </Col>
            <Col md={12} offset={0}>
              <label>Country Of Origin</label>
              <Form.Item>
                <Select
                  placeholder="Select Counrty of Origin"
                  onChange={handleCountryChange("CountryOfOrigin")}
                  defaultValue={values.CountryOfOrigin}
                  allowClear
                >
                  <Option value="USE">USA</Option>
                  <Option value="India">India</Option>
                  <Option value="China">China</Option>
                  <Option value="Korea">Korea</Option>
                  <Option value="Canada">Canada</Option>
                </Select>
                {/* <Input
                                    placeholder=" enter your occupation"
                                    onChange={handlechange('CountryOfOrigin')}
                                    defaultValue={values.CountryOfOrigin}
                                /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row className="inline">
            <Col span={24}>
              <label>Product Tags</label>
              <Form.Item>
                <Input
                  placeholder="Product tags (seperated by coma)"
                  onChange={handlechange("ProductTags")}
                  defaultValue={values.ProductTags}
                />
              </Form.Item>
            </Col>
            {/* <Col md={5}>
                            <label>MP Price</label>
                            <Form.Item>
                                <Input
                                    placeholder=""
                                    onChange={handlechange('MPPrice')}
                                    defaultValue={values.MPPrice}
                                />
                            </Form.Item>
                        </Col> */}
            {/* <Col md={5}>
                            <label>B2BPrice/Minority</label>
                            <Form.Item>
                                <Input
                                    placeholder="if belongs to any minor category"
                                    onChange={handlechange('B2BPrice')}
                                    defaultValue={values.B2BPrice}
                                />
                            </Form.Item>
                        </Col> */}
          </Row>
          <br />
          {/* <Row >
                        <Col md={20} offset={1}>
                            <label>ProductSKU</label>
                            <Form.Item>
                                <Input
                                    placeholder=" enter your permanent address belong to property"
                                    onChange={handlechange('ProductSKU')}
                                    defaultValue={values.ProductSKU}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
                    <Row className="inline">
                        <Col md={7} offset={0}>
                            <label>Quantity Number</label>
                            <Form.Item>
                                <Input
                                    placeholder="16-digit number"
                                    onChange={handlechange('Quantity')}
                                    defaultValue={values.Quantity}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={7}>
                            <label>Product MRP</label>
                            <Form.Item>
                                <Input
                                    placeholder="(91+) "
                                    onChange={handlechange('ProductMrp')}
                                    defaultValue={values.ProductMrp}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                        </Col>
                    </Row>
                    <br /> */}
          <Row className="inline" style={{ justifyContent: "flex-end" }}>
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

export default ProductDetailForm;
