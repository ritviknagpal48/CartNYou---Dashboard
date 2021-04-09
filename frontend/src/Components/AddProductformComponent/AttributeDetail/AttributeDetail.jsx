import React from "react";
import { Form, Input, Button, Space } from "antd";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";

class AttributeDetail extends React.Component {
  onFinish = (values) => {
    this.props.handleCustomAttribute(values);
  };

  render() {
    const { values } = this.props;

    const initialValue = values.custom_attribute ? values.custom_attribute : "";
    return (
      <div className="container">
        <br />
        <Form
          name="dynamic_form_item"
          onFinish={this.onFinish}
          initialValues={initialValue}
          autoComplete="off"
        >
          <Form.List name="attribute">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      fieldKey={[fieldKey, "title"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing attribute title",
                        },
                      ]}
                    >
                      <Input placeholder="Attribute Title" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      fieldKey={[fieldKey, "value"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing attribute value",
                        },
                      ]}
                    >
                      <Input placeholder="Attribute Value" />
                    </Form.Item>
                    <CloseCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    style={{
                      width: "400px",
                      color: "#ef4444",
                      border: "1px dashed #ef4444",
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add Attribute
                  </Button>
                </Form.Item>

                {fields.length === 0 ? (
                  <></>
                ) : (
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
                      Click on confirm button before proceding to add attributes
                      to product
                    </span>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>

          {/* <Form.Item>
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
                Click on confirm button before proceding to add attributes to
                product
              </span>
            </Form.Item> */}
        </Form>
        <br />
      </div>
    );
  }
}

export default AttributeDetail;
