import React, { Component } from "react";
import { Form, Input } from "antd";
import "./variantsDetails.css";

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
    const { values, handlechange } = this.props;
    return (
      <div className="container varient-container">
        <br />
        <Form
          onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >

          <div className="grid grid-cols-1  gap-x-6 gap-y-2  md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Product SKU <span className="text-red-400">*</span>
              </label>

              <Form.Item style={{ width: "100%" }} >
                <Input
                  placeholder="Product Main SKU"
                  onChange={handlechange("product_main_sku")}
                  defaultValue={values.product_main_sku}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Quantity <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <input type="number"
                  className="input-number"
                  min={1}
                  placeholder="Quantity"
                  defaultValue={values.qunatity}
                  onChange={handlechange("qunatity")}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Product Retail MRP <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <input type="number"
                  className="input-number"

                  placeholder="MRP"
                  min={1}
                  defaultValue={values.product_mrp}
                  onChange={handlechange("product_mrp")}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                GST Percentage
              </label>
              <Form.Item style={{ width: "100%" }}>
                <input
                  className="input-number"

                  type="number"
                  placeholder="% of GST"
                  min={1}
                  defaultValue={values.gst_percentage}
                  onChange={handlechange("gst_percentage")}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Colour
              </label>
              <Form.Item style={{ width: "100%" }}>
                <Input
                  placeholder="Varient Colour"
                  defaultValue={values.colour}
                  onChange={handlechange("colour")}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
        <br />
      </div>
    );
  }
}

export default variantsDetails;
