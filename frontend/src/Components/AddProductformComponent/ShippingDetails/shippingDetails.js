// @ts-nocheck
import React, { Component } from "react";
import { Form } from "antd";
import "./shippingDetails.css";

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
      <div className="container shipping-charge-container">
        <br />
        <Form
          onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >
          <div className="grid grid-cols-1 gap-6  gap-y-2  md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="pb-2">
                Product Weight (grams) <span className="text-red-400">*</span>
              </label>
              <Form.Item

                style={{ width: "100%" }}
              >
                <input
                  className="input-number"
                  type="number"
                  min={1}
                  placeholder="Product Weight (in grams)"
                  onChange={handlechange("weight")}
                  defaultValue={values.weight}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col items-start justify-center w-full "
            >
              <label className="pb-2">
                Dimensions (in cm) <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-row"
              >
                <Form.Item style={{ maxWidth: "140px" }}>
                  <input
                    className="input-number"
                    min={1}
                    type="number"
                    placeholder="L"
                    onChange={handlechange("dem_length")}
                    defaultValue={values.dem_length}
                  />
                </Form.Item>

                <Form.Item style={{ maxWidth: "140px", margin: "0px 2px" }}>
                  <input
                    className="input-number"
                    min={1}
                    type="number"
                    placeholder="B"
                    onChange={handlechange("dem_breadth")}
                    defaultValue={values.dem_breadth}
                  />
                </Form.Item>
                <Form.Item style={{ maxWidth: "140px" }}>
                  <input
                    className="input-number"
                    min={1}
                    type="number"
                    placeholder="H"
                    onChange={handlechange("dem_height")}
                    defaultValue={values.dem_height}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
        <br />
      </div>
    );
  }
}

export default shippingDetails;
