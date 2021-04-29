import { Form, Button, Select, Input } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "../ChannelList/AddShopifyForm.css";

const AddWarehouse = ({ onFinish }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const { state } = useLocation();

  useEffect(() => {
    const edit = state && state.edit;
    const _initialValues = state && state.initialValues;
    setIsEdit(edit);
    setInitialValues(_initialValues);
  }, [state]);

  const updateWarehouse = (values) => {
    console.log({ updatedValues: values, state });
  };

  const handleFinish = (values) => {
    console.log({ updatedValues: values, state });
    if (onFinish && typeof onFinish === "function") onFinish(values);
  };

  return (
    <div className="w-9/12 mx-auto shadow-xl p-6">
      <h2 className="text-2xl">Add New Warehouse</h2>
      <hr className="mb-4" />
      <Form
        layout="vertical"
        name="warehouse-register"
        className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-0 md:gap-x-6"
        onFinish={isEdit ? updateWarehouse : handleFinish}
        initialValues={initialValues}
      >
        <Form.Item
          shouldUpdate
          label="Warehouse Name"
          // requiredname="username"
          name="name"
          rules={[
            { required: true, message: "Please enter your warehouse name!" },
          ]}
        >
          <Input placeholder="Warehouse Name" />
        </Form.Item>
        <Form.Item
          label="Warehouse GST Number"
          name="gst_number"
          rules={[
            {
              required: true,
              message: "Please enter your Warehouse GST Number!",
            },
          ]}
        >
          <Input placeholder="GST number" />
        </Form.Item>
        <Form.Item
          label="Contact Name"
          name="contact_name"
          rules={[
            { required: true, message: "Please enter Contact Person Name!" },
          ]}
        >
          <Input placeholder="Contact Name" />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contact_number"
          rules={[
            {
              required: true,
              message: "Please enter Contact Person Number!",
            },
          ]}
        >
          <Input placeholder="Contact Number" />
        </Form.Item>
        <Form.Item
          label="Address Line 1"
          name="address_1"
          className="md:col-span-2"
          rules={[{ required: true, message: "Please Enter an Address" }]}
        >
          <Input multiple={true} />
        </Form.Item>
        <Form.Item label="Address Line 2" name="address_2">
          <Input multiple={true} />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please enter your City!" }]}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please select a State!" }]}
        >
          <Select
            allowClear={false}
            defaultOpen={false}
            defaultActiveFirstOption={true}
          >
            <Select.Option value={"opt-1"}>Option 1</Select.Option>
            <Select.Option value={"opt-2"}>Option 2</Select.Option>
            <Select.Option value={"opt-3"}>Option 3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Pin Code"
          name="pincode"
          rules={[{ required: true, message: "Please enter your Pincode!" }]}
        >
          <Input placeholder="Pincode" />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "center" }}
          className="flex flex-row md:col-span-2"
        >
          <Button className="btn-shopify-ok" htmlType="submit">
            Submit
          </Button>
          <Button className="btn-shopify-ok" htmlType="cancel">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddWarehouse;
