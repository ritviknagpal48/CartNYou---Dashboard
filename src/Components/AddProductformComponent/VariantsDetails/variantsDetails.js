import React, { Component } from 'react';

import { Row, Col, Form, Input, Button, Select, InputNumber } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Steps } from 'antd';


import './variantsDetails.css'

const { Step } = Steps;

const { Option } = Select;

export class variantsDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextstep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevstep();
    }
    render() {
        const { values, handlechange, handleNumberChange } = this.props;
        return (
            <div className="container">
                <Form onSubmit={this.continue} className="form container" layout="vertical">
                    <Row style={{ marginBottom: "30px" }}>
                        <Steps size="small" current={1} responsive={true}>
                            <Step title="General Details" />
                            <Step title="Variants Details" />
                            <Step title="Product Images" />
                            <Step title="Shipping Details" />
                            <Step title="Other Details" />
                        </Steps>

                    </Row>

                    <div class="flex justify-center items-start">
                        <Form.Item label="Product SKU" style={{ width: '100%' }}>
                            <Input
                                placeholder="Enter Product SKU"
                                onChange={handlechange('ProductSKU')}
                                defaultValue={values.ProductSKU}
                            />
                        </Form.Item>
                    </div>

                    <div class="grid grid-cols-1  gap-6  md:grid-cols-2" >
                        < div class="flex flex-col items-start justify-center w-full ">
                            <Form.Item label="Quantity" style={{ width: "100%" }}>
                                <InputNumber min={1} defaultValue={1} onChange={handleNumberChange('Quantity')} />
                            </Form.Item>
                        </ div>

                        < div class="flex flex-col items-start justify-center w-full ">
                            <Form.Item label="Product MRP" style={{ width: "100%" }}>
                                <InputNumber placeholder="MRP" min={1} defaultValue={values.ProductMrp} onChange={handleNumberChange('Quantity')} />
                            </Form.Item>
                        </div>
                    </div>

                    <div class="grid grid-cols-1  gap-6  md:grid-cols-2" >
                        < div class="flex flex-col items-start justify-center w-full ">
                            <Form.Item label="MP Price" style={{ width: "100%" }}>
                                <InputNumber placeholder="Product MP Price" min={1} defaultValue={values.MPPrice} onChange={handleNumberChange('Quantity')} />

                            </Form.Item>
                        </ div>

                        < div class="flex flex-col items-start justify-center w-full ">
                            <Form.Item label="B2B Price" style={{ width: "100%" }}>
                                <InputNumber placeholder="B2B Price" min={1} defaultValue={values.B2BPrice} onChange={handleNumberChange('Quantity')} />
                            </Form.Item>
                        </div>
                    </div>


                    <br />
                    <Row className="inline" style={{ justifyContent: "flex-end" }}>
                        <Button className="back" style={{ marginRight: "10px" }}
                            onClick={this.back}>
                            <LeftOutlined />
                        Back
                    </Button>
                        <Button className="continue"
                            onClick={this.continue}>
                            Next
                            <RightOutlined />
                        </Button>
                    </Row>

                </Form>
            </div>
        )
    }
}

export default variantsDetails;