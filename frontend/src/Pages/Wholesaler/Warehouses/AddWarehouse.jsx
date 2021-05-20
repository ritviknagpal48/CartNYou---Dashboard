import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { getCities, states } from "assets/cities";
import { AuthContext } from "Contexts/Auth";
import useAxios from "Contexts/useAxios";
import { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import "./AddShopifyForm.css";

const capitalize = (value) =>
  value
    .split(" ")
    .filter((x) => !!x.trim())
    .map((x) => `${x[0].toUpperCase()}${x.substring(1).toLowerCase()}`)
    .join(" ");

const AddWarehouse = ({ onFinish, history }) => {
  const [stateIndex, setStateIndex] = useState(0);
  // const [cities, setCities] = useState(getCities(0));
  const { state } = history && history.location;
  const {
    additionalInfo: { id: userid },
  } = useContext(AuthContext);
  const { axios, isLoading } = useAxios();
  const [form] = Form.useForm();

  const updateWarehouse = (values) => {
    axios
      .put("/warehouses/" + state.initalValues.id, { ...values, user: userid })
      .then(() => {
        message.success("Warehouse Updated successfully");
        history.goBack();
      })
      .catch((err) => message.error(err.message));
  };

  const handleFinish = (values) => {
    axios
      .post("/warehouses", { ...values, user: userid })
      .then(() => {
        message.success("Warehouse Created successfully");
        history.goBack();
      })
      .catch((err) => message.error(err.message));
    if (onFinish && typeof onFinish === "function") onFinish(values);
  };

  return (
    <div className="w-9/12 mx-auto shadow-xl p-6 border border-gray-200 rounded-xl mb-6">
      <h2 className="text-2xl w-full flex flex-row justify-between">
        {state && state.edit ? "Update Warehouse" : "Add New Warehouse"}
        <Button
          onClick={() => history.goBack()}
          className="text-red-500"
          style={{ color: "#ef4444", border: "none" }}
        >
          Cancel
        </Button>
      </h2>
      <hr className="my-4" />
      <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
        <Form
          layout="vertical"
          form={form}
          name="warehouse-register"
          className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-0 md:gap-x-6"
          onFinish={state && state.edit ? updateWarehouse : handleFinish}
          initialValues={
            state && state.initalValues ? state.initalValues : null
          }
          validateMessages={{
            required: "Please Fill this field.",
          }}
        >
          <Form.Item
            label="Warehouse Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input
              // defaultValue={state.initialValues.name}
              placeholder="Warehouse Name"
            />
          </Form.Item>
          <Form.Item
            label="Warehouse GST Number"
            name="gst_number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="GST number" />
          </Form.Item>
          <Form.Item
            label="Contact Name"
            name="contact_name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Contact Name" />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contact_number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Contact Number" />
          </Form.Item>
          <Form.Item
            label="Address Line 1"
            name="address_1"
            className="md:col-span-2"
            rules={[{ required: true }]}
          >
            <Input multiple={true} />
          </Form.Item>
          <Form.Item label="Address Line 2" name="address_2">
            <Input multiple={true} defaultValue={""} />
          </Form.Item>
          <Form.Item label="State" name="state" rules={[{ required: true }]}>
            <Select
              allowClear={false}
              placeholder={"Select State"}
              defaultValue={states[0]}
              options={states.map((x) => ({
                value: capitalize(x),
                label: capitalize(x),
                title: capitalize(x),
              }))}
              onChange={(val) => {
                const idx = states.indexOf(val);
                setStateIndex(idx === -1 ? 0 : idx + 1);
              }}
            ></Select>
          </Form.Item>
          <Form.Item label="City" name="city" rules={[{ required: true }]}>
            <Select
              allowClear={false}
              placeholder={"Select City"}
              defaultValue={getCities(stateIndex)[0]}
              options={getCities(stateIndex).map((x) => ({
                value: capitalize(x),
                label: capitalize(x),
                title: capitalize(x),
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Pin Code"
            name="pincode"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Pincode" />
          </Form.Item>
          <Form.Item
            style={{ textAlign: "center", float: "right" }}
            className="md:col-start-2 justify-items-end"
          >
            <Button
              className="btn-shopify-ok"
              htmlType="submit"
              style={{ margin: 0, marginLeft: "auto" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default withRouter(AddWarehouse);
