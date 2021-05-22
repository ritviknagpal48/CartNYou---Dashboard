// @ts-nocheck
import { UploadOutlined } from "@ant-design/icons";
import { Form, Modal, Upload } from "antd";
import AWS from "aws-sdk";
import cryptoRandomString from "crypto-random-string";
import { extname } from "path";
import React, { Component } from "react";
import "./imageUpload.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// var fileList = [];

const props = {
  // multiple: false,
  onStart(file) {
    // console.log("onStart", file, file.name);
  },
  onError(err) {
    // console.log("onError", err);
  },
  onProgress({ percent }, file) {
    // console.log("onProgress", `${percent}%`, file.name);
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
    withCredentials,
  }) {
    AWS.config.update({
      accessKeyId: "AKIASGWV7K4INWFV66KP",
      secretAccessKey: "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",
      sessionToken: "",
    });

    const S3 = new AWS.S3();

    file
      .arrayBuffer()
      .then((buffer) => {
        const objParams = {
          Bucket: "cartnyouawsbuket",
          Key:
            cryptoRandomString({ length: 16, type: "alphanumeric" }) +
            extname(file.name),
          Body: buffer,
          ACL: "public-read",
          ContentType: file.type, // TODO: You should set content-type because AWS SDK will not automatically set file MIME
        };

        return S3.putObject(objParams).promise();
      })
      .then((res) => {
        const url =
          res.$response.request.httpRequest.endpoint.hostname +
          res.$response.request.httpRequest.path;

        return onSuccess(`https://${url}`, file);
      })
      .catch(onError);
  },
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
    fileList:
      this.props && this.props.values && this.props.values.images
        ? this.props.values.images
        : [],
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
    // console.log({ handleChange: fileList });
    const newFileList = fileList.filter((x) => x.status === "done");
    this.setState({ fileList: newFileList }, () => {
      this.props.handleImageUpload(newFileList);
    });
  };

  render() {
    const { previewVisible, previewImage } = this.state;

    const uploadButton = (
      <div>
        <UploadOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // console.log(this.state);
    // console.log(props);
    return (
      <div className="container my-5">
        <Form onSubmit={this.continue} className="form container">
          <div className="clearfix">
            <Form.Item label="Product Images">
              <Upload
                action="https://cartnyouawsbuket.s3.ap-south-1.amazonaws.com/"
                listType="picture-card"
                fileList={this.state.fileList}
                {...props}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                onSuccess={(url, file) => {
                  const obj = {
                    url,
                    uid: file.uid,
                    status: "done",
                    name: file.name,
                  };

                  const newFileList = [...this.state.fileList, obj].filter(
                    (x) => x.status === "done"
                  );

                  this.setState(
                    {
                      fileList: newFileList,
                    },
                    () => {
                      this.props.handleImageUpload(newFileList);
                      console.log({ fileList: this.state.fileList });
                    }
                  );
                }}
              >
                {this.state.fileList.length >= 8 ? null : uploadButton}
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
