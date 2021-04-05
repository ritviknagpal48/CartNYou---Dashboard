import React, { Component } from "react";

import { Row, Col, Button } from "antd";
import "./confirm.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// const { Option } = Select;

export class confirm extends Component {
    continue = (e) => {
        e.preventDefault();
        this.props.nextstep();
    };
    back = (e) => {
        e.preventDefault();
        this.props.prevstep();
    };
    render() {
        // const { values, handlechange } = this.props;
        const {
            values: {
                product_name,
                product_brand,
                Description,
                ProductMainSKU,
                ProductTags,
                counrty_origin,
                ProductSKU,
                Quantity,
                product_mrp,
                product_mp,
                B2BPrice,
                shipping_charge,
                shipping_time,
                dem_height,
                weight,
                dem_length,
                dem_breadth,
                upc_number,
                ean_number,
                hsn_code,
                TaxRate,
            },
        } = this.props;
        return (
            <div className="form container">
                <h2>Confirm details-</h2>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Product Name</label>
                        <h4>{product_name}</h4>
                    </Col>
                    <Col md={7}>
                        <label>product_brand</label>
                        <h4>{product_brand}</h4>
                    </Col>
                    {/* <Col md={6}>
                        <label>Description</label>
                        <h4>{Description}</h4>
                    </Col> */}
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Product Main SKU</label>
                        <h4>{ProductMainSKU}</h4>
                    </Col>
                    <Col md={7}>
                        <label>Product Tags</label>
                        <h4>{ProductTags}</h4>
                    </Col>
                    {/* <Col md={6}>
                        <label>Country Of Origin</label>
                        <h4>{counrty_origin}</h4>
                    </Col> */}
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Product SKU</label>
                        <h4>{ProductSKU}</h4>
                    </Col>
                    <Col md={7}>
                        <label>Quantity Number</label>
                        <h4>{Quantity}</h4>
                    </Col>
                    <Col md={6}>
                        <label>Product MRP</label>
                        <h4>{product_mrp}</h4>
                    </Col>
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7}>
                        <label>MP Price</label>
                        <h4>{product_mp}</h4>
                    </Col>
                    <Col md={6}>
                        <label>B2B Price</label>
                        <h4>{B2BPrice}</h4>
                    </Col>
                </Row>

                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Shipping Charge</label>
                        <h4>{shipping_charge}</h4>
                    </Col>
                    <Col md={7}>
                        <label>Shipping Time</label>
                        <h4>{shipping_time}</h4>
                    </Col>
                    <Col md={6}>
                        <label>Dimension Length</label>
                        <h4>{dem_length}</h4>
                    </Col>
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>weight</label>
                        <h4>{weight}</h4>
                    </Col>
                    <Col md={7}>
                        <label>upc_number</label>
                        <h4>{upc_number}</h4>
                    </Col>
                    <Col md={6}>
                        <label>ean_number</label>
                        <h4>{ean_number}</h4>
                    </Col>
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>HSN code</label>
                        <h4>{hsn_code}</h4>
                    </Col>
                    <Col md={7}>
                        <label>Tax Rate (GST)</label>
                        <h4>{TaxRate}</h4>
                    </Col>
                </Row>
                <br />
                <Row className="inline">
                    <Col md={7} offset={0}>
                        <label>Dimension height</label>
                        <h4>{dem_height}</h4>
                    </Col>
                    <Col md={6}>
                        <label></label>
                        <h4>{ }</h4>
                    </Col>
                    <Col md={7}>
                        <label>Additional Information</label>
                        <h4>{dem_breadth}</h4>
                    </Col>
                </Row>
                <br />
                <br />
                <Row className="inline" style={{ justifyContent: 'flex-end' }}>
                    {/* <Button className="back" style={{ marginRight: "10px" }}
                        onClick={this.back}>
                        <LeftOutlined />
            Back
          </Button> */}
                    <Button className="continue" onClick={this.continue}>
                        Submit
            <RightOutlined />
                    </Button>
                </Row>
                <br />
            </div>
        );
    }
}

export default confirm;
