import React, { Component } from 'react';

import { Row, Col, Button, Select } from 'antd';
import './confirm.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Option } = Select;

export class confirm extends Component {
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
        const { values: { ProductName, Brand, Description, ProductMainSKU, ProductTags, CountryOfOrigin, ProductSKU, Quantity, ProductMrp,
            MPPrice, B2BPrice, ShippingCharge, ShippingTime, DimensionHeight,
            Weight, DimensionLength, DimensionBreadth, UPC, EAN,
            HSNcode, TaxRate } } = this.props;
        return (
            <div className="form container">

                <h2 style={{ fontWeight: '600' }}>Confirm details</h2>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Product Name:</label>
                        <h4>{ProductName}</h4>
                    </Col>
                    <Col md={7}>
                        <label>Brand:</label>
                        <h4>{Brand}</h4>
                    </Col>
                    <Col md={6}>
                        <label>Description:</label>
                        <h4>{Description}</h4>
                    </Col>
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Product Main SKU:</label>
                        <h4>{ProductMainSKU}</h4>
                    </Col>
                    <Col md={7}>
                        <label>Product Tags:</label>
                        <h4>{ProductTags}</h4>
                    </Col>
                    <Col md={6}>
                        <label>Country Of Origin:</label>
                        <h4>{CountryOfOrigin}</h4>
                    </Col>
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Product SKU:</label>
                        <h4>{ProductSKU}</h4>
                    </Col>
                    <Col md={7}>
                        <label>Quantity Number:</label>
                        <h4>{Quantity}</h4>
                    </Col>
                    <Col md={6}>
                        <label>Product MRP:</label>
                        <h4>{ProductMrp}</h4>
                    </Col>
                </Row>
                <br />
                <Row className="inline">

                    <Col md={7}>
                        <label>MP Price:</label>
                        <h4>{MPPrice}</h4>
                    </Col>
                    <Col md={6}>
                        <label>B2B Price:</label>
                        <h4>{B2BPrice}</h4>
                    </Col>
                </Row>

                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Shipping Charge:</label>
                        <h4>{ShippingCharge}</h4>
                    </Col>
                    <Col md={7}>
                        <label>Shipping Time:</label>
                        <h4>{ShippingTime}</h4>
                    </Col>
                    <Col md={6}>
                        <label>Dimension Length:</label>
                        <h4>{DimensionLength}</h4>
                    </Col>
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Weight:</label>
                        <h4>{Weight}</h4>
                    </Col>
                    <Col md={7}>
                        <label>UPC:</label>
                        <h4>{UPC}</h4>
                    </Col>
                    <Col md={6}>
                        <label>EAN:</label>
                        <h4>{EAN}</h4>
                    </Col>
                </Row>
                <br />

                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Dimension height:</label>
                        <h4>{DimensionHeight}</h4>
                    </Col>
                    <Col md={6}>
                        <label></label>
                        <h4>{ }</h4>
                    </Col>

                </Row>
                <br />
                <br />
                <Row className="inline" style={{ justifyContent: "flex-end" }}>
                    <Button className="back" style={{ marginRight: "10px" }}
                        onClick={this.back}>
                        <LeftOutlined />
                        Back
                    </Button>
                    <Button className="continue"
                        onClick={this.continue}>
                        Submit
                        <RightOutlined />
                    </Button>
                </Row>
                <br />
            </div>
        )
    }
}

export default confirm;