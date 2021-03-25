import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Select, Progress } from 'antd';
import RichTextEditor from '../../RichTextEdition'

import { RightOutlined } from "@ant-design/icons";

import "./productDetail.css";

import { Steps } from "antd";

const { Step } = Steps;

const { Option } = Select;

export class ProductDetailForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextstep();
    }
    render() {
        const { values, handlechange, handleCountryChange } = this.props;
        return (
            <div className="container">

                <Form onSubmit={this.continue} className="form container" layout="vertical">
                    <Row style={{ marginBottom: "30px" }}>
                        <Steps size="small" current={0} responsive={true}>
                            <Step title="General Details" />
                            <Step title="Variants Details" />
                            <Step title="Product Images" />
                            <Step title="Shipping Details" />
                            <Step title="Other Details" />
                        </Steps>

                    </Row>





                    <div class="grid grid-cols-1  gap-6 mt-4 md:grid-cols-2" >
                        < div class="flex flex-col items-start justify-center w-full ">
                            <label class="pb-2">Product Name <span class='text-red-400'>*</span></label>

                            <Form.Item style={{ width: "100%" }}>
                                <Input
                                    placeholder="Product Name"
                                    onChange={handlechange('ProductName')}
                                    defaultValue={values.ProductName}
                                />
                            </Form.Item>
                        </ div>

                        < div class="flex flex-col items-start justify-center w-full ">
                            <label class="pb-2">Brand <span class='text-red-400'>*</span></label>

                            <Form.Item style={{ width: "100%" }}>
                                <Input
                                    placeholder="Product Brand"
                                    onChange={handlechange('Brand')}
                                    defaultValue={values.Brand}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div class="flex  items-start flex-col mb-6">
                        <label class="pb-2">Description <span class='text-red-400'>*</span></label>

                        <RichTextEditor />
                        {/* <Form.Item label="Description" style={{ width: '100%' }}>
                            <Input.TextArea
                                placeholder="Product Description (max:500 words)"
                                onChange={handlechange('Description')}
                                defaultValue={values.Description}
                            />
                        </Form.Item> */}
                    </div>

                    <div class="grid grid-cols-1  gap-6  md:grid-cols-2" >
                        < div class="flex flex-col items-start justify-center w-full ">
                            <label class="pb-2">Product Main SKU <span class='text-red-400'>*</span></label>

                            <Form.Item style={{ width: '100%' }}>
                                <Input
                                    placeholder="Product Main SKU"
                                    onChange={handlechange('ProductMainSKU')}
                                    defaultValue={values.ProductMainSKU}
                                />
                            </Form.Item>
                        </ div>
                        < div class="flex flex-col items-start justify-center w-full ">
                            <Form.Item label="Country Of Origin" style={{ width: "100%" }}>
                                <Select
                                    placeholder="Select Counrty of Origin"
                                    onChange={handleCountryChange('CountryOfOrigin')}
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
                        </div>
                    </div>

                    <div class="flex justify-center items-start">
                        <Form.Item label="Product Tags" style={{ width: "100%" }}>
                            <Input
                                placeholder="Product tags (seperated by coma)"
                                onChange={handlechange("ProductTags")}
                                defaultValue={values.ProductTags}
                            />
                        </Form.Item>
                    </div>

                    <br />

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
