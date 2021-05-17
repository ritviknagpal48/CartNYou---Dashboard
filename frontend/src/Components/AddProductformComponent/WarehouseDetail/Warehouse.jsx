import { Button, Form, message, Select, Space } from "antd";
import { axiosInstance } from "Contexts/useAxios";
import React from "react";

class WarehouseDetail extends React.Component {
  state = {
    warehouseList: [],
  };

  constructor(props) {
    super(props);
    let [token, id] = [this.props.token, this.props.userid];
    axiosInstance
      .get(`/warehouses?user=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => this.setState({ warehouseList: data }))
      .catch((err) => message.error(err.message));
  }

  onFinish = (values) => {
    this.props.handleWarehouse(values);
  };

  render() {
    const { values } = this.props;

    const initialValue = values.warehouse ? values.warehouse : "";
    return (
      <div className="container">
        <Form
          name="dynamic_form_item"
          onFinish={this.onFinish}
          autoComplete="off"
        >
          <Space direction="vertical" size="large">
            <Form.Item
              name={"warehouse"}
              label={"Warehouse"}
              rules={[
                {
                  required: true,
                  message: "Please Select an Available Warehouse",
                },
              ]}
            >
              <Select
                placeholder={"Select a Warehouse"}
                allowClear={false}
                defaultValue={initialValue === "" ? null : initialValue}
              >
                {this.state.warehouseList &&
                  this.state.warehouseList.map((wh) => (
                    <Select.Option value={wh.id} key={wh.id}>
                      {wh.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{
                  background: "#ef4444",
                  border: "none",
                  marginBottom: "8px",
                  borderRadius: "6px",
                }}
                htmlType="submit"
              >
                Confirm
              </Button>
              <br />
              <span className="text-red-500 text-xl">*</span>
              <span className="text-sm text-gray-500">
                Click on confirm button before proceding to add warehouse
              </span>
            </Form.Item>
          </Space>
        </Form>
      </div>
    );
  }
}

// WarehouseDetail.contextType = AuthContext;
export default WarehouseDetail;
