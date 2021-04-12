// @ts-nocheck
import React, { Component } from "react";

import { Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import AWS from "aws-sdk";
import cryptoRandomString from 'crypto-random-string';
import "./imageUpload.css";


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const props = {
  // multiple: false,
  onStart(file) {
    console.log("onStart", file, file.name);
  },
  onSuccess(ret, file) {
    console.log("onSuccess", ret, file.name, file);
  },
  onError(err) {
    console.log("onError", err);
  },
  onProgress({ percent }, file) {
    console.log("onProgress", `${percent}%`, file.name);
  },
  customRequest({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials
  }) {
    AWS.config.update({
      accessKeyId: "AKIASGWV7K4INWFV66KP",
      secretAccessKey: "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",
      sessionToken: ""
    });

    const S3 = new AWS.S3();
    console.log("DEBUG filename", file.name);
    console.log("DEBUG file type", file.type);

    const objParams = {
      Bucket: "cartnyouawsbuket",
      Key: "product-image" + "/" + cryptoRandomString({ length: 12, type: 'alphanumeric' }) + file.name,
      Body: file,
      ContentType: file.png // TODO: You should set content-type because AWS SDK will not automatically set file MIME
    };

    S3.putObject(objParams)
      .on("httpUploadProgress", function ({ loaded, total }) {
        onProgress(
          {
            percent: Math.round((loaded / total) * 100)
          },
          file
        );
      })
      .send((err, data) => {
        if (err) {
          onError();
          console.log("Something went wrong");
          console.log(err.code);
          console.log(err.message);
        } else {
          onSuccess(data.response, file);
          console.log("SEND FINISHED");
        }
      });
  }
};

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

    // console.log(fileList);
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
    console.log(this.state);
    console.log(props);
    return (
      <div className="container my-5">
        <Form onSubmit={this.continue} className="form container">
          <div className="clearfix">
            <Form.Item label="Product Images">
              <Upload
                action="https://cartnyouawsbuket.s3.ap-south-1.amazonaws.com/"
                listType="picture-card"
                // fileList={fileList}
                {...props}
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
