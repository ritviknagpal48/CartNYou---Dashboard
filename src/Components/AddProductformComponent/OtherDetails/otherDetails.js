import React, { Component } from 'react';

import { Row, Col, Form, Input, Button, Select, Progress } from 'antd';
import './otherDetails.css'

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { Steps } from 'antd';

const { Step } = Steps;

const { Option } = Select;

export class otherDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextstep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevstep();
    }
    render() {
        const { values, handlechange } = this.props;
        return (
            <div className="container">
                <Form onSubmit={this.continue} className="form container">
                    <Row style={{ marginBottom: "30px" }}>
                        <Steps size="small" current={4} responsive={true}>
                            <Step title="General Details" />
                            <Step title="Variants Details" />
                            <Step title="Product Images" />
                            <Step title="Shipping Details" />
                            <Step title="Other Details" />
                        </Steps>

                    </Row>
                    <Row className="inline" gutter={[32, 32]}>
                        <Col md={12} offset={0}>
                            <label>UPC</label>
                            <Form.Item>
                                <Input
                                    placeholder="UPC"
                                    onChange={handlechange('UPC')}
                                    defaultValue={values.UPC}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <label>EAN</label>
                            <Form.Item>
                                <Input
                                    placeholder="EAN"
                                    onChange={handlechange('EAN')}
                                    defaultValue={values.EAN}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="inline" gutter={[32, 32]}>

                        <Col md={12}>
                            <label>HSN code</label>
                            <Form.Item>
                                <Input
                                    placeholder="HSN"
                                    onChange={handlechange('HSNcode')}
                                    defaultValue={values.HSNcode}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <label>Tax Rate (GST)</label>
                            <Form.Item>
                                <Input
                                    placeholder="Tax Rate (GST)"
                                    onChange={handlechange('TaxRate')}
                                    defaultValue={values.TaxRate}
                                />
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row className="inline" style={{ justifyContent: "flex-end" }}>
                        <Button className="back" style={{ marginRight: "10px" }}
                            onClick={this.back}>
                            <LeftOutlined />
                        Back
                    </Button>
                        <Button className="continue"
                            onClick={this.continue}>
                            Continue
                            <RightOutlined />
                        </Button>
                    </Row>
                    <br />
                </Form>
            </div>
        )
    }
}

export default otherDetails;