
import React, { Component } from "react";
import { Form, Input } from "antd";
import "./otherDetails.css";

export class otherDetails extends Component {
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
        <Form
          onSubmit={this.continue}
          className="form container"
          layout="vertical"
        >

          <div className="grid grid-cols-1  gap-6  md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">

              <label className="pb-2">
                UPC <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <Input
                  placeholder="UPC"
                  onChange={handlechange("upc_number")}
                  defaultValue={values.upc_number}
                />
              </Form.Item>
            </div>

            <div className="flex flex-col items-start justify-center w-full ">

              <label className="pb-2">
                EAN <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <Input
                  placeholder="EAN"
                  onChange={handlechange("ean_number")}
                  defaultValue={values.ean_number}
                />
              </Form.Item>
            </div>
          </div>

          <div className="grid grid-cols-1  gap-6  md:grid-cols-2">
            <div className="flex flex-col items-start justify-center w-full ">

              <label className="pb-2">
                HSN Code <span className="text-red-400">*</span>
              </label>
              <Form.Item style={{ width: "100%" }}>
                <Input
                  placeholder="HSN"
                  onChange={handlechange("hsn_code")}
                  defaultValue={values.hsn_code}
                />
              </Form.Item>
            </div>

            {/* <div className="flex flex-col items-start justify-center w-full ">
              <Form.Item label="Tax Rates" style={{ width: "100%" }}>
                <Input
                  placeholder="Tax Rate (GST)"
                  onChange={handlechange("TaxRate")}
                  defaultValue={values.TaxRate}
                />
              </Form.Item>
            </div> */}
          </div>

          <br />

        </Form>
      </div>
    );
  }
}

export default otherDetails;
