// @ts-nocheck
import React, { Component } from "react";

import { Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Modal } from "antd";

import "./imageUpload.css";


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export class ImageUpload extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevstep();
  };

  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {

    this.setState({ fileList });
    this.props.handleImageUpload(fileList)

  }

  render() {

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <UploadOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="container my-5">
        <Form onSubmit={this.continue} className="form container">
          <div className="clearfix">
            <Form.Item label="Product Images">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                // fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </div>

        </Form>
      </div>
    );
  }
}

export default ImageUpload;
