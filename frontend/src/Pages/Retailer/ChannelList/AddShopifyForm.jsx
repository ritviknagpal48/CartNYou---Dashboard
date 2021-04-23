import React, { Component } from "react";
import { Form, Input, Button, Radio, message, Spin, Select } from "antd";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "Contexts/Auth";
import { LoadingOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { axiosInstance as axios } from "Contexts/useAxios";
import "./AddShopifyForm.css";

const { Option } = Select;

class AddShopifyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEdit: false,
      channel_name:
        this.props &&
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.channelData &&
        this.props.location.state.channelData.channel_name
          ? this.props.location.state.channelData.channel_name
          : "",
      api_key:
        this.props &&
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.channelData &&
        this.props.location.state.channelData.api_key
          ? this.props.location.state.channelData.api_key
          : "",
      key:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.channelData &&
        this.props.location.state.channelData.key
          ? this.props.location.state.channelData.key
          : "",
      store_url:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.channelData &&
        this.props.location.state.channelData.store_url
          ? this.props.location.state.channelData.store_url
          : "",
      shared_secret:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.channelData &&
        this.props.location.state.channelData.shared_secret
          ? this.props.location.state.channelData.shared_secret
          : "",
      channelId: "",
    };
  }

  async componentDidMount() {
    const userID = this.context.additionalInfo.id;
    const channelId =
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
        ? this.props.match.params.id
        : "";
    const edit =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.edit
        ? this.props.location.state.edit
        : false;

    this.setState({
      retailersdetails: userID,
      isEdit: edit,
      channelId: channelId,
    });

    this.setState({});
    if (edit) {
      await axios
        .get(`/shopifychannels/${channelId}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjlhMGU3MzMwNjY3MzZjMGNlNzRhNSIsImlhdCI6MTYxNzgxNTc2OCwiZXhwIjoxNjIwNDA3NzY4fQ.DmAFeVgwlNsTRS8yiBwHfzWmXJZXh3wv1ahXfjeiWAo",
          },
        })
        .then((res) => {
          this.setState({
            isLoading: false,
            // isEdit: false,
          });
        })
        .catch((err) => {
          message.error("Something went wrong");
          this.props.history.push("/retailer/channel-list");
        });
    }
  }

  onFinish = async (values) => {
    this.setState({
      channel_name: values.channel_name,
      api_key: values.api_key,
      key: values.key,
      store_url: values.store_url,
      shared_secret: values.shared_secret,
    });

    await axios
      .post("/shopifychannels", this.state, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjlhMGU3MzMwNjY3MzZjMGNlNzRhNSIsImlhdCI6MTYxNzgxNTc2OCwiZXhwIjoxNjIwNDA3NzY4fQ.DmAFeVgwlNsTRS8yiBwHfzWmXJZXh3wv1ahXfjeiWAo",
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          message.success(`Channel Added Successfully`);
          this.props.history.push("/retailer/channel-list");
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          message.error("Something went wrong");
          this.props.history.push("/retailer/channel-list");
        } else {
          message.error(`Please fill all the required fields`);
        }
        // console.log(error.message);
      });
  };

  onUpdateChannel = async (values) => {
    this.setState({
      channel_name: values.channel_name,
      api_key: values.api_key,
      key: values.key,
      store_url: values.store_url,
      shared_secret: values.shared_secret,
    });

    await axios
      .put(`/shopifychannels/${this.state.channelId}`, this.state, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjlhMGU3MzMwNjY3MzZjMGNlNzRhNSIsImlhdCI6MTYxNzgxNTc2OCwiZXhwIjoxNjIwNDA3NzY4fQ.DmAFeVgwlNsTRS8yiBwHfzWmXJZXh3wv1ahXfjeiWAo",
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          message.success(`Channel Updated Successfully`);
          this.props.history.push("/retailer/channel-list");
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          message.error("Something went wrong");
          this.props.history.push("/retailer/channel-list");
        } else {
          message.error(`Please fill all the required fields`);
        }
        // console.log(error.message);
      });
  };

  render() {
    const { channel_name, api_key, key, store_url, shared_secret } = this.state;
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
        <Spin
          spinning={this.state.isLoading}
          indicator={
            <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} spin />
          }
        >
          <Form
            layout="vertical"
            name="shopify-register"
            onFinish={this.state.isEdit ? this.onUpdateChannel : this.onFinish}
            initialValues={{
              channel_name: channel_name,
              api_key: api_key,
              store_url: store_url,
              key: key,
              shared_secret: shared_secret,
            }}
          >
            <Form.Item
              shouldUpdate
              label="Channel Name"
              // requiredname="username"
              name="channel_name"
              rules={[
                { required: true, message: "Please enter your channel name!" },
              ]}
            >
              <Input placeholder="Channel Name" />
            </Form.Item>
            <Form.Item
              label="API Key"
              name="api_key"
              rules={[
                { required: true, message: "Please enter your API key!" },
              ]}
            >
              <Input placeholder="API Key" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="key"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              tooltip="Example store URL : yourstore.myshopify.com"
              label="Store URL"
              name="store_url"
              rules={[
                { required: true, message: "Please enter your store URL!" },
              ]}
            >
              <Input placeholder="Store URL" />
            </Form.Item>
            <Form.Item
              label="Shared Secret"
              name="shared_secret"
              rules={[
                { required: true, message: "Please enter shared secret!" },
              ]}
            >
              <Input placeholder="Shared Secret" />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button className="btn-shopify-ok" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}

AddShopifyForm.contextType = AuthContext;

export default withRouter(AddShopifyForm);
