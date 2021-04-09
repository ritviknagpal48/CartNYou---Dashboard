import React, { Component } from "react";
import { Form, Input, message, Select, Spin } from "antd";
import RichTextEditor from "../../RichTextEdition";
import { axiosInstance } from "../../../Contexts/useAxios";
import { LoadingOutlined } from '@ant-design/icons';

import "./productDetail.css";

const { Option } = Select;

export class ProductDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      measurment_array: []

    }
  }


  async componentDidMount() {
    await axiosInstance.get("/measurement-units"
      // , {
      // headers: {
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjlhMGU3MzMwNjY3MzZjMGNlNzRhNSIsImlhdCI6MTYxNzgxNTc2OCwiZXhwIjoxNjIwNDA3NzY4fQ.DmAFeVgwlNsTRS8yiBwHfzWmXJZXh3wv1ahXfjeiWAo",
      // },
      // }
    ).then((res) => {

      this.setState({
        isLoading: false,
        measurment_array: res.data,
      });
    }).catch((err) => {
      message.error(err.message)
    });

  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevstep();
  };
  render() {
    const { values, handlechange, handleValueChange } = this.props;
    const { isLoading, measurment_array } = this.state;
    return (
      <div className="container">
        <Spin spinning={isLoading} indicator={<LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} spin />}>
          <Form
            // onSubmit={this.continue}
            className="form container"
            layout="vertical"
          >


            <div className="grid grid-col-1  gap-x-6 mt-4 md:grid-cols-2">
              <div className="flex flex-col items-start justify-center w-full ">
                <label className="pb-2">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <Form.Item style={{ width: "100%" }}>
                  <Input
                    placeholder="Product Name"
                    onChange={handlechange("product_name")}
                    defaultValue={values.product_name}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col items-start justify-center w-full ">
                <label className="pb-2">
                  Product Brand <span className="text-red-400">*</span>
                </label>

                <Form.Item style={{ width: "100%" }}>
                  <Input
                    placeholder="Product product_brand"
                    onChange={handlechange("product_brand")}
                    defaultValue={values.product_brand}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="flex  items-start flex-col mb-6">
              <label className="pb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <RichTextEditor
                handleValueChange={handleValueChange}
                values={values}
                defaultValue={values.product_description} />
            </div>

            <div className="grid grid-cols-1  gap-x-6 gap-y-2 md:grid-cols-2">
              <div className="flex flex-col items-start justify-center w-full ">
                <label className="pb-2">
                  Country Of Origin <span className="text-red-400">*</span>
                </label>
                <Form.Item style={{ width: "100%" }}>
                  <Select
                    placeholder="Select Counrty of Origin"
                    onChange={handleValueChange("counrty_origin")}
                    defaultValue={values.counrty_origin.value || values.counrty_origin}
                    allowClear
                  >
                    <Option value="india">India</Option>
                    <Option value="china">China</Option>
                    <Option value="usa">USA</Option>
                    <Option value="japan">Japan</Option>
                    <Option value="korea">Korea</Option>
                    <Option value="nepal">Nepal</Option>
                  </Select>

                </Form.Item>
              </div>
              <div className="flex flex-col justify-center items-start">
                <label className="pb-2">
                  Product Tags <span className="text-red-400">*</span>
                </label>
                <Form.Item style={{ width: "100%" }} >
                  <Input
                    placeholder="Product tags (seperated by coma)"
                    onChange={handlechange("product_tags")}
                    defaultValue={values.product_tags}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col items-start justify-center w-full ">
                <label className="pb-2">
                  Measurment Unit <span className="text-red-400">*</span>
                </label>
                <Form.Item style={{ width: "100%" }}>
                  <Select
                    placeholder="Select Counrty of Origin"
                    onChange={handleValueChange("measurement_unit")}
                    defaultValue={values.measurement_unit.value || values.measurement_unit}
                    allowClear
                  >
                    {
                      measurment_array ? measurment_array.map((data, index) => {
                        return <Option key={index} value={data.id}>{data.units}</Option>
                      }) : <></>
                    }
                  </Select>
                </Form.Item>
              </div>
              <div className="flex flex-col items-start justify-center w-full ">
                <label className="pb-2">
                  GST Type
                </label>
                <Form.Item style={{ width: "100%" }}>
                  <Select
                    placeholder="Select GST TYPE"
                    onChange={handleValueChange("gst_type")}
                    defaultValue={values.gst_type.value || values.gst_type}
                    allowClear
                  >
                    <Option value="cgst">CGST</Option>
                    <Option value="sgst">SGST</Option>
                    <Option value="utgst">UTGST</Option>
                    <Option value="igst">IGST</Option>

                  </Select>

                </Form.Item>
              </div>
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
          </Form>
        </Spin>
      </div>
    );
  }
}

export default ProductDetailForm;
