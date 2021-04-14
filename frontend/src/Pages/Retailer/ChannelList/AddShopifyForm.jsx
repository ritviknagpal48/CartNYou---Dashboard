import React, { Component } from "react";
import { Form, Input, Button, Radio } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./AddShopifyForm.css";
export class AddShopifyForm extends Component {
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  render() {
    return (
      <div className="add-shopify-container h-full">
        <div
          className="text-lg text-gray-600 pb-4"
          style={{ fontWeight: "bold" }}
        >
          Link Shopify
          <br />
          <span
            style={{ fontWeight: "500", color: "#00000090", fontSize: "14px" }}
          >
            Follow the instructions given to link shopify account
          </span>
        </div>
        <hr
          style={{
            borderColor: "transparent",
            marginTop: "4px",
            marginBottom: "4px",
          }}
        />
        <Form
          layout="vertical"
          name="shopify-register"
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Channel Name"
            // requiredname="username"
            name="channelName"
            rules={[
              { required: true, message: "Please enter your channel name!" },
            ]}
          >
            <Input placeholder="Channel Name" />
          </Form.Item>
          <Form.Item
            label="API Key"
            name="apiKey"
            rules={[{ required: true, message: "Please enter your API key!" }]}
          >
            <Input placeholder="API Key" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item
            tooltip="Example store URL : yourstore.myshopify.com"
            label="Store URL"
            name="storeUrl"
            rules={[
              { required: true, message: "Please enter your store URL!" },
            ]}
          >
            <Input placeholder="Store URL" />
          </Form.Item>
          <Form.Item
            label="Shared Secret"
            name="sharedSecret"
            rules={[{ required: true, message: "Please enter shared secret!" }]}
          >
            <Input placeholder="Shared Secret" />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button className="btn-shopify-ok" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddShopifyForm;
